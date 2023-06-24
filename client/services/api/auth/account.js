import { updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { pick, stripEmpty, verifyAuthLogon } from "@/services/common";
import { auth, collections, db } from "@/services/firebase";

/**
 * Signs out the currently logged in user.
 *
 * @returns {Promise<void>}
 */
export async function signOut() {
  await auth.signOut();
}

/**
 * Gets the account profile of the currently authenticated user.
 *
 * @returns {Promise<import("@/services/common/@types").UserAccount>} A promise object containing the
 * authenticated user's account profile.
 * @example
 * try {
 *  const account = await getAuthAccount();
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 */
export async function getAuthAccount() {
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
}

/**
 * Update the account details of the currently authenticated user.
 *
 * @param {import("../common/@types").UserAccountUpdateDto} details - The new details of the user's
 * account.
 * @returns {Promise<import("../common/@types").UserAccount>} A promise containing the
 * authenticated user's updated account profile.
 * @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method.
 *
 * @example
 * const payload = {
 *   email: "abcd@abcd.com",
 *   phone: "091234567890"
 * };
 *
 * try {
 *  // This is necessary for security
 *  await reauthenticateWithCredentials(password);
 *  const account = await updateAuthAccount(payload);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 */
export async function updateAuthAccount(details) {
  verifyAuthLogon(auth);
  const sanitizedDetails = stripEmpty(pick(details, "email", "phone"));

  const account = doc(db, collections.USERS, auth.currentUser.uid);
  // Check if the picked details have any properties
  console.log(sanitizedDetails);
  if (Object.entries(sanitizedDetails).length > 0) {
    await setDoc(account, sanitizedDetails, { merge: true });

    if (sanitizedDetails.email) {
      // TODO: Add email verification
      await updateEmail(auth.currentUser, sanitizedDetails.email);
    }
  }

  const snapshot = await getDoc(account);
  const data = snapshot.data();

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    stripeId: data.stripeId,
  };
}
