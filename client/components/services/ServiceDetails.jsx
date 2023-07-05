import propTypes from "prop-types";
import Image from "next/image";
import { formatUsd } from "@/helpers/currency.helper";
import { useState } from "react";
import { Check } from "lucide-react";
import { addToLocalCart } from "@/helpers/cart.helper";
import { notifyError, notifySuccess } from "@/helpers/notification.helper.";

export default function ServiceDetails({
  title,
  imgSrc,
  priceUsd,
  serviceId,
  inclusions,
}) {
  const [pendingCartInclusions, setPendingCartInclusions] = useState([]);

  const handleToggleInclusion = (inclusionId) => {
    if (pendingCartInclusions.find((i) => i === inclusionId) === undefined) {
      setPendingCartInclusions([inclusionId, ...pendingCartInclusions]);
    } else {
      setPendingCartInclusions(
        pendingCartInclusions.filter((i) => i !== inclusionId)
      );
    }
  };

  const handleAddToCart = () => {
    if (addToLocalCart(serviceId, pendingCartInclusions) === true) {
      notifySuccess(`Added "${title}" to cart.`);
    } else {
      notifyError("Could not add to cart, try using the Cart page.");
    }
  };

  const isInclusionChecked = (id) =>
    pendingCartInclusions.find((i) => i === id) !== undefined;

  const priceTag =
    title !== "Author's Blog Site"
      ? formatUsd(priceUsd, { showDecimals: false })
      : "$1,500 - $2,000";

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
        <h3 className="tracking-widest font-bold mt-3 text-xl">{priceTag}</h3>
        <div>
          <h4 className="mt-4 uppercase">Inclusions:</h4>
          <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 lg:gap-x-4">
            {inclusions.map((i) => (
              <li
                onClick={() => handleToggleInclusion(i.id)}
                className="my-1 text-lg sm:text-base lg:text-lg lg:my-[0.5rem] cursor-pointer list-none flex gap-2"
                key={i.id}
              >
                <div className="flex items-center rounded-md bg-neutral-200 outline-2 p-1">
                  <Check
                    color={`${
                      isInclusionChecked(i.id) ? "black" : "rgb(229,229,229)"
                    }`}
                    size="18"
                  />
                </div>
                {i.name}
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
  serviceId: propTypes.string.isRequired,
  inclusions: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      tier: propTypes.string,
    })
  ).isRequired,
};
