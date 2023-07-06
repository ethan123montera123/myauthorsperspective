import { httpsCallable } from "firebase/functions";

import { callables, functions } from "@/services/firebase";
import { ObjectWithError, parseThrowablesToObject } from "@/services/utils";

/**
 * Creates a transaction payment intent for a list of services offered.
 *
 * @param   {import("./@types").ServiceOrder[]} services The services that are
 * being bought for the current transaction.
 * @returns {Promise<ObjectWithError<{ secret: string; }, import("firebase/app").FirebaseError>>}
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
 *  if(error instanceof FirebaseError && error.code === "functions/invalid-argument") {
 *    // handle invalid argument errors
 *    error.details; // <- holds the validation error details
 *  } else if(error instanceof FirebaseError) {
 *    // handle other Firebase Errors
 *  } else {
 *    // handle general errors
 *  }
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
