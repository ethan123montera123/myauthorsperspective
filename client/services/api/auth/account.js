import { doc, getDoc } from "firebase/firestore";

import {
  auth,
  callables,
  collections,
  db,
  functions,
} from "@/services/firebase";
import {
  ObjectWithError,
  parseThrowablesToObject,
  verifyAuthLogon,
} from "@/services/utils";
import { httpsCallable } from "firebase/functions";

/**
 * Signs out the currently logged in user.
 *
 * @returns {Promise<ObjectWithError<void, import("firebase/app").FirebaseError>>}
 * A promise containing a possible error.
 */
export async function signOut() {
  return parseThrowablesToObject(async () => {
    await auth.signOut();
  });
}

/**
 * Gets the account profile of the currently authenticated user.
 *
 * @returns {Promise<ObjectWithError<import("../@types").UserAccount, import("firebase/app").FirebaseError>>}
 * A promise containing the currently authenticated user's account, and
 * a possible error.
 *
 * @example
 * const { data: account, error } = await getAuthAccount();
 * if(error) {
 *    if(error instanceof FirebaseError) // handle firebase errors
 *    else // handle general errors
 * }
 *
 * // handle account
 */
export async function getAuthAccount() {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    const account = doc(db, collections.USERS, auth.currentUser.uid);
    const snapshot = await getDoc(account);
    const data = snapshot.data();

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      stripeId: data.stripeId,
    };
  });
}

/**
 * Update the account details of the currently authenticated user.
 *
 * @param   {import("../common/@types").UserAccountUpdateDto} details 
 * The new details of the user's account.
 * @returns {Promise<ObjectWithError<import("../@types").UserAccount | null, import("firebase/app").FirebaseError>>} 
 * A promise containing the authenticated user's updated account profile,
 * and a possible error. 
 
* @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method, if the user has been logged in for too long.
 *
 * @example
 * const payload = {
 *  email: "abcd@abcd.com",
 *  phone: "091234567890"
 * };
 *
 * const { error: reauthError } = await reauthenticateWithCredentials(password);
 * if(reauthError) { // handle reauthentication errors
 *  if(reauthError instanceof FirebaseError) // handle firebase errors
 *  else // handle general errors
 * }
 *
 * const { data: updatedAccount, error: updateError } = await updateAuthAccount({ email, phone });
 * if(updateError) { // handle update errors
 *  if(updateError instanceof FirebaseError && error.code === "functions/invalid-argument") {
 *    // handle invalid argument errors
 *    updateError.details; // <- holds the validation error details
 *  } else if(updateError instanceof FirebaseError) {
 *    // handle other Firebase Errors
 *  } else {
 *    // handle general errors
 *  }
 * }
 * 
 * // handle updated account
 */
export async function updateAuthAccount(details) {
  return parseThrowablesToObject(async () => {
    const validFields = {
      email: details.email,
      phone: details.phone,
    };

    const sanitized = Object.fromEntries(
      Object.entries(validFields).filter(
        ([_, v]) => ![undefined, null, ""].includes(v)
      )
    );

    const fn = httpsCallable(functions, callables.user.update);
    const { data } = await fn(sanitized);

    if (sanitized.email && sanitized.email !== auth.currentUser?.email) {
      // Sign out if email has changed.
      await auth.signOut();
      return null;
    }

    return data;
  });
}
