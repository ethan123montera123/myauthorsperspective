import { httpsCallable } from "firebase/functions";

import { callables, functions } from "@/services/firebase";
import { ObjectWithError, parseThrowablesToObject } from "@/services/utils";

/**
 * Creates a transaction payment intent for a list of services offered.
 *
 * @param   {import("./@types").ServiceOrder[]} services The services that are
 * being bought for the current transaction.
 * @returns {Promise<ObjectWithError<{ secret: string; }>>}
 * A promise containing the secret to be used to complete the payment, or a possible error.
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
 * const { data, error } = await createTransaction(services);
 * if(error) {
 *  // handle error, if error.code === "functions/invalid-argument",
 *  // you can access error.details to get validation errors
 * }
 *
 * // Using \@stripe/react-stripe-js
 * <Elements options={{ clientSecret: data.secret }} stripe={stripePromise}>
 *  // Elements for payment here...
 * </Elements>
 */
export async function createServiceTransaction(services) {
  return parseThrowablesToObject(async () => {
    const fn = httpsCallable(functions, callables.createPaymentIntent);
    const { data } = await fn(services);

    return data;
  });
}
