import propTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatUsd } from "@/helpers/currency.helper";

export default function CardHoverService({
  title,
  url,
  imgSrc,
  priceUsd,
  className,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const overlayClass = isHovering
    ? "card-gradient-overlay-hover"
    : "card-gradient-overlay";

  const priceTag =
    title !== "Author's Blog Site"
      ? formatUsd(priceUsd, { showDecimals: false })
      : [
          <div key="basic">Basic: $1,500</div>,
          <div key="premium">Premium: $2,000</div>,
        ];

  const cardContent = isHovering ? (
    <div className="flex flex-col gap-6 lg:mb-5">
      <div>{title}</div>
      <div>{priceTag}</div>
      <button className="uppercase text-black bg-neutral-400 rounded-[2rem] px-5 py-2 self-center hover:bg-[#00C1EB]">
        Book Now
      </button>
    </div>
  ) : (
    title
  );

  return (
    <div
      tabIndex={0}
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className={`${className} rounded-3xl shadow-2xl focus:scale-[1.01] hover:scale-[1.01] hover:shadow-xl transition-all relative h-[16rem] xl:h-[24rem] overflow-hidden`}
    >
      <Link href={url} tabIndex="-1">
        <div className="CardHoverService h-full w-full rounded">
          <Image
            src={imgSrc}
            fill={true}
            alt={title}
            className="object-cover"
          />
          <div
            className={`${overlayClass} uppercase font-bold tracking-wider drop-shadow-md px-6 text-center w-full py-6 text-lg flex justify-center items-center lg:items-end first-letter text-white z-10 absolute h-full`}
          >
            {cardContent}
          </div>
        </div>
      </Link>
    </div>
  );
}

CardHoverService.propTypes = {
  title: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  imgSrc: propTypes.string.isRequired,
  priceUsd: propTypes.number.isRequired,
  className: propTypes.string,
};
