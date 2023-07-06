import { Link } from "@react-email/components";
import { PropsWithChildren } from "react";
import Tailwind from "./Tailwind";

interface SafeLinkProps {
  url?: string;
}

/**
 * Component that wraps the link component to ensure that it
 * always comes with a safe redirect url alongside its href.
 *
 * @param props SafeLink props.
 * @return A JSX component that has a safe redirect url.
 */
function SafeLink({ url = "", children }: PropsWithChildren<SafeLinkProps>) {
  return (
    <Tailwind>
      <Link
        href={url}
        data-saferedirecturl={`https://www.google.com/url?q=${url}`}
        className="m-0 p-0 leading-snug text-xs text-accent"
      >
        {children}
      </Link>
    </Tailwind>
  );
}

export default SafeLink;
