import { httpsCallable } from "firebase/functions";

import { callables, functions } from "@/services/firebase";
import { ObjectWithError, parseThrowablesToObject } from "@/services/utils";

/**
 * Contact gateway for the customers to send an email to the company.
 *
 * @param   {import("./@types").ContactData[]} contact The data associated with the contact.
 * @returns {Promise<ObjectWithError<{ msg: string; }, import("firebase/app").FirebaseError>>}
 * A promise containing a success message, and a possible error from the execution.
 *
 * @example
 * const contact = {
 *  firstName: "John",
 *  lastName: "Smith",
 *  email: "john@smith.com",
 *  subject: "Test Subject",
 *  message: "Lorem Ipsum",
 * };
 *
 * const { data, error } = await sendContactEmail(contact);
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
 * data.msg // The msg returned when execution is successful
 */
export async function sendContactEmail(contact) {
  return parseThrowablesToObject(async () => {
    const fn = httpsCallable(functions, callables.sendContactEmail);
    const { data } = await fn(contact);

    return data;
  });
}
