import { ChevronsUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="Footer mt-auto text-xs md:text-base bg-neutral-700 text-white flex justify-center py-2 uppercase">
      <div
        aria-label="Scroll To Top"
        onClick={scrollToTop}
        className="-translate-y-[calc(100%+6px)] bg-neutral-700 absolute px-3 pt-1 rounded-t-3xl hover:cursor-pointer"
      >
        <ChevronsUp color="white" />
      </div>
      ©2023 | My Author&rsquo;s Perspective
    </footer>
  );
}
