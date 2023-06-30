import { Link } from "@react-email/components";
import Tailwind from "./Tailwind";

interface SafeLinkProps {
  url?: string;
  children?: React.ReactNode;
}

function SafeLink({ url = "", children }: SafeLinkProps) {
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
