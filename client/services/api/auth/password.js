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
 * @returns {Promise<ObjectWithError<void>>}
 * A promise containing a possible error.
 * @remarks
 * Note: This is a sensitive operation, thus it is necessary to reauthenticate the user
 * credentials before using this method, if the user has been logged on for too long.
 *
 * @example
 * const { error: reauthError } = reauthenticateWithCredentials(password);
 * if(reauthError) // handle reauthentication error
 *
 * const { error: updateError } = await changePassword(newPassword);
 * if(updateError) // handle update error
 */
export async function changePassword(password) {
  return parseThrowablesToObject(async () => {
    verifyAuthLogon(auth);

    await updatePassword(auth.currentUser, password);
  });
}

// TODO: Reset Password
