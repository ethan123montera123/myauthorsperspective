import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

/**
 * Creates a transaction payment intent for a list of services offered.
 *
 * @param   {import("@/services/common/@types").ServiceOrder[]} services - The services that are
 * being bought for the current transaction.
 * @returns {Promise<{ secret: string; }>} The object containing the client secret to
 * be used to complete the payment.
 *
 * @example
 * const services = [
 *  {
 *    service: "ABCD12369asd",
 *    inclusions: [],
 *    quantity: 2
 *  },
 *  {
 *    service: "12738ASDASHD12369asd",
 *    inclusions: [1, 3, 4, 5],
 *  }
 * ]
 *
 * const { secret } = await createTransaction(services);
 *
 * // Using \@stripe/react-stripe-js
 * <Elements options={{ clientSecret: secret }} stripe={stripePromise}>
 *  // Elements for payment here...
 * </Elements>
 */
export async function createServiceTransaction(services) {
  const createPaymentIntent = httpsCallable(
    functions,
    "api-stripe-createPaymentIntent"
  );

  const { data } = await createPaymentIntent(services);

  return data;
}
