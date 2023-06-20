import Link from "next/link";
import propTypes from "prop-types";

// creates the HOME / SERVICES / SERVICE_NAME component that links to the appropriate pages
export default function Breadcrumb({ orderedPathNames }) {
  return (
    <div className="Breadcrumb pb-2">
      {orderedPathNames.map((path, index) => {
        const { name, url } = path;
        if (index !== orderedPathNames.length - 1) {
          return (
            <>
              <Link className="uppercase no-underline" key={name} href={url}>
                {name}
              </Link>{" "}
              /{" "}
            </>
          );
        } else {
          return (
            <Link
              className="font-bold uppercase no-underline"
              key={name}
              href={url}
            >
              {name}
            </Link>
          );
        }
      })}
    </div>
  );
}

Breadcrumb.propTypes = {
  // example: [{name, url}, {name, url}, ...]
  orderdPathNames: propTypes.array.isRequired,
};
