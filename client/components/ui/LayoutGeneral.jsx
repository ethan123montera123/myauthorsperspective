// icons from https://lucide.dev/guide/packages/lucide-react
import { Menu, X } from "lucide-react";

import Footer from "../ui/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import CartHeaderLink from "../CartHeaderLink";
import { useUser } from "@/helpers/auth.helper";

/* NOTE: This component is highly dependent on LayoutWhiteHeader, changes must be synchronized between them */
export default function LayoutGeneral({ children }) {
  const CURRENT_PATH = useRouter().pathname;
  const { currentUser, signOutCurrentUser } = useUser();

  const [isShowingLinks, setIsShowingLinks] = useState(false);

  const userIsAuthenticated = (() => {
    // TODO: perform user authentication async functions here to determine to show cart link
    return false;
    // return currentUser !== null;
  })();

  const toggleShowLinks = () => {
    setIsShowingLinks(!isShowingLinks);
  };

  const headerBg = isShowingLinks ? "bg-white" : "";

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

  const roundedFooter = CURRENT_PATH === "/" ? true : false;

  const generateMainContainer = () => {
    if (isShowingLinks === false) {
      return <main className="mt-6 lg:mt-8">{children}</main>;
    } else {
      // returns a customized view of the links for mobile devices
      return (
        <>
          <main className="mt-6 mb-12 lg:mt-8">{children}</main>
          <div className="absolute w-full top-[118px] pb-6 flex flex-col bg-white z-50 items-center text-xl shadow-xl">
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
              className="uppercase py-4 px-2 relative my-2"
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
      <header
        className={`${headerBg} relative w-full flex justify-between flex-row items-center pl-4 pr-8 lg:pl-8 py-1 pt-2 z-10`}
      >
        <Link href="/" aria-label="Homepage">
          <Image
            className="mt-2"
            src="/images/logo.png"
            alt="My Author's Perspective"
            width="112"
            height="112"
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
      </header>
      {generateMainContainer()}
      <Footer rounded={roundedFooter} />
    </>
  );
}
