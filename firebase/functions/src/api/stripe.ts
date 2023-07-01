import { render } from "@react-email/components";
import { https } from "firebase-functions/v2";
import { HttpsError } from "firebase-functions/v2/https";
import Stripe from "stripe";

import ReceiptEmail from "../common/emails/ReceiptEmail";
import { User } from "../common/interface";
import { config, firebase, logger, mailer, stripe } from "../common/providers";
import { orderSchema } from "../common/validator";

const { USERS, ORDERS } = config.firebase.collections;
const usersRef = firebase.db.collection(USERS);
const ordersRef = firebase.db.collection(ORDERS);

const PAYMENT_INTENT_CREATION_FAILED = "Payment intent creation failed.";
const CENTS_IN_A_DOLLAR = 100;

export const createPaymentIntent = https.onCall(
  {
    cors: config.cors.ORIGIN,
    enforceAppCheck: config.firebase.options.ENFORCE_APP_CHECK,
  },
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
        customerId: auth.uid,
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

export const webhook = https.onRequest(async (req, res) => {
  let event = null;
  let context = null;
  let msg = "";

  logger.log("Constructing event...");

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"] ?? "",
      config.stripe.WEBHOOK_SECRET
    );
  } catch (err) {
    logger.error("Webhook event processing failed.", err);
    res.status(500).send({ msg: "Error in processing webhook event." });

    return;
  }

  logger.log("Event constructed.");

  try {
    if (event.type === "payment_intent.succeeded") {
      logger.log("Sending email receipt upon successful payment...");

      const { id: stripePaymentId, metadata } = event.data
        .object as Stripe.Response<Stripe.PaymentIntent>;

      const { firebaseOrderId } = metadata;
      if (!firebaseOrderId) {
        msg = "Missing firebase order ID from Stripe payment payload.";
        context = { firebaseOrderId };

        throw new Error(msg);
      }

      const orderSnapshot = await ordersRef.doc(firebaseOrderId).get();
      const orderData = orderSnapshot.data();
      if (!orderData) {
        msg = "Payment's corresponding firebase order does not exist. ";
        context = { stripePaymentId, firebaseOrderId };

        throw new Error(msg);
      }

      const customerSnapshot = await usersRef.doc(orderData.customerId).get();
      const customerData = customerSnapshot.data() as User;
      if (!customerData) {
        msg = "Order data has an invalid or missing customer ID.";
        context = {
          stripePaymentId,
          firebaseOrderId,
          uid: orderData.customerId,
        };

        throw new Error(msg);
      }

      // eslint-disable-next-line new-cap
      const email = ReceiptEmail({
        services: orderData.services,
        orderId: orderSnapshot.id,
        customer: {
          ...customerData,
          uid: customerSnapshot.id,
        },
      });

      await mailer.send({
        from: config.mailer.FROM_EMAIL,
        to: customerData.email,
        bcc: config.mailer.BCC,
        subject: "My Author's Perspective Order Receipt #" + orderSnapshot.id,
        html: render(email),
      });

      logger.log("Receipt emailed successfully.", {
        stripePaymentId,
        firebaseOrderId,
        uid: orderData.customerId,
      });
    } else {
      logger.log("Triggered by an unhandled event type.", {
        event: event.type,
      });
    }

    res.send({ msg: "Successfully processed webhook." });
  } catch (err) {
    logger.error(msg, err, context);
    res.status(400).send({ msg });
  }
});
