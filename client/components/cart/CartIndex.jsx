import Head from "next/head";
import { useState, useEffect } from "react";
import { formatUsd } from "@/helpers/currency.helper";
import ServicesToAvail from "@/components/cart/ServicesToAvail";
import { CartContextWrapper } from "@/components/cart/CartContextWrapper";
import {
  getCartState,
  setCartState,
  inclusionFunctionThunk,
  getTotalPrice,
} from "@/helpers/cart.helper";
import { notifyError } from "@/helpers/notification.helper.";
import { createServiceTransaction } from "@/services/api/transaction";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/services/stripe";
import { CreditCard } from "lucide-react";

export default function CartIndex({ services }) {
  /* cart state */
  const [cart, setCart] = useState(getCartState());
  const [selectedService, setSelectedService] = useState(services[0].title);

  /* stripe state */
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  // (serviceId: string, inclusionId: number): void
  const addServiceAndInclusionToCart = inclusionFunctionThunk(cart, setCart);

  const handleCheckOut = async () => {
    if (!services) {
      notifyError("Services have not loaded yet! Cannot check out.");
    }

    /* code to make stripe payment intent */
    const { data, error } = await createServiceTransaction(cart);
    if (error) {
      if (error.status === "INVALID_ARGUMENT") {
        return notifyError(
          "Add items to your cart after clearing your browser cache then try again."
        );
      } else {
        return notifyError(error.message);
      }
    }
    setSecret(data.secret);
  };

  const selectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleEditCart = () => {
    setSecret(null);
  };

  return (
    <>
      <Head>
        <title>Your Cart</title>
        <meta
          name="description"
          content="View your cart and checkout with our payment providers."
        />
      </Head>
      <section className="Cart w-full grid gap-y-8 xl:gap-y-0 gap-x-6 xl:grid-cols-2 mt-8">
        <div className="px-2 md:px-0">
          <CartContextWrapper cart={cart}>
            <ServicesToAvail
              services={services}
              selectedService={selectedService}
              selectService={selectService}
              addServiceAndInclusionToCart={addServiceAndInclusionToCart}
              disabled={secret !== null}
            />
          </CartContextWrapper>
        </div>
        <div className="flex items-center">
          {secret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: secret,
              }}
            >
              <CheckoutForm handleEditCart={handleEditCart} />
            </Elements>
          ) : (
            <button
              onClick={handleCheckOut}
              aria-label="Check out"
              className="pb-4 rounded-xl border-2 w-full border-[rgb(230,230,230)] bg-neutral-200 grid place-items-center shadow-md hover:shadow-lg transition-shadow"
            >
              <CreditCard size="128px" color="rgb(115,115,115)" />
              <span className="uppercase tracking-wider font-bold text-xl text-neutral-500">
                Add Payment Method
              </span>
            </button>
          )}
        </div>
        <h2 className="tracking-wider uppercase font-semibold text-xl mb-2 mt-0 xl:mt-4 text-center">
          Total: {formatUsd(getTotalPrice(services, cart))}
        </h2>
      </section>
    </>
  );
}
