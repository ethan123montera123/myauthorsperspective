import propTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

import currencyHelper from "@/helpers/currency.helper";

export default function CardService({ url, imgUrl, title, priceUsd }) {
  return (
    <Link
      href={url}
      className="CardService flex flex-col gap-1 w-full shadow hover:shadow-lg transition-shadow rounded overflow-hidden"
    >
      <div className="w-full h-[250px]">
        <Image
          src={imgUrl}
          alt={title}
          width={675}
          height={900}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="px-4 py-2">
        <h3 className="font-semibold uppercase text-base">{title}</h3>
        <div className="flex justify-end text-lg mt-2">
          {currencyHelper.formatUsd(priceUsd, { showDecimals: false })}
        </div>
      </div>
    </Link>
  );
}

CardService.propTypes = {
  url: propTypes.string.isRequired,
  imgUrl: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  priceUsd: propTypes.number.isRequired,
};
