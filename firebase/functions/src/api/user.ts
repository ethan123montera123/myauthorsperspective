import { auth } from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/auth";
import { https } from "firebase-functions/v2";
import { User } from "../common/interface";
import { config, firebase, logger, stripe } from "../common/providers";
import { getUserSchema, parseErrors } from "../common/validator";

const USER_CREATION_FAILED = "An error occured whilst creating account.";

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
