import propTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

export default function CardHoverService({
  title,
  url,
  imgSrc,
  priceUsd,
  className,
}) {
  console.log(imgSrc);
  return (
    <div
      className={`relative h-[16rem] xl:h-[24rem] rounded-2xl overflow-hidden ${className}`}
    >
      <Link href={url}>
        <div className="CardHoverService h-full w-full rounded">
          <Image
            src={imgSrc}
            fill={true}
            alt={title}
            className="object-cover"
          />
          <div className="uppercase font-bold tracking-wider drop-shadow-md px-6 text-center w-full py-6 text-lg flex justify-center items-end first-letter text-white z-10 absolute card-gradient-overlay h-full">
            {title}
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
