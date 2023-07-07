import { Check } from "lucide-react";
import CartContext from "./CartContextWrapper";
import { useContext } from "react";
import { notifyWarning } from "@/helpers/notification.helper.";

export default function InclusionCheckbox({
  serviceId,
  inclusionName,
  inclusionId,
  handleClick,
  disabled,
}) {
  const cart = useContext(CartContext);

  // find the matching cartItem entry based on the inclusion's serviceId,
  // then see if the inclusion is in the inclusions array
  const isChecked =
    cart
      .find((e) => e.service === serviceId)
      ?.inclusions.find((i) => i === inclusionId) !== undefined;

  return (
    <button
      onClick={
        disabled
          ? () => {
              notifyWarning("Can't edit cart during checkout.");
            }
          : handleClick
      }
      className={`${
        disabled ? "cursor-default" : "cursor-pointer"
      } flex gap-2 mb-2 hover:cursor-pointer items-center`}
    >
      <div
        className={`${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } flex items-center rounded-md bg-white p-1`}
      >
        <Check color={`${isChecked ? "black" : "white"}`} size="18" />
      </div>
      <div
        className={`${
          disabled ? "cursor-default" : "cursor-pointer"
        } flex items-center text-xs md:text-base uppercase font-medium`}
      >
        {inclusionName}
      </div>
    </button>
  );
}
