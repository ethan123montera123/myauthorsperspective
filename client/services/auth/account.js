import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

import { parseThrowablesToObject } from "@/services/common";
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
 * @returns {ObjectWithError<import("../common/types").User>} An object containing the
 * authenticated user's profile and an error object.
 * @example
 * ```js
 * const { data, error } = await getAuthAccount();
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function getAuthAccount() {
  return parseThrowablesToObject(async () => {
    if (!auth.currentUser)
      throw new FirebaseError(
        "auth/no-user-logon",
        "No user is currently logged in."
      );

    const account = doc(db, collections.USERS, auth.currentUser.uid);
    const snapshot = await getDoc(account);

    return snapshot.data();
  });
}
