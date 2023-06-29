import Link from "next/link";
import { useState } from "react";
import { UserSquare, Lock, Facebook, AtSign } from "lucide-react";
import propTypes from "prop-types";
import { signUpWithCredentials } from "@/services/api/auth";
import { notifySuccess, notifyError } from "@/helpers/notification.helper.";
import { useRouter } from "next/router";
import { prettyPrintFirebaseError } from "@/helpers/errors.helper";

export default function SignUp({ handleSwapAuth }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Inputs:");
    console.log("username -", username);
    console.log("email -", email);
    console.log("password -", password);
    const accountPayload = {
      firstName: "placeholder firstName",
      lastName: "placeholder lastName",
      email,
      password,
      phone: "000-8302",
    };
    const { error } = await signUpWithCredentials(accountPayload);
    if (error) {
      // handle errors gracefully and reflect it in UI
      console.log(error.code, error);
      return notifyError(prettyPrintFirebaseError(error.code));
    }

    setUsername("");
    setEmail("");
    setPassword("");
    notifySuccess("Account successfully created.");
    router.push("/");
  };

  return (
    <>
      <div className="background-dim"></div>
      <section className="rounded-3xl flex flex-col items-center bg-white m-4 mt-0 p-5 py-8 md:p-12 shadow-md relative z-40">
        <h1 className="Login uppercase mb-12 text-3xl font-bold tracking-wide">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative">
            <label
              className="text-xs font-semibold text-neutral-700"
              for="username"
            >
              Username
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setUsername)}
              value={username}
              name="username"
              id="username"
              type="text"
              pattern="[a-zA-Z][a-zA-Z0-9_.-]{5,19}"
              title="Username must start with a letter and be 6-20 characters long (letters, digits, '.', '_', and '-')."
              minLength="6"
              maxLength="20"
              required
            ></input>
            <div className="absolute left-1 bottom-3">
              <UserSquare
                size="22"
                color={username.length > 0 ? "black" : "#8e8e8e"}
              />
            </div>
          </div>
          <div className="relative pt-2">
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
              Password
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setPassword)}
              value={password}
              name="password"
              id="password"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+]{6,20}$"
              title="Password must be 6-20 characters long and include at least one lowercase letter, one uppercase letter, and one digit."
              minLength="8"
              maxLength="20"
              required
            ></input>
            <div className="absolute left-1 bottom-3 ">
              <Lock
                size="22"
                color={password.length > 0 ? "black" : "#8e8e8e"}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-end text-neutral-600">
            <Link
              onClick={handleSwapAuth}
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
            Sign up
          </button>
        </form>
        <div className="my-4 text-xs lowercase font-bold text-neutral-600">
          Or Sign up Using
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="rounded-full p-3 bg-[#32508E] hover:bg-[#284274]">
            <Facebook size="24" color="white" />
          </button>
          <button className="rounded-full p-3 bg-black hover:bg-[#222222]">
            <svg
              role="img"
              viewBox="0 0 24 26"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <title>Apple</title>
              <path
                fill="#FFF"
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              />
            </svg>
          </button>
          <button className="rounded-full p-3 flex items-center bg-[#DD4B39] hover:bg-[#bd4232]">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <title>Google</title>
              <path
                fill="white"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}

SignUp.propTypes = {
  handleSwapAuth: propTypes.func.isRequired,
};
