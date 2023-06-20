import { doc, getDoc, setDoc } from "firebase/firestore";

import { verifyAuthLogon } from "@/services/common";
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
 * @param {import("../common/types").UserAccountUpdateDto} details The new details of the user's
 * account.
 * @returns {Promise<import("../common/types").UserAccount>} A promise containing the
 * authenticated user's updated account profile.
 * @example
 * ```js
 * const payload = {
 *   email: "abcd@abcd.com",
 *   phone: "091234567890"
 * };
 *
 * try {
 *  const account = await updateAuthAccount(payload);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 * ```
 */
export async function updateAuthAccount(details) {
  verifyAuthLogon(auth);

  if (!details.email) delete details["email"];
  if (!details.phone) delete details["phone"];

  const actions = [];
  if (details.email) {
    actions.push(auth.updateCurrentUser({ email: details.email }));
  }

  const account = doc(db, collections.USERS, auth.currentUser.uid);
  actions.push(setDoc(account, details, { merge: true }));

  await Promise.allSettled(actions);
  const newSnapshot = await getDoc(account);

  return newSnapshot.data();
}
