import propTypes from "prop-types";
import Image from "next/image";

import { formatUsd } from "@/helpers/currency.helper";

export default function ServiceDetails({
  title,
  imgSrc,
  priceUsd,
  inclusions,
}) {
  const handleAddToCart = () => {
    console.log(`Handle adding ${title} to cart...`);
  };

  return (
    <div className="ServiceDetails grid gap-8 grid-cols-1 xl:grid-cols-2">
      <Image
        src={imgSrc}
        alt={title}
        width={675}
        height={900}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />
      <div className="flex flex-col">
        <h2 className="tracking-wider text-lg lg:text-2xl uppercase font-bold">
          {title}
        </h2>
        <h3 className="tracking-widest font-bold mt-3 text-xl">
          {formatUsd(priceUsd, { showDecimals: false })}
        </h3>
        <div>
          <h4 className="mt-4 uppercase">Inclusions:</h4>
          <ul className="pl-6 list-disc grid grid-cols-1 sm:grid-cols-2 lg:gap-x-4">
            {inclusions.map((i) => (
              <li
                className="my-1 text-lg sm:text-base lg:text-lg lg:my-[0.5rem]"
                key={i}
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-lg uppercase tracking-wider bg-neutral-600 hover:bg-[#00C1EB] text-white px-10 py-4 mt-5 md:mt-3 xl:mt-auto w-max"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ServiceDetails.propTypes = {
  title: propTypes.string.isRequired,
  imgSrc: propTypes.string.isRequired,
  priceUsd: propTypes.number.isRequired,
  inclusions: propTypes.arrayOf(propTypes.string).isRequired,
};
