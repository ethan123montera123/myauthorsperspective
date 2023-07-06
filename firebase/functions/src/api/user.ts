import { auth } from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/auth";
import { https } from "firebase-functions/v2";

import { User } from "../common/interface";
import { config, firebase, logger, stripe } from "../common/providers";
import {
  getUpdateUserSchema,
  parseErrors,
  userSchema,
} from "../common/validator";

const USER_CREATION_FAILED = "An error occured whilst creating account.";
const USER_UPDATE_FAILED = "An error occured whilst updating account.";

export const createUser = https.onCall(
  {
    cors: config.cors.ORIGIN,
    enforceAppCheck: config.firebase.options.ENFORCE_APP_CHECK,
    region: config.firebase.options.FUNCTION_REGION,
  },
  async (req) => {
    const result = await userSchema.safeParseAsync(req.data);
    if (!result.success) {
      throw new HttpsError(
        "invalid-argument",
        "User details contains invalid values.",
        parseErrors(result.error.issues)
      );
    }

    const { password, ...user } = req.data as User & { password: string };
    const docRef = firebase.db
      .collection(config.firebase.collections.USERS)
      .doc();

    logger.log("Creating user account...");

    try {
      logger.log("Generating stripe account...");

      const customer = await stripe.customers.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
        metadata: { firebaseUID: docRef.id },
      });

      user.stripeId = customer.id;
    } catch (err) {
      logger.error(USER_CREATION_FAILED, err, user);
      throw new HttpsError("internal", USER_CREATION_FAILED);
    }

    try {
      logger.log("Creating user profile...");

      await docRef.set(user);
    } catch (err) {
      // Rollback created stripe account if an error occured in profile creation
      await stripe.customers.del(user.stripeId);

      logger.error(USER_CREATION_FAILED, err, user);
      throw new HttpsError("internal", USER_CREATION_FAILED);
    }

    try {
      logger.log("Creating auth account...");

      await auth().createUser({
        uid: docRef.id,
        displayName: user.firstName + " " + user.lastName,
        email: user.email,
        password,
      });

      logger.log("User account created successfully.", user);

      return user;
    } catch (err) {
      // Rollback created stripe account and user profile
      // if an error occured during auth creation
      await stripe.customers.del(user.stripeId);
      await docRef.delete({ exists: true });

      logger.error(USER_CREATION_FAILED, err, user);
      throw new HttpsError("internal", USER_CREATION_FAILED);
    }
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
    }

    const result = await getUpdateUserSchema(req.auth.uid).safeParseAsync(
      req.data
    );
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
      throw new HttpsError("internal", USER_UPDATE_FAILED);
    }

    let details = result.data as Partial<Pick<User, "email" | "phone">>;
    const diff = Object.entries(details).filter(
      ([k, v]) => user[k as keyof typeof details] !== v
    );
    // If there are no changes
    if (diff.length === 0) {
      logger.log("User account successfully updated.", user);
      return user;
    }

    details = Object.fromEntries(diff);
    const context = { uid: snapshot.id, args: req.data };
    const rollbackData = { email: user.email, phone: user.phone };

    logger.log("Updating user account...");

    try {
      logger.log("Updating stripe account...", context);
      await stripe.customers.update(user.stripeId, details);
    } catch (err) {
      logger.error("Stripe account update failed.", err, context);
      throw new HttpsError("internal", USER_UPDATE_FAILED);
    }

    try {
      logger.log("Updating user profile...", context);

      await snapshot.ref.update(details);
    } catch (err) {
      // Rollback changes to stripe if an error occurs
      await stripe.customers.update(user.stripeId, rollbackData);

      logger.error("User profile update failed.", err, context);
      throw new HttpsError("internal", USER_UPDATE_FAILED);
    }

    try {
      if (details.email) {
        logger.log("Updating auth account...", context);
        await Promise.all([
          auth().updateUser(snapshot.id, { email: details.email }),
          auth().revokeRefreshTokens(snapshot.id),
        ]);
      }
    } catch (err) {
      // Rollback changes to stripe and profile if an error occurs
      await Promise.all([
        stripe.customers.update(user.stripeId, rollbackData),
        snapshot.ref.update(rollbackData),
      ]);

      logger.error("Auth account update failed.", err, context);
      throw new HttpsError("internal", USER_UPDATE_FAILED);
    }

    const updatedUser = { ...user, ...details };

    logger.log("User account successfully updated.", updateUser);
    return updatedUser;
  }
);
