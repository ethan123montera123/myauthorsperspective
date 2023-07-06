import { updatePassword } from "firebase/auth";

import { auth } from "@/services/firebase";
import {
  ObjectWithError,
  parseThrowablesToObject,
  verifyAuthLogon,
} from "@/services/utils";

/**
 * Change the password of the currently authenticated user.
 *
 * @param   {string}  password  The new password to change to.
 * @returns {Promise<ObjectWithError<void, import("firebase/app").FirebaseError>>}
 * A promise containing a possible error.
 * @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method, if the user has been logged on for too long.
 *
 * @example
 * const { error: reauthError } = await reauthenticateWithCredentials(password);
 * if(reauthError) { // handle reauthentication errors
 *  if(reauthError instanceof FirebaseError) // handle firebase errors
 *  else // handle general errors
 * }
 *
 * const { error: updateError } = await changePassword(newPassword);
 * if(error) { // handle update errors
 *  if (error instanceof FirebaseError) // handle other FirebaseError for update account
 *  else // handle general errors
 * }
 */
export async function changePassword(password) {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    await updatePassword(auth.currentUser, password);
  });
}

// TODO: Reset Password
