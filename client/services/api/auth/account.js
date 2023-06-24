import { updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, collections, db } from "@/services/firebase";
import {
  parseThrowablesToObject,
  pick,
  stripEmptyAndUnchanged,
  verifyAuthLogon,
} from "@/services/utils";
import { FirebaseError } from "firebase/app";

/**
 * Signs out the currently logged in user.
 *
 * @returns {Promise<ObjectWithError<void>>}
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
 * @returns {Promise<ObjectWithError<import("../@types").UserAccount>>}
 * A promise containing the currently authenticated user's account, and
 * a possible error.
 *
 * @example
 * const { data: account, error } = await getAuthAccount();
 * if(error) // handle error
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
 * @returns {Promise<ObjectWithError<import("../@types").UserAccount>>} 
 * A promise containing the authenticated user's updated account profile,
 * and a possible error. 
 
* @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method, if the user has been logged in for too long.
 *
 * @example
 * const payload = {
 *   email: "abcd@abcd.com",
 *   phone: "091234567890"
 * };
 *
 * const { error: reauthError } = reauthenticateWithCredentials(password);
 * if(reauthError) // handle reauthentication error
 * 
 * const { data: updatedAccount, error: updateError } = await updateAuthAccount(payload);
 * if(updateError) // handle update error
 * 
 * // handle updated account
 */
export async function updateAuthAccount(details) {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    const accountRef = doc(db, collections.USERS, auth.currentUser.uid);
    const snapshot = await getDoc(accountRef);
    const data = snapshot.data();

    let account = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      stripeId: data.stripeId,
    };

    const sanitizedDetails = stripEmptyAndUnchanged(
      pick(details, "email", "phone"),
      account
    );

    if (Object.entries(sanitizedDetails).length > 0) {
      // Runs first for validation, update email can't run first
      // since it sends an email to the user even if this one fails
      // and it's not easy to roll back.
      await setDoc(accountRef, sanitizedDetails, { merge: true });

      if (sanitizedDetails.email) {
        try {
          // TODO: Add email verification
          await updateEmail(auth.currentUser, sanitizedDetails.email);

          // By this point everything is successful, so we update our
          // local copy of account
          account = { ...account, ...sanitizedDetails };
        } catch (err) {
          // If updateEmail throws possibly due to duplicate emails,
          // we rollback the updated details
          await setDoc(accountRef, account, { merge: true });
          throw new FirebaseError(err.code, err.message, err.customData);
        }
      }
    }

    return account;
  });
}
