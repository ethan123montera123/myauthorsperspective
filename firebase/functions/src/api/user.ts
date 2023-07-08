import { auth } from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/auth";
import { https } from "firebase-functions/v2";

import { User } from "../interface";
import { config, firebase, logger, stripe, transaction } from "../providers";
import { Action } from "../providers/transaction";
import { getUserSchema, parseErrors } from "../validator";

export const createUser = https.onCall(
  {
    cors: config.cors.ORIGIN,
    enforceAppCheck: config.firebase.options.ENFORCE_APP_CHECK,
    region: config.firebase.options.FUNCTION_REGION,
  },
  async (req) => {
    const result = await getUserSchema().safeParseAsync(req.data);
    if (!result.success) {
      throw new HttpsError(
        "invalid-argument",
        "User details contains invalid values.",
        parseErrors(result.error.issues)
      );
    }

    const { password, ...user } = result.data as User & { password: string };
    const docRef = firebase.db
      .collection(config.firebase.collections.USERS)
      .doc();

    const context = { args: user };

    const createStripeAccount: Action = {
      name: "Stripe Account Creation",
      execute: async () => {
        logger.log("Generating stripe account...", context);

        const customer = await stripe.customers.create({
          name: (user.firstName + " " + user.lastName).trim(),
          email: user.email,
          phone: user.phone,
          metadata: { firebaseUID: docRef.id },
        });

        user.stripeId = customer.id;

        return () => stripe.customers.del(customer.id);
      },
      catch: (err) => {
        logger.error("Stripe account creation failed.", err, context);
      },
    };

    const createAuthAccount: Action = {
      name: "Auth Account Creation",
      execute: async () => {
        logger.log("Creating auth account...", context);

        await auth().createUser({
          uid: docRef.id,
          displayName: (user.firstName + " " + user.lastName).trim(),
          email: user.email,
          password,
        });

        return () => auth().deleteUser(docRef.id);
      },
      catch: (err) => {
        logger.error("Auth account creation failed.", err, context);
      },
    };

    const createUserProfile: Action = {
      name: "User Profile Creation",
      execute: async () => {
        logger.log("Creating user profile...", context);

        await docRef.set(user);

        return () => docRef.delete({ exists: true });
      },
      catch: (err) => {
        logger.error("User profile creation failed.", err, context);
      },
    };

    logger.log("Creating user account...");
    const error = await transaction.commit(
      createStripeAccount,
      createAuthAccount,
      createUserProfile
    );
    if (error) {
      throw new HttpsError("internal", "User account creation failed.");
    }
    logger.log("User account created successfully.", user);

    return user;
  }
);

export const updateUser = https.onCall(
  {
    cors: config.cors.ORIGIN,
    enforceAppCheck: config.firebase.options.ENFORCE_APP_CHECK,
    region: config.firebase.options.FUNCTION_REGION,
  },
  async (req) => {
    if (!req.auth) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    } else if (
      !config.firebase.methods.isRecentLogin(req.auth.token.auth_time)
    ) {
      throw new HttpsError(
        "failed-precondition",
        "You have been logged in for too long. Please sign in again."
      );
    }

    const result = await getUserSchema(req.auth.uid)
      .pick({ email: true, phone: true })
      .partial()
      .safeParseAsync(req.data);
    if (!result.success) {
      throw new HttpsError(
        "invalid-argument",
        "User details contains invalid values.",
        parseErrors(result.error.issues)
      );
    }

    const docRef = firebase.db
      .collection(config.firebase.collections.USERS)
      .doc(req.auth.uid);

    const snapshot = await docRef.get();
    const user = snapshot.data() as Omit<User, "id">;
    if (!user) {
      logger.error("User profile does not exist.", null, { uid: snapshot.id });
      throw new HttpsError("internal", "User account update failed.");
    }

    let details = result.data as Partial<Pick<User, "email" | "phone">>;
    const diff = Object.entries(details).filter(
      ([k, v]) => user[k as keyof typeof details] !== v
    );

    // If there are no changes, we can opt for an early return.
    if (diff.length === 0) {
      logger.log("User account successfully updated.", user);
      return user;
    }

    details = Object.fromEntries(diff);
    const context = { uid: snapshot.id, args: result.data };
    const beforeChange = { email: user.email, phone: user.phone };

    const updateStripeAccount: Action = {
      name: "Update Stripe Account",
      execute: async () => {
        logger.log("Updating stripe account...", context);
        await stripe.customers.update(user.stripeId, details);

        return () => stripe.customers.update(user.stripeId, beforeChange);
      },
      catch: (err) => {
        logger.error("Stripe account update failed.", err, context);
      },
    };

    const updateAuthAccount: Action = {
      name: "Update Auth Account",
      execute: async () => {
        if (details.email) {
          logger.log("Updating auth account...", context);
          await auth().updateUser(snapshot.id, { email: details.email });

          return () =>
            auth().updateUser(snapshot.id, { email: beforeChange.email });
        }

        return;
      },
      catch: (err) => {
        logger.error("Auth account update failed.", err, context);
      },
    };

    const updateUserProfile: Action = {
      name: "Update User Profile",
      execute: async () => {
        logger.log("Updating user profile...", context);
        await snapshot.ref.update(details);

        return () => snapshot.ref.update(beforeChange);
      },
      catch: (err) => {
        logger.error("Auth account update failed.", err, context);
      },
    };

    logger.log("Updating user account...");
    const error = await transaction.commit(
      updateStripeAccount,
      updateAuthAccount,
      updateUserProfile
    );
    if (error) {
      throw new HttpsError("internal", "User account update failed.");
    }

    const updatedUser = { ...user, ...details };
    logger.log("User account successfully updated.", updateUser);

    return updatedUser;
  }
);
