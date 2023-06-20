import { doc, getDoc, setDoc } from "firebase/firestore";

import { parseThrowablesToObject, verifyAuthLogon } from "@/services/common";
import { auth, collections, db } from "@/services/firebase";

/**
 * Signs out the currently logged in user.
 *
 * @returns {ObjectWithError<void>} An object that contains an error.
 */
export async function signOut() {
  return parseThrowablesToObject(() => auth.signOut());
}

/**
 * Gets the account profile of the currently authenticated user.
 *
 * @returns {ObjectWithError<import("../common/types").UserAccount>} An object containing the
 * authenticated user's account profile and an error object.
 * @example
 * ```js
 * const { data, error } = await getAuthAccount();
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function getAuthAccount() {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    const account = doc(db, collections.USERS, auth.currentUser.uid);
    const snapshot = await getDoc(account);

    return snapshot.data();
  });
}

/**
 * Update the account details of the currently authenticated user.
 *
 * @param {import("../common/types").UserAccountUpdateDto} details The new details of the user's
 * account.
 * @returns {ObjectWithError<import("../common/types").UserAccount>} An object containing the
 * authenticated user's updated account profile and an error object.
 * @example
 * ```js
 * const payload = {
 *   email: "abcd@abcd.com",
 *   phone: "091234567890"
 * };
 *
 * const { error } = await updateAuthAccount(payload);
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function updateAuthAccount(details) {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    if (!details.email) delete details["email"];
    if (!details.phone) delete details["phone"];

    const actions = [];
    if (details.email)
      actions.push(auth.updateCurrentUser({ email: details.email }));

    const account = doc(db, collections.USERS, auth.currentUser.uid);
    actions.push(setDoc(account, details, { merge: true }));

    await Promise.allSettled(actions);
    const newSnapshot = await getDoc(account);

    return newSnapshot.data();
  });
}
