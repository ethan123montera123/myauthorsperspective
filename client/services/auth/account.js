import { doc, getDoc, setDoc } from "firebase/firestore";

import { pick, stripUndefined, verifyAuthLogon } from "@/services/common";
import { auth, collections, db } from "@/services/firebase";
import { updateEmail } from "firebase/auth";

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
 * @returns {Promise<import("../common/types").UserAccount>} A promise object containing the
 * authenticated user's account profile.
 * @example
 * ```js
 * try {
 *  const account = await getAuthAccount();
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 * ```
 */
export async function getAuthAccount() {
  verifyAuthLogon(auth);

  const account = doc(db, collections.USERS, auth.currentUser.uid);
  const snapshot = await getDoc(account);

  return snapshot.data();
}

/**
 * Update the account details of the currently authenticated user.
 *
 * @param {import("../common/types").UserAccountUpdateDto} details - The new details of the user's
 * account.
 * @returns {Promise<import("../common/types").UserAccount>} A promise containing the
 * authenticated user's updated account profile.
 * @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method.
 *
 * @example
 * ```js
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
 * ```
 */
export async function updateAuthAccount(details) {
  verifyAuthLogon(auth);
  details = stripUndefined(pick(details, "email", "phone"));

  const actions = [];
  if (details.email) {
    actions.push(updateEmail(auth.currentUser, details.email));
  }

  const account = doc(db, collections.USERS, auth.currentUser.uid);
  actions.push(setDoc(account, details, { merge: true }));

  await Promise.allSettled(actions);
  const newSnapshot = await getDoc(account);

  return newSnapshot.data();
}
