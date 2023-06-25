import { ChevronsUp } from "lucide-react";
import propTypes from "prop-types";

export default function Footer({ rounded = true }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const borderStyles = rounded
    ? "border-8 border-white rounded-b-3xl border-t-0"
    : "";

  return (
    <footer
      className={`${borderStyles} Footer  mt-auto text-xs md:text-base bg-neutral-700 text-white flex justify-center py-2 uppercase`}
    >
      <button
        aria-label="Scroll To Top"
        onClick={scrollToTop}
        className="-translate-y-[calc(100%+6px)] bg-neutral-700 absolute px-3 pt-1 rounded-t-3xl hover:cursor-pointer"
      >
        <ChevronsUp color="white" />
      </button>
      ©2023 | My Author&rsquo;s Perspective
    </footer>
  );
}

Footer.propTypes = {
  rounded: propTypes.bool,
};
