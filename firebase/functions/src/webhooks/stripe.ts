import { https } from "firebase-functions/v2";
import Stripe from "stripe";
import ReceiptEmail from "../common/emails/ReceiptEmail";
import { User } from "../common/interface";
import { config, firebase, logger, mailer, stripe } from "../common/providers";

const { WEBHOOK_SECRET } = config.stripe;
const { ORDERS, USERS } = config.firebase.collections;
const ordersRef = firebase.db.collection(ORDERS);
const usersRef = firebase.db.collection(USERS);

export const sendSuccessfulPaymentReceipts = https.onRequest(
  async (req, res) => {
    let event = null;

    logger.log("Constructing event...");

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"] ?? "",
        WEBHOOK_SECRET
      );
    } catch (err) {
      logger.error("Webhook event processing failed.", err);
      res.status(500).send({ msg: "Error in processing webhook event." });

      return;
    }

    logger.log("Event constructed.");

    switch (event.type) {
      case "payment_intent.succeeded":
        logger.log("Sending email receipt upon successful payment...");

        const { id: stripePaymentId, metadata } = event.data
          .object as Stripe.Response<Stripe.PaymentIntent>;

        const { firebaseOrderId } = metadata;
        if (!firebaseOrderId) {
          logger.error(
            "Stripe payment does not contain a corresponding Firebase order ID.",
            null,
            { stripePaymentId }
          );

          res.status(404).send({
            msg: "Missing Firebase order ID from Stripe payment payload. ",
          });

          return;
        }

        const orderSnapshot = await ordersRef.doc(firebaseOrderId).get();
        const orderData = orderSnapshot.data();
        if (!orderData) {
          logger.error(
            "Stripe payment's corresponding firebase order does not exist.",
            null,
            { stripePaymentId, firebaseOrderId }
          );

          res.status(404).send({ msg: "Firebase order does not exist. " });
          return;
        }

        const customerSnapshot = await usersRef.doc(orderData.customerId).get();
        const customerData = customerSnapshot.data() as User;
        if (!customerData) {
          logger.error(
            "Order data has an invalid or missing customer ID.",
            null,
            {
              stripePaymentId,
              firebaseOrderId,
              customerId: orderData.customerId,
            }
          );

          res
            .status(404)
            .send({ msg: "Customer that placed the order does not exist. " });
          return;
        }

        await mailer.emails.send({
          from: "onboarding@resend.dev",
          to: "myauthorsperspective.dev@gmail.com",
          subject: "My Author's Perspective Order Receipt #" + orderSnapshot.id,
          react: ReceiptEmail({
            services: orderData.services,
            orderId: orderSnapshot.id,
            customer: {
              ...customerData,
              uid: customerSnapshot.id,
            },
          }),
        });

        logger.log("Receipt emailed successfully.");
      default:
        logger.log("Triggered by an unhandled event type.", {
          event: event.type,
        });
    }

    res.send({ msg: "Successfully processed webhook." });
  }
);
