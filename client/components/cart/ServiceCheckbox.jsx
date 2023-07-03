import React from "react";
import { Star } from "@mui/icons-material";
import CartContext from "./CartContextWrapper";
import { useContext } from "react";

export default function ServiceCheckbox({
  serviceId,
  serviceTitle,
  selectedService,
  handleClick,
}) {
  const cart = useContext(CartContext);

  const outlineStyle =
    serviceTitle === selectedService
      ? "outline-yellow-400 outline outline-[3px]"
      : "";

  const isStarred =
    cart.find((cartItem) => cartItem.service === serviceId) !== undefined &&
    cart.find((cartItem) => cartItem.service === serviceId).inclusions.length >
      0;

  return (
    <div
      className={`${outlineStyle} bg-white flex p-[0.2rem] gap-2 rounded-md hover:cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`${
          isStarred ? "text-white" : "text-black"
        } flex items-center bg-black h-full p-1 pt-[0.2rem] rounded`}
      >
        <Star />
      </div>
      <div className="flex items-center uppercase text-xs font-medium">
        {serviceTitle}
      </div>
    </div>
  );
}
