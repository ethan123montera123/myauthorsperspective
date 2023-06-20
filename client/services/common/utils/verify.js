import { FirebaseError } from "firebase/app";

/**
 * Checks if there is currently an authenticated user logged in.
 *
 * @param {import("firebase/auth").Auth} auth
 * @throws {FirebaseError} Throws no user logon error if there is no authenticated user.
 * @return {void}
 */
export function verifyAuthLogon(auth) {
  if (!auth.currentUser) {
    throw new FirebaseError(
      "auth/no-user-logon",
      "There is currently no logged in user."
    );
  }
}
