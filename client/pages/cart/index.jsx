import Head from "next/head";
import { useState } from "react";

import PaymentMethodSelector from "@/components/cart/PaymentMethodSelector";

export default function Cart() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");

  const isSelectedPaymentMethod = (str) => {
    return str === selectedPaymentMethod
      ? "relative selectedPaymentMethod"
      : "";
  };

  const handleClickPaymentMethod = (_, str) => {
    setSelectedPaymentMethod(str);
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
      <section className="Cart w-full px-16 grid xl:grid-cols-2">
        <div></div>
        <div>
          <h2 className="uppercase font-semibold text-xl mb-8">
            Choose a Payment Method
          </h2>
          <PaymentMethodSelector
            handleClickPaymentMethod={handleClickPaymentMethod}
            isSelectedPaymentMethod={isSelectedPaymentMethod}
          />
        </div>
      </section>
    </>
  );
}
