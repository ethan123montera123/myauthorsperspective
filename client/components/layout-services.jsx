// icons from https://lucide.dev/guide/packages/lucide-react
import { ChevronsUp } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function LayoutServices({ children }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="w-full flex justify-between items-center pl-8 pr-6 py-1 shadow-[0_0_12px_rgba(0,0,0,0.33)]">
        <Link href="/" aria-label="Homepage">
          <Image
            src="/images/logo.png"
            alt="My Author's Perspective"
            width="80"
            height="80"
          />
        </Link>
        <div className="flex gap-4 font-medium">
          <Link
            href="/services"
            className="uppercase hover:font-bold py-4 px-2"
          >
            Services
          </Link>
          <Link href="/about" className="uppercase hover:font-bold py-4 px-2">
            About
          </Link>
          <Link href="/contact" className="uppercase hover:font-bold py-4 px-2">
            Contact
          </Link>
          <Link href="/cart" className="uppercase hover:font-bold py-4 px-2">
            Cart (0)
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-auto bg-neutral-700 text-white flex justify-center py-2 uppercase">
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
