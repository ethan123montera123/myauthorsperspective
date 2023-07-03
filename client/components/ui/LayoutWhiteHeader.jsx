// icons from https://lucide.dev/guide/packages/lucide-react
import { Menu, X } from "lucide-react";

import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CartHeaderLink from "../CartHeaderLink";
import { auth } from "@/services/firebase";
import { getAuthAccount } from "@/services/api/auth";

/* NOTE: This component is highly dependent on LayoutGeneral, changes must be synchronized between them */
export default function LayoutWhiteHeader({ children }) {
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    console.log("The currentUser right now.", user);
  }, [user]);

  useEffect(() => {
    return auth.onAuthStateChanged(async (val) => {
      if (!val) return setUser(null);

      const { data, error } = await getAuthAccount();
      if (error) return console.log(error);

      setUser(data);
    });
  }, []);

  const CURRENT_PATH = useRouter().pathname;

  const [isShowingLinks, setIsShowingLinks] = useState(false);

  const userIsAuthenticated = (() => {
    return user !== null;
  })();

  const toggleShowLinks = () => {
    setIsShowingLinks(!isShowingLinks);
  };

  const isSelected = (category) => {
    if (category === "/" && CURRENT_PATH.length === 1) {
      return "selectedCategory";
    } else if (category !== "/" && CURRENT_PATH.indexOf(category) != -1) {
      // if the category name is found in the URL path
      return "selectedCategory";
    } else {
      return "";
    }
  };

  const generateMainContainer = () => {
    if (isShowingLinks === false) {
      return (
        <main className="mt-6 px-4 md:px-16 lg:px-32 mb-12 lg:mt-8 lg:mb-16">
          {children}
        </main>
      );
    } else {
      // returns a customized view of the links for mobile devices
      return (
        <>
          <main className="mt-6 px-4 md:px-16 lg:px-32 mb-12 lg:mt-8 lg:mb-16">
            {children}
          </main>
          <div className="absolute w-full top-[88px] pb-6 flex flex-col bg-white z-10 items-center text-xl shadow-xl">
            <Link
              href="/"
              className="uppercase py-4 px-2 relative"
              id={isSelected("/")}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="uppercase py-4 px-2 relative"
              id={isSelected("services")}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="uppercase py-4 px-2 relative"
              id={isSelected("about")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="uppercase py-4 px-2 relative mb-2"
              id={isSelected("contact")}
            >
              Contact
            </Link>
            <CartHeaderLink
              isSelected={isSelected}
              showCart={userIsAuthenticated}
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <header className="relative w-full flex justify-between flex-row items-center pl-4 pr-8 lg:pl-8 py-1 shadow-[0_0_12px_rgba(0,0,0,0.33)]">
        <Link href="/" aria-label="Homepage">
          <Image
            src="/images/logo.png"
            alt="My Author's Perspective"
            width="80"
            height="80"
            priority
          />
        </Link>
        <button
          aria-label="Toggle Navigation Menu"
          className="lg:hidden"
          onClick={toggleShowLinks}
        >
          {isShowingLinks ? (
            <X color="black" size="40px" />
          ) : (
            <Menu color="black" size="40px" />
          )}
        </button>

        <div className={`hidden lg:flex gap-4 font-medium`}>
          <Link
            href="/"
            className="uppercase py-4 px-2 relative"
            id={isSelected("/")}
          >
            Home
          </Link>
          <Link
            href="/services"
            className="uppercase py-4 px-2 relative"
            id={isSelected("services")}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="uppercase py-4 px-2 relative"
            id={isSelected("about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="uppercase py-4 px-2 relative"
            id={isSelected("contact")}
          >
            Contact
          </Link>
          <CartHeaderLink
            isSelected={isSelected}
            showCart={userIsAuthenticated}
          />
        </div>
      </header>
      {generateMainContainer()}
      <Footer rounded={false} />
    </>
  );
}
