import Link from "next/link";
import { Lock, AtSign } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { notifyInfo } from "@/helpers/notification.helper.";

export default function ResetPassword({ setCurrentComponent }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigateToLogin = () => {
    setCurrentComponent("Login");
  };

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Inputs:");
    console.log("email -", email);
    console.log("password -", password);
    const accountPayload = {
      email,
      password,
    };

    // setEmail("");
    // setPassword("");
    notifyInfo("Check your inbox to complete the password reset.");
    // router.push("/auth");
  };

  return (
    <>
      <div className="flex justify-center pb-8">
        <div className="background-dim"></div>
        <section className="rounded-3xl flex flex-col items-center bg-white m-4 mt-0 p-5 py-8 md:p-12 shadow-md relative z-40">
          <h1 className="Login uppercase mb-8 text-3xl font-bold tracking-wide text-center">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="relative">
              <label
                className="text-xs font-semibold text-neutral-700"
                for="email"
              >
                Email
              </label>
              <input
                className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
                onChange={(e) => handleChange(e, setEmail)}
                value={email}
                name="email"
                id="email"
                type="email"
                title="The email address to be used for your email notifications."
                required
              ></input>
              <div className="absolute left-1 bottom-3 ">
                <AtSign
                  size="22"
                  color={email.length > 0 ? "black" : "#8e8e8e"}
                />
              </div>
            </div>
            <div className="relative pt-2">
              <label
                className="text-xs font-semibold text-neutral-700"
                for="password"
              >
                New Password
              </label>
              <input
                className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
                onChange={(e) => handleChange(e, setPassword)}
                value={password}
                name="password"
                id="password"
                type="password"
                title="Password must be 8-20 characters long."
                minLength="8"
                maxLength="20"
                required
              />
              <div className="absolute left-1 bottom-3 ">
                <Lock
                  size="22"
                  color={password.length > 0 ? "black" : "#8e8e8e"}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-end text-neutral-600">
              <Link
                onClick={handleNavigateToLogin}
                className="hover:text-[#2200F0] text-xs font-semibold tracking-wide"
                href="#"
              >
                Log in with an existing account
              </Link>
            </div>
            <button
              type="submit"
              className="rounded-xl mt-8 font-bold uppercase tracking-wider bg-[#00C1EB] hover:bg-[#239db9] px-8 py-[0.5rem]"
            >
              Send Confirmation Email
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

ResetPassword.propTypes = {
  setCurrentComponent: propTypes.func.isRequired,
};
