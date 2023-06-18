import {
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import { config, logger, stripe } from "../providers";

const { users } = config.firebase.collectionPaths;

export const createStripeAccount = onDocumentCreated(
  `${users}/{uid}`,
  async function ({ data: snapshot, params: { uid } }) {
    if (!snapshot) {
      logger.warn("Snapshot did not contain any data.", { user: uid });
      return null;
    }

    const data = snapshot.data();

    try {
      logger.log("Creating stripe account...", { user: uid });

      const { id: stripeId } = await stripe.customers.create({
        name: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        metadata: { firebaseUID: uid },
      });

      await snapshot.ref.set({ stripeId }, { merge: true });

      logger.log("Stripe account successfully created.", {
        user: uid,
        stripe: stripeId,
      });

      return { ...data, stripeId };
    } catch (error: unknown) {
      logger.error("Stripe account creation failed.", error as Error, {
        user: uid,
      });
    }

    return null;
  }
);

export const syncAccountUpdateToStripe = onDocumentUpdated(
  `${users}/{uid}`,
  async function ({ data: snapshot, params: { uid } }) {
    if (!snapshot) {
      logger.warn("Snapshot did not contain any data.", { user: uid });
      return null;
    }

    const { stripeId, ...data } = snapshot.after.data();
    const account = { user: uid, stripe: stripeId };

    try {
      logger.log("Syncing updates to stripe account...", account);

      await stripe.customers.update(stripeId, {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
      });

      logger.log("Stripe account successfully synced with updates.", account);

      return snapshot.after.data();
    } catch (error: unknown) {
      logger.error(
        "Stripe account update syncing failed.",
        error as Error,
        account
      );
    }

    return null;
  }
);
