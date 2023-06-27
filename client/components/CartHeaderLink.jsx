import Link from "next/link";
import propTypes from "prop-types";
import { useRouter } from "next/router";

export default function CartHeaderLink({ isSelected, showCart = false }) {
  const CURRENT_PATH = useRouter().pathname;

  const buttonStyles =
    CURRENT_PATH.indexOf("auth") !== -1
      ? "flex items-center uppercase py-4 px-2 relative"
      : "hover:shadow-lg active:shadow-lg transition-shadow shadow flex items-center uppercase px-4 py-2 bg-gradient-to-bl from-neutral-300 to-neutral-400 rounded-2xl font-semibold";

  const cartLink = (
    <Link
      href="/cart"
      className="uppercase py-4 px-2 relative"
      id={isSelected("cart")}
    >
      Cart
    </Link>
  );

  return showCart ? (
    cartLink
  ) : (
    <Link
      className="flex items-center cursor-default mb-2 lg:mb-0"
      href="/auth"
      tabIndex={-1}
    >
      <button id={isSelected("auth")} className={buttonStyles}>
        Sign Up
      </button>
    </Link>
  );
}

CartHeaderLink.propTypes = {
  isSelected: propTypes.func.isRequired,
  showSignUp: propTypes.bool,
};
