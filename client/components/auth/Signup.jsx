import Link from "next/link";
import { useState } from "react";
import { UserSquare, Lock, AtSign, WholeWord, Phone } from "lucide-react";
import propTypes from "prop-types";
import { signUpWithCredentials } from "@/services/api/auth";
import { notifySuccess, notifyError } from "@/helpers/notification.helper.";
import { useRouter } from "next/router";
import isValid from "../../helpers/validation.helper";

export default function SignUp({ setCurrentComponent }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, isFetching] = useState(false);

  const handleSwapAuth = () => {
    setCurrentComponent("Login");
  };

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValid.firstName(firstName) ||
      !isValid.lastName(lastName) ||
      !isValid.email(email) ||
      !isValid.phone(phone) ||
      !isValid.password(password)
    ) {
      return;
    }

    const accountPayload = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    isFetching(true);
    const { error } = await signUpWithCredentials(accountPayload);
    if (error) {
      // handle errors gracefully and reflect it in UI based on user.schema.ts
      const errors = error.details;
      const firstErrorInArray = Object.values(errors)[0][0];
      isFetching(false);
      return notifyError(firstErrorInArray);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      notifySuccess("Account successfully created.");
      isFetching(false);
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
          <fieldset className="relative" disabled={isFetching}>
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
                title="Must only contain alpha characters, whitespace, ., -, and _."
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
                title="Must only contain alpha characters, whitespace, ., -, and _."
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
                <Phone
                  size="22"
                  color={phone.length > 0 ? "black" : "#8e8e8e"}
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
                type="password"
                title="Password must at least contain one uppercase letter, one lowercase letter, a digit, and a special character (!@#$&*)."
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
                onClick={handleSwapAuth}
                className="hover:text-[#2200F0] text-xs font-semibold tracking-wide"
                href="#"
              >
                Log in with an existing account
              </Link>
            </div>
          </fieldset>
          <button
            disabled={fetching}
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
