import { render } from "@react-email/components";
import { Timestamp } from "firebase-admin/firestore";
import { https } from "firebase-functions/v2";
import { HttpsError } from "firebase-functions/v2/https";
import Stripe from "stripe";

import { Order, User } from "../@types";
import { ReceiptEmail } from "../emails";
import {
  config,
  firebase,
  logger,
  mailer,
  stripe,
  transaction,
} from "../providers";
import { Action } from "../providers/transaction";
import { orderSchema, parseErrors } from "../schemas";

export const createPaymentIntent = https.onCall(
  config.firebase.functions.options,
  async function ({ auth, data }) {
    if (!auth) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }

    const result = await orderSchema.safeParseAsync(data);
    if (!result.success) {
      throw new HttpsError(
        "invalid-argument",
        "Cart contains invalid values.",
        parseErrors(result.error.issues)
      );
    }

    const context = { user: auth.uid, args: data };

    const snapshot = await firebase.db
      .collection(config.firebase.firestore.collections.USERS)
      .doc(auth.uid)
      .get();
    const user = snapshot.data() as User;
    if (!user) {
      logger.warn("User does not have a profile.", context);
      throw new HttpsError("internal", "Payment intent creation failed.");
    }

    let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
    const orderRef = firebase.db
      .collection(config.firebase.firestore.collections.ORDERS)
      .doc();

    const createOrderPaymentIntent: Action = {
      name: "Create Order Payment Intent",
      execute: async () => {
        logger.log("Creating order payment intent...", context);
        paymentIntent = await stripe.paymentIntents.create({
          // Multiply by 100 to convert the dollar price to cents
          amount: result.data.totalPrice * 100,
          customer: user.stripeId,
          currency: config.stripe.CURRENCY,
          metadata: { firebaseOrderId: orderRef.id },
          automatic_payment_methods: {
            enabled: config.stripe.AUTOMATIC_PAYMENT_METHOD,
          },
        });

        return () => stripe.paymentIntents.cancel(paymentIntent.id);
      },
      catch: (err) => {
        logger.error("Order payment intent creation failed.", err, context);
      },
    };

    const createOrderRecord: Action = {
      name: "Create Order Record",
      execute: async () => {
        logger.log("Creating order record...", context);
        if (!paymentIntent) {
          throw new Error("Order payment intent creation failed.");
        }

        await orderRef.set({
          ...result.data,
          customerId: auth.uid,
          placedAt: Timestamp.now(),
          paidAt: null,
          stripePaymentId: paymentIntent.id,
        } satisfies Order);

        return () => orderRef.delete({ exists: true });
      },
      catch: (err) => {
        logger.error("Order record creation failed.", err, context);
      },
    };

    logger.log("Creating payment intent...", context);
    const error = await transaction.commit(
      createOrderPaymentIntent,
      createOrderRecord
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (error || !paymentIntent!) {
      throw new HttpsError("internal", "Payment intent creation failed.");
    }
    logger.log("Payment intent created.", {
      ...context,
      orderId: orderRef.id,
      stripePaymentId: paymentIntent.id,
    });

    return { secret: paymentIntent.client_secret };
  }
);

export const webhook = https.onRequest(
  {
    region: config.firebase.functions.options.region,
  },
  async (req, res) => {
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

        const {
          id: stripePaymentId,
          metadata: { firebaseOrderId },
        } = event.data.object as Stripe.Response<Stripe.PaymentIntent>;

        context = { firebaseOrderId, stripePaymentId };
        if (!firebaseOrderId) {
          msg = "Missing firebase order ID from Stripe payment payload.";
          throw new Error(msg);
        }

        const orderSnapshot = await firebase.db
          .collection(config.firebase.firestore.collections.ORDERS)
          .doc(firebaseOrderId)
          .get();
        const orderData = orderSnapshot.data() as Order;
        if (!orderData) {
          msg = "Payment's corresponding firebase order does not exist. ";
          throw new Error(msg);
        }

        context = { ...context, customer: orderData.customerId };

        const customerSnapshot = await firebase.db
          .collection(config.firebase.firestore.collections.USERS)
          .doc(orderData.customerId)
          .get();
        const customerData = customerSnapshot.data() as User;
        if (!customerData) {
          msg = "Order data has an invalid or missing customer ID.";
          throw new Error(msg);
        }

        const paidAt = Timestamp.now();
        await orderSnapshot.ref.update({ paidAt });

        // eslint-disable-next-line new-cap
        const email = ReceiptEmail({
          customer: { ...customerData, uid: customerSnapshot.id },
          order: { ...orderData, id: orderSnapshot.id, paidAt },
        });

        await mailer.send({
          from: config.mailer.MAILER_EMAIL,
          to: customerData.email,
          bcc: config.mailer.COMPANY_EMAIL,
          subject: "My Author's Perspective Order Receipt #" + orderSnapshot.id,
          html: render(email),
        });

        logger.log("Receipt emailed successfully.", context);
      } else {
        logger.log("Triggered by an unhandled event type.", {
          event: event.type,
        });
      }

      res.status(200).send({ msg: "Successfully processed webhook." });
    } catch (err) {
      logger.error(msg, err, context);
      res.status(400).send({ msg });
    }
  }
);
