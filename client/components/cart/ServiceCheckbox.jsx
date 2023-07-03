import React from "react";
import { Star } from "@mui/icons-material";
import propTypes from "prop-types";

export default function ServiceCheckbox({
  isStarred,
  serviceTitle,
  selectedService,
  handleClick,
}) {
  const outlineStyle =
    serviceTitle === selectedService
      ? "outline-yellow-400 outline outline-[3px]"
      : "";

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

ServiceCheckbox.propTypes = {
  isStarred: propTypes.bool.isRequired,
  serviceTitle: propTypes.string.isRequired,
  selectedService: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
};
