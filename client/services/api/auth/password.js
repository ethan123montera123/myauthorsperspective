import { verifyAuthLogon } from "@/services/common";
import { auth } from "@/services/firebase";
import { updatePassword } from "firebase/auth";

/**
 * Change the password of the currently authenticated user.
 *
 * @param {string} password - The new password to change to.
 * @returns {Promise<void>}
 * @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method.
 *
 * @example
 * try {
 *  // This is necessary for security
 *  await reauthenticateWithCredentials(password);
 *  await changePassword(newPassword);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 */
export async function changePassword(password) {
  verifyAuthLogon(auth);

  await updatePassword(auth.currentUser, password);
}

// TODO: Reset Password
