import Link from "next/link";
import { useState } from "react";
import { UserSquare, Lock, Facebook } from "lucide-react";
import propTypes from "prop-types";
import { signInWithCredentials } from "@/services/api/auth";
import { useRouter } from "next/router";
import { notifySuccess, notifyError } from "@/helpers/notification.helper.";
import { prettyPrintFirebaseError } from "@/helpers/errors.helper";

export default function Login({ setCurrentComponent }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleSwapAuth = () => {
    setCurrentComponent("SignUp");
  };

  const handleForgetPassword = () => {
    setCurrentComponent("ForgetPassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signInWithCredentials(email, password);
    if (error) {
      // handle errors gracefully and reflect it in UI
      console.log(error.code, error);
      return notifyError(prettyPrintFirebaseError(error.code));
    } else {
      setEmail("");
      setPassword("");
      notifySuccess("Successfully logged in.");
      router.push("/");
    }
  };

  return (
    <>
      <div className="background-dim"></div>
      <section className="rounded-3xl flex flex-col items-center bg-white m-4 mt-0 p-5 py-8 md:p-12 shadow-md relative z-40">
        <h1 className="Login uppercase mb-12 text-3xl font-bold tracking-wide">
          Log In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative">
            <label
              className="text-xs font-semibold text-neutral-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setEmail)}
              value={email}
              name="email"
              id="email"
              placeholder="Type your email"
              required
            />
            <div className="absolute left-1 bottom-3 ">
              <UserSquare
                size="22"
                color={email.length > 0 ? "black" : "#8e8e8e"}
              />
            </div>
          </div>
          <div className="relative pt-2">
            <label
              className="text-xs font-semibold text-neutral-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setPassword)}
              value={password}
              name="password"
              id="password"
              placeholder="Type your password"
              type="password"
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
          <div className="mt-2 flex justify-between text-neutral-600">
            <Link
              className="hover:text-[#2200F0] text-xs font-semibold tracking-wide"
              href="#"
              onClick={handleSwapAuth}
            >
              Create an account
            </Link>
            <Link
              onClick={handleForgetPassword}
              className="hover:text-[#2200F0] text-xs font-semibold tracking-wide"
              href="#"
            >
              Reset password
            </Link>
          </div>
          <button
            type="submit"
            className="rounded-xl mt-8 font-bold uppercase tracking-wider bg-[#00C1EB] hover:bg-[#239db9] px-8 py-[0.5rem]"
          >
            Log in
          </button>
        </form>
      </section>
    </>
  );
}

Login.propTypes = {
  setCurrentComponent: propTypes.func.isRequired,
};
