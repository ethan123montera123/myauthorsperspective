import { httpsCallable } from "firebase/functions";

import { callables, functions } from "@/services/firebase";
import { ObjectWithError, parseThrowablesToObject } from "@/services/utils";

/**
 * Contact gateway for the customers to send an email to the company.
 *
 * @param   {import("./@types").ContactData[]} contact The data associated with the contact.
 * @returns {Promise<ObjectWithError<void>>} A promise containing a possible error from the execution.
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
 * const { data } = await sendContactEmail(contact);
 * if(error) // handle error
 */
export async function sendContactEmail(contact) {
  return parseThrowablesToObject(async () => {
    const fn = httpsCallable(functions, callables.sendContactEmail);
    await fn(contact);
  });
}
