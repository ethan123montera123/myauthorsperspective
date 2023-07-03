import Link from "next/link";
import { useState } from "react";
import {
  UserSquare,
  Lock,
  Facebook,
  AtSign,
  WholeWord,
  Phone,
} from "lucide-react";
import propTypes from "prop-types";
import { signUpWithCredentials } from "@/services/api/auth";
import { notifySuccess, notifyError } from "@/helpers/notification.helper.";
import { useRouter } from "next/router";
import { prettyPrintFirebaseError } from "@/helpers/errors.helper";

export default function SignUp({ setCurrentComponent }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSwapAuth = () => {
    setCurrentComponent("Login");
  };

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]*$/.test(firstName)) {
      return notifyError("First Name must only contain letters and spaces.");
    } else if (!/^[A-Za-z\s]*$/.test(lastName)) {
      return notifyError("Last Name must only contain letters and spaces.");
    } else if (!/^(?!.*\s).{6,}$/.test(password)) {
      return notifyError(
        "Password must contain at least 6 characters with no whitespace."
      );
    }

    const accountPayload = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    // console.log("Form Inputs:");
    // console.table(accountPayload);

    const { error } = await signUpWithCredentials(accountPayload);
    if (error) {
      // handle errors gracefully and reflect it in UI
      // console.log("error.code", error.code, "error", error);
      return notifyError(prettyPrintFirebaseError(error.code));
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      notifySuccess("Account successfully created.");
      router.push("/");
    }
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
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setFirstName)}
              value={firstName}
              name="firstName"
              id="firstName"
              type="text"
              title="First Name must only contain letters."
              required
            ></input>
            <div className="absolute left-1 bottom-3">
              <UserSquare
                size="22"
                color={firstName.length > 0 ? "black" : "#8e8e8e"}
              />
            </div>
          </div>
          <div className="relative pt-2">
            <label
              className="text-xs font-semibold text-neutral-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setLastName)}
              value={lastName}
              name="lastName"
              id="lastName"
              type="text"
              title="Last Name must only contain letters."
              required
            ></input>
            <div className="absolute left-1 bottom-3">
              <WholeWord
                size="22"
                color={lastName.length > 0 ? "black" : "#8e8e8e"}
              />
            </div>
          </div>
          <div className="relative pt-2">
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
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="border-b-2 border-neutral-400 focus:border-black py-2 w-full pl-9 focus:outline-none"
              onChange={(e) => handleChange(e, setPhone)}
              value={phone}
              name="phone"
              id="phone"
              type="tel"
              title="Your phone number."
              required
            ></input>
            <div className="absolute left-1 bottom-3 ">
              <Phone size="22" color={phone.length > 0 ? "black" : "#8e8e8e"} />
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
              type="password"
              title="Password must contain at least 6 characters minimum and 20 characters maximum."
              minLength="6"
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
      </section>
    </>
  );
}

SignUp.propTypes = {
  setCurrentComponent: propTypes.func.isRequired,
};
