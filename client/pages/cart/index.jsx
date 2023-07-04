import Head from "next/head";
import { useState, useEffect } from "react";
import { formatUsd } from "@/helpers/currency.helper";
import PaymentMethodSelector from "@/components/cart/PaymentMethodSelector";
import CardInformationForm from "@/components/cart/CardInformationForm";
import ServicesToAvail from "@/components/cart/ServicesToAvail";
import { CartContextWrapper } from "@/components/cart/CartContextWrapper";
import {
  getCartState,
  setCartState,
  inclusionFunctionThunk,
  getTotalPrice,
} from "@/helpers/cart.helper";
import { rawServices } from "@/helpers/services.helper";
import { createServiceTransaction } from "@/services/api/transaction";

export default function Cart({ services }) {
  /* payment method */
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardVerificationValue, setCardVerificationValue] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");

  /* cart state */
  const [cart, setCart] = useState(getCartState());
  const [selectedService, setSelectedService] = useState(services[0].title);

  // updates localStorage.cart whenever cart state changes
  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  // (serviceId: string, inclusionId: number): void
  const addServiceAndInclusionToCart = inclusionFunctionThunk(cart, setCart);

  const handleCheckOut = () => {
    console.log("Handling cart checkout... Cart payload:");
    console.log(cart);

    /* code to make stripe payment intent */
    // const { data, error } = createServiceTransaction(cart);
    // if (error) return notifyFailure(error.message);
    // setSecret(data.secret);
  };

  const selectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleClickPaymentMethod = (_, str) => {
    setSelectedPaymentMethod(str);
  };

  const isSelectedPaymentMethod = (str) => {
    return str === selectedPaymentMethod
      ? "relative selectedPaymentMethod"
      : "";
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
      <section className="Cart w-full grid gap-8 xl:grid-cols-2 my-8 mb-16">
        <div className="px-2 md:px-0">
          <CartContextWrapper cart={cart}>
            <ServicesToAvail
              services={services}
              selectedService={selectedService}
              selectService={selectService}
              addServiceAndInclusionToCart={addServiceAndInclusionToCart}
            />
          </CartContextWrapper>
        </div>
        <div className="px-4 lg:px-8">
          <h2 className="uppercase text-center md:text-left font-semibold text-lg md:text-xl mb-8">
            Choose a Payment Method
          </h2>
          <PaymentMethodSelector
            handleClickPaymentMethod={handleClickPaymentMethod}
            isSelectedPaymentMethod={isSelectedPaymentMethod}
          />
          <h2 className="uppercase text-center md:text-left font-semibold text-lg md:text-xl mb-4 mt-12 xl:mt-20">
            Card Information
          </h2>
          <CardInformationForm
            fName={fName}
            setFName={setFName}
            lName={lName}
            setLName={setLName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardExpiryDate={cardExpiryDate}
            setCardExpiryDate={setCardExpiryDate}
            cardVerificationValue={cardVerificationValue}
            setCardVerificationValue={setCardVerificationValue}
            cardZipCode={cardZipCode}
            setCardZipCode={setCardZipCode}
          />

          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-col">
              <h2 className="tracking-wider uppercase font-semibold text-xl mb-2 mt-12 text-center">
                Total: {formatUsd(getTotalPrice(services, cart))}
              </h2>
              <button
                onClick={handleCheckOut}
                className="self-end py-3 px-6 shadow hover:shadow-lg transition-shadow bg-[#04b2bd] hover:bg-[#1c7b82] text-white uppercase rounded-[2rem] font-semibold tracking-wider"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  // commented out due to FirebaseError bug
  // const { data, error } = await getServices();
  const data = rawServices;
  return {
    props: {
      services: data,
    },
  };
}
