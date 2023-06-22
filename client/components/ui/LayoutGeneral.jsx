// icons from https://lucide.dev/guide/packages/lucide-react
import { Menu, X } from "lucide-react";

import Footer from "../ui/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LayoutGeneral({ children }) {
  const CURRENT_PATH = useRouter().pathname;

  const [isShowingLinks, setIsShowingLinks] = useState(false);

  const toggleShowLinks = () => {
    setIsShowingLinks(!isShowingLinks);
  };

  const isSelected = (category) => {
    // if the category name is found in the URL path
    if (CURRENT_PATH.indexOf(category) != -1) {
      return "selectedCategory";
    } else {
      return "";
    }
  };

  const generateMainContainer = () => {
    if (isShowingLinks === false) {
      return <main className="mx-2 mt-6 lg:mx-32 lg:mt-8 ">{children}</main>;
    } else {
      // returns a customized view of the links for mobile devices
      return (
        <>
          <main className="mx-8 mt-6 mb-12 lg:mx-32 lg:mt-8 ">{children}</main>
          <div className="absolute w-full top-[112px] pb-6 flex flex-col bg-white z-10 items-center text-xl shadow-xl">
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
            <Link
              href="/cart"
              className="uppercase py-4 px-2 relative"
              id={isSelected("cart")}
            >
              Cart (0)
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <header
        className={`${
          isShowingLinks ? "bg-white" : ""
        } relative w-full flex justify-between flex-row items-center pl-4 pr-8 lg:pl-8 py-1 z-10`}
      >
        <Link href="/" aria-label="Homepage">
          <Image
            src="/images/logo.png"
            alt="My Author's Perspective"
            width="112"
            height="112"
          />
        </Link>
        <button className="lg:hidden" onClick={toggleShowLinks}>
          {isShowingLinks ? (
            <X color="black" size="40px" />
          ) : (
            <Menu color="black" size="40px" />
          )}
        </button>
        <div className={`hidden lg:flex gap-4 font-medium`}>
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
          <Link
            href="/cart"
            className="uppercase py-4 px-2 relative"
            id={isSelected("cart")}
          >
            Cart (0)
          </Link>
        </div>
      </header>
      {generateMainContainer()}
      <Footer />
    </>
  );
}
