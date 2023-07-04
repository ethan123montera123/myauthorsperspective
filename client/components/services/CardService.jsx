import propTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

import { formatUsd } from "@/helpers/currency.helper";

export default function CardService({ url, imgSrc, title, priceUsd }) {
  const priceTag =
    title !== "Author's Blog Site"
      ? formatUsd(priceUsd, { showDecimals: false })
      : "$1,500 - $2,000";

  return (
    <Link
      href={url}
      className="CardService flex flex-col gap-1 w-full shadow hover:shadow-lg transition-shadow rounded overflow-hidden"
    >
      <div className="w-full h-[155px] md:h-[250px]">
        <Image
          src={imgSrc}
          alt={title}
          width={675}
          height={900}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="px-4 py-2">
        <h3 className="font-semibold uppercase text-base">{title}</h3>
        <div className="flex justify-end text-lg mt-2">{priceTag}</div>
      </div>
    </Link>
  );
}

CardService.propTypes = {
  url: propTypes.string.isRequired,
  imgSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  priceUsd: propTypes.number.isRequired,
};
