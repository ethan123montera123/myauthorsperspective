import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/Signup";
import Head from "next/head";

import { useState } from "react";

export default function Auth() {
  const [isShowingLogin, setIsShowingLogin] = useState(true);

  const toggleShowLogin = () => setIsShowingLogin((prev) => !prev);

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Authenticate with your My Author's Perspective account."
        />
      </Head>

      <div className="flex justify-center pb-8">
        {isShowingLogin ? (
          <Login handleSwapAuth={toggleShowLogin} />
        ) : (
          <SignUp handleSwapAuth={toggleShowLogin} />
        )}
      </div>
    </>
  );
}
