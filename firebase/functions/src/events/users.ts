import { firestore } from "firebase-functions/v2";
import { User } from "../common/interface";
import { config, logger, stripe } from "../common/providers";

const { USERS } = config.firebase.collections;

export const syncAccountDeleteToStripe = firestore.onDocumentDeleted(
  {
    document: `${USERS}/{uid}`,
    region: config.firebase.options.FUNCTION_REGION,
  },
  async function ({ data: snapshot, params: { uid } }) {
    if (!snapshot) {
      logger.warn("Snapshot did not contain any data.", { user: uid });
      return null;
    }

    const user = snapshot.data() as User;
    const account = { user: uid, stripe: user.stripeId };
    if (!account.stripe) {
      logger.warn("User does not have a linked stripe account.");
      return null;
    }

    try {
      logger.log("Deleting stripe account...", account);
      await stripe.customers.del(account.stripe);

      logger.log("Stripe account deleted successfully.", account);
      return account;
    } catch (error: unknown) {
      logger.error("Stripe account deletion failed.", error, account);
    }

    return null;
  }
);
