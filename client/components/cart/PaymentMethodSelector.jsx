import Image from "next/image";
import propTypes from "prop-types";

export default function PaymentMethodSelector({
  handleClickPaymentMethod,
  isSelectedPaymentMethod,
}) {
  return (
    <div className="grid gap-8 grid-cols-4 px-2 md:px-20 justify-items-center">
      <button
        onClick={(e) => handleClickPaymentMethod(e, "Visa")}
        className={`${isSelectedPaymentMethod("Visa")}`}
      >
        <Image
          src="/images/cart/visa_logo.png"
          alt="Visa"
          width="128"
          height="128"
          className="h-auto"
        />
      </button>
      <button
        onClick={(e) => handleClickPaymentMethod(e, "American Express")}
        className={`${isSelectedPaymentMethod("American Express")}`}
      >
        <Image
          src="/images/cart/american-express_logo.png"
          alt="American Express"
          width="100"
          height="100"
          className="h-auto"
        />
      </button>
      <button
        onClick={(e) => handleClickPaymentMethod(e, "MasterCard")}
        className={`${isSelectedPaymentMethod("MasterCard")}`}
      >
        <Image
          src="/images/cart/mastercard_logo.png"
          alt="MasterCard"
          width="100"
          height="100"
          className="h-auto"
        />
      </button>
      <button
        onClick={(e) => handleClickPaymentMethod(e, "PayPal")}
        className={`${isSelectedPaymentMethod("PayPal")}`}
      >
        <Image
          src="/images/cart/paypal_logo.png"
          alt="PayPal"
          width="128"
          height="128"
          className="w-auto"
        />
      </button>
    </div>
  );
}

PaymentMethodSelector.propTypes = {
  handleClickPaymentMethod: propTypes.func.isRequired,
  isSelectedPaymentMethod: propTypes.func.isRequired,
};
