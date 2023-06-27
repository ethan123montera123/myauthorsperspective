/**
 * Custom hook to get current user authentication details.
 *
 * @example
 * const {currentUser, signOutCurrentUser} = useUser();
 *
 * useEffect(() => {
 *   if (currentUser !== null) {
 *      console.log("User is authenticated!");
 *   } else {
 *      console.log("User is null.");
 *   }
 * }, [currentUser]);
 *
 * @returns { currentUser: UserAccount, signOutCurrentUser: () => void} if successful, otherwise both are set to `null`
 */
export const useUser = () => {
  // TODO: perform functions to get user here
  // const data = getAuthAccount();

  const currentUser = {
    firstName: "data.firstName",
    lastName: "data.lastName",
    email: "data.email",
    phone: "data.phone",
    stripeId: "data.stripeId",
  };

  const signOutCurrentUser = () => {
    // TODO: perform user sign out logic here
    console.log("Signing out.");
  };

  if (currentUser.stripeId) {
    console.log("User is available.");
    return { currentUser, signOutCurrentUser };
  } else {
    console.log("No user is signed in.");
    return { currentUser: null, signOutCurrentUser: null };
  }
};
