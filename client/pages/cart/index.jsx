import Head from "next/head";
import { useState, useEffect } from "react";
import { formatUsd } from "@/helpers/currency.helper";
import PaymentMethodSelector from "@/components/cart/PaymentMethodSelector";
import CardInformationForm from "@/components/cart/CardInformationForm";
import ServicesToAvail from "@/components/cart/ServicesToAvail";
import { CartContextWrapper } from "@/components/cart/CartContextWrapper";
import { getServices } from "@/services/api/services";
import { inclusionFunctionThunk, getTotalPrice } from "@/helpers/cart.helper";

export default function Cart({ services }) {
  /* payment method */
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardVerificationValue, setCardVerificationValue] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");

  const isSelectedPaymentMethod = (str) => {
    return str === selectedPaymentMethod
      ? "relative selectedPaymentMethod"
      : "";
  };

  const handleClickPaymentMethod = (_, str) => {
    setSelectedPaymentMethod(str);
  };

  /* cart state */
  const [cart, setCart] = useState([]);
  const [selectedService, setSelectedService] = useState(services[0].title);

  const selectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const addServiceAndInclusionToCart = inclusionFunctionThunk(cart, setCart);

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
              <button className="self-end py-3 px-6 shadow hover:shadow-lg transition-shadow bg-[#04b2bd] hover:bg-[#1c7b82] text-white uppercase rounded-[2rem] font-semibold tracking-wider">
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
  const data = [
    {
      id: "6umwOV8A5lyaiBKCGq8G",
      priceTier: {
        default: "basic",
        premium: { level: 1, price: 2000 },
        basic: { level: 0, price: 1500 },
      },
      title: "Author's Blog Site",
      inclusions: [
        { tier: "basic", name: "Homepage", id: 1 },
        { tier: "basic", name: "About Page", id: 2 },
        { tier: "basic", name: "Blog Posts", id: 3 },
        { tier: "basic", name: "Contact Page", id: 4 },
        { tier: "basic", name: "Social Media Links", id: 5 },
        { tier: "premium", name: "Archives", id: 6 },
        { tier: "premium", name: "Categories", id: 7 },
        { tier: "premium", name: "Tags", id: 8 },
        { tier: "premium", name: "Search Bar", id: 9 },
        { tier: "premium", name: "Comments Section", id: 10 },
      ],
    },
    {
      id: "ATzApWSjTwhMHUAZJeyF",
      priceTier: { default: "basic", basic: { level: 0, price: 1800 } },
      title: "Social Media Management Program",
      inclusions: [
        { tier: "basic", name: "Social Media Strategy", id: 1 },
        { tier: "basic", name: "Content Creation", id: 2 },
        { tier: "basic", name: "Account Management", id: 3 },
        { tier: "basic", name: "Paid Social Advertising", id: 4 },
        { tier: "basic", name: "Influencer Marketing", id: 5 },
        { tier: "basic", name: "Analytics and Reporting", id: 6 },
        { tier: "basic", name: "Social Listening", id: 7 },
        { tier: "basic", name: "Community Management", id: 8 },
        { tier: "basic", name: "Training and Consultation", id: 9 },
      ],
    },
    {
      id: "SfGuuWrDhL3J8EwwCDm3",
      priceTier: { default: "basic", basic: { level: 0, price: 1800 } },
      title: "Author's E-commerce Website",
      inclusions: [
        { tier: "basic", name: "Product Listing", id: 1 },
        { tier: "basic", name: "Shopping Cart", id: 2 },
        { tier: "basic", name: "Payment Getaway", id: 3 },
        { tier: "basic", name: "Order Management", id: 4 },
        { tier: "basic", name: "Inventory Management", id: 5 },
        { tier: "basic", name: "Customer Database", id: 6 },
        { tier: "basic", name: "Analytics and Reporting", id: 7 },
        { tier: "basic", name: "Content Management System (CMS)", id: 8 },
        { tier: "basic", name: "Search Engine Optimization (SEO)", id: 9 },
        { tier: "basic", name: "Responsive Design", id: 10 },
        { tier: "basic", name: "Security Features", id: 11 },
        { tier: "basic", name: "Customer Support", id: 12 },
      ],
    },
    {
      id: "YbNUdzUl4wAnz7byvtAl",
      priceTier: { default: "basic", basic: { level: 0, price: 1000 } },
      title: "Book Video Creation",
      inclusions: [
        { tier: "basic", name: "Book Title and Author", id: 1 },
        { tier: "basic", name: "Book Synopsis", id: 2 },
        { tier: "basic", name: "Book Cover", id: 3 },
        { tier: "basic", name: "Book Quotes", id: 4 },
        { tier: "basic", name: "Author Background", id: 5 },
        { tier: "basic", name: "Reader Demographic", id: 6 },
        { tier: "basic", name: "Visual Aids", id: 7 },
        { tier: "basic", name: "Music and Sound Effects", id: 8 },
        { tier: "basic", name: "Call to Action", id: 9 },
        { tier: "basic", name: "Credits", id: 10 },
      ],
    },
    {
      id: "nMtlPyHS83t6RkZNKjpp",
      priceTier: { default: "basic", basic: { level: 0, price: 4000 } },
      title: "Search Engine Optimization",
      inclusions: [
        { tier: "basic", name: "Keyword Research", id: 1 },
        { tier: "basic", name: "On-page Optimization", id: 2 },
        { tier: "basic", name: "Off-page Optimization", id: 3 },
        { tier: "basic", name: "Technical SEO", id: 4 },
        { tier: "basic", name: "Content Marketing", id: 5 },
        { tier: "basic", name: "Local SEO", id: 6 },
        { tier: "basic", name: "Analytics and Reporting", id: 7 },
      ],
    },
  ];

  return {
    props: {
      services: data,
    },
  };
}
