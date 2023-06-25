import { https } from "firebase-functions/v2";
import { HttpsError } from "firebase-functions/v2/https";
import { config, firebase, logger, stripe } from "../common/providers";
import { orderSchema } from "../common/validator";

const { USERS, ORDERS } = config.firebase.collections;
const usersRef = firebase.db.collection(USERS);
const ordersRef = firebase.db.collection(ORDERS);

const PAYMENT_INTENT_CREATION_FAILED = "Payment intent creation failed.";
const CENTS_IN_A_DOLLAR = 100;

export const createPaymentIntent = https.onCall(
  { cors: config.cors.ORIGIN },
  async function ({ auth, data }) {
    if (!auth) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }

    const result = await orderSchema.spa(data);
    if (!result.success) {
      throw new HttpsError("invalid-argument", result.error.message);
    }

    const snapshot = await usersRef.doc(auth.uid).get();
    const user = snapshot.data();
    if (!user?.stripeId) {
      logger.warn("User does not have a profile or a stripe account.", {
        user: auth.uid,
        args: data,
      });

      throw new HttpsError("internal", PAYMENT_INTENT_CREATION_FAILED);
    }

    try {
      logger.log("Creating payment intent...", { user: auth.uid, args: data });

      const total =
        result.data.reduce(
          (acc, { quantity, unitPrice }) => acc + quantity * unitPrice,
          0
        ) * CENTS_IN_A_DOLLAR;

      const paymentIntent = await stripe.paymentIntents.create({
        customer: user.stripeId,
        amount: total,
        currency: config.stripe.CURRENCY,
        automatic_payment_methods: {
          enabled: config.stripe.AUTOMATIC_PAYMENT_METHOD,
        },
      });

      const orderRecord = await ordersRef.add({
        services: result.data,
        stripePaymentId: paymentIntent.id,
      });

      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: { firebaseOrderId: orderRecord.id },
      });

      logger.log("Payment intent created.", {
        user: auth.uid,
        args: data,
        payment_intent: paymentIntent.id,
      });

      return { secret: paymentIntent.client_secret };
    } catch (error) {
      logger.error(PAYMENT_INTENT_CREATION_FAILED, error, {
        user: auth.uid,
        args: data,
      });

      throw new HttpsError("internal", PAYMENT_INTENT_CREATION_FAILED);
    }
  }
);
