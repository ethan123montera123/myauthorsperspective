import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { notifyError } from "@/helpers/notification.helper.";

function Button({ className, children, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className="tracking-wider hover:shadow-lg active:shadow-lg transition-shadow shadow uppercase px-4 py-2 bg-gradient-to-bl from-[#00C1EB] to-[#008fb0] text-white rounded-2xl w-full text-center"
    >
      {children}
    </button>
  );
}

export default function CheckoutForm({ handleEditCart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFetching || !stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // TODO: Change this during production.
    const RETURN_URL = "localhost:3000/cart/result";

    setIsFetching(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        // https://example.com/order/123/complete?payment_intent=pi_3NREZNLkmjFF5ce91tyOOHcP&payment_intent_client_secret=pi_3NREZNLkmjFF5ce91tyOOHcP_secret_jlv00u93LRutibufjmBjJtPDh&redirect_status=succeeded
        return_url: RETURN_URL,
      },
    });

    if (result.error) {
      // Show error to customer (for example, payment details incomplete)
      notifyError(result.error.message);
      setIsFetching(false);
    } else {
      setIsFetching(false);
      // Customer will be redirected to `return_url`
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-4 m-auto flex flex-col my-4 gap-4"
    >
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isFetching}>
        Check Out
      </Button>
      <button
        disabled={isFetching}
        onClick={handleEditCart}
        className="tracking-wider hover:shadow-lg active:shadow-lg transition-shadow shadow uppercase px-4 py-2 bg-gradient-to-bl from-neutral-500 to-neutral-700 text-white rounded-2xl w-full text-center"
        type="button"
      >
        Edit Cart
      </button>
    </form>
  );
}
