import propTypes from "prop-types";
import { Check } from "lucide-react";

export default function InclusionCheckbox({
  inclusionName,
  serviceInclusions,
  handleClick,
}) {
  const isChecked =
    serviceInclusions.find((inclusion) => inclusion === inclusionName) !==
    undefined;

  return (
    <button
      onClick={handleClick}
      className="flex gap-2 mb-2 hover:cursor-pointer items-center"
    >
      <div className="flex items-center rounded-md bg-white p-1">
        <Check color={`${isChecked ? "black" : "white"}`} size="18" />
      </div>
      <div className="flex items-center uppercase font-medium">
        {inclusionName}
      </div>
    </button>
  );
}

InclusionCheckbox.propTypes = {
  inclusionName: propTypes.string.isRequired,
  serviceInclusions: propTypes.arrayOf(propTypes.string).isRequired,
  handleClick: propTypes.func.isRequired,
};
