import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import ForgetPassword from "@/components/auth/ForgetPassword";
import Head from "next/head";

import { useState } from "react";

export default function Auth() {
  const [currentComponent, setCurrentComponent] = useState("Login");

  const generateCurrentComponent = () => {
    if (currentComponent === "Login") {
      return <Login setCurrentComponent={setCurrentComponent} />;
    } else if (currentComponent === "SignUp") {
      return <SignUp setCurrentComponent={setCurrentComponent} />;
    } else if (currentComponent === "ForgetPassword") {
      return <ForgetPassword setCurrentComponent={setCurrentComponent} />;
    }
  };

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
        {generateCurrentComponent()}
      </div>
    </>
  );
}
