// icons from https://lucide.dev/guide/packages/lucide-react
import { ChevronsUp, Menu, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LayoutServices({ children, router }) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateMainContainer = () => {
    if (isShowingLinks === false) {
      return <main className="mx-8 my-6 lg:mx-32 lg:my-8">{children}</main>;
    } else {
      // returns a customized view of the links for mobile devices
      return (
        <>
          <main className="mx-8 my-2 lg:mx-32 lg:my-8">{children}</main>
          <div className="absolute w-full top-[88px] pb-6 flex flex-col bg-white z-10 items-center text-xl shadow-xl">
            <Link
              href="/services"
              className="uppercase py-4 px-2 relative"
              id={isSelected("services")}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="uppercase py-4 px-2"
              id={isSelected("about")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="uppercase py-4 px-2"
              id={isSelected("contact")}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="uppercase py-4 px-2"
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
      <header className="relative w-full flex justify-between flex-row items-center pl-4 pr-6 lg:pl-8 lg:pr-6 py-1 shadow-[0_0_12px_rgba(0,0,0,0.33)]">
        <Link href="/" aria-label="Homepage">
          <Image
            src="/images/logo.png"
            alt="My Author's Perspective"
            width="80"
            height="80"
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
            className="uppercase py-4 px-2"
            id={isSelected("about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="uppercase py-4 px-2"
            id={isSelected("contact")}
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className="uppercase py-4 px-2"
            id={isSelected("cart")}
          >
            Cart (0)
          </Link>
        </div>
      </header>
      {generateMainContainer()}
      <footer className="text-xs md:text-base mt-auto bg-neutral-700 text-white flex justify-center py-2 uppercase">
        <div
          aria-label="Scroll To Top"
          onClick={scrollToTop}
          className="-translate-y-[calc(100%+6px)] bg-neutral-700 absolute px-3 pt-1 rounded-t-3xl hover:cursor-pointer"
        >
          <ChevronsUp color="white" />
        </div>
        ©2023 | My Author&rsquo;s Perspective
      </footer>
    </>
  );
}
