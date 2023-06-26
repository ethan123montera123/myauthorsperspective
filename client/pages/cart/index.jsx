import Head from "next/head";
import { useState } from "react";
import { formatUsd } from "@/helpers/currency.helper";
import PaymentMethodSelector from "@/components/cart/PaymentMethodSelector";
import CardInformationForm from "@/components/cart/CardInformationForm";
import ServicesToAvail from "@/components/cart/ServicesToAvail";

export default function Cart() {
  /* payment method */
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardVerificationValue, setCardVerificationValue] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");
  const [totalPriceUsd, setTotalPriceUsd] = useState(0);
  /* services to avail */
  const [
    socialMediaManagementProgramServices,
    setSocialMediaManagementProgramServices,
  ] = useState([]);
  const [
    searchEngineOptimizationServices,
    setSearchEngineOptimizationServices,
  ] = useState([]);
  const [bookVideoCreationServices, setBookVideoCreationServices] = useState(
    []
  );
  const [authorsBlogSiteServices, setAuthorsBlogSiteServices] = useState([]);
  const [authorsEcommerceWebsiteServices, setAuthorsEcommerceWebsiteServices] =
    useState([]);

  const availedServices = {
    socialMediaManagementProgramServices,
    searchEngineOptimizationServices,
    bookVideoCreationServices,
    authorsBlogSiteServices,
    authorsEcommerceWebsiteServices,
  };

  const availedServicesSetters = {
    setSocialMediaManagementProgramServices,
    setSearchEngineOptimizationServices,
    setBookVideoCreationServices,
    setAuthorsBlogSiteServices,
    setAuthorsEcommerceWebsiteServices,
  };

  const [selectedService, setSelectedService] = useState(
    "Social Media Management Program"
  );

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
      <section className="Cart w-full px-16 grid gap-8 xl:grid-cols-2 mb-16">
        <div>
          <ServicesToAvail
            selectedService={selectedService}
            availedServices={availedServices}
            availedServicesSetters={availedServicesSetters}
            setSelectedService={setSelectedService}
          />
        </div>
        <div className="px-8">
          <h2 className="uppercase font-semibold text-xl mb-8">
            Choose a Payment Method
          </h2>
          <PaymentMethodSelector
            handleClickPaymentMethod={handleClickPaymentMethod}
            isSelectedPaymentMethod={isSelectedPaymentMethod}
          />
          <h2 className="uppercase font-semibold text-xl mb-4 mt-20">
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

          <div className="flex flex-col items-end">
            <div>
              <h2 className="tracking-wider uppercase font-semibold text-xl mb-2 mt-12 text-center">
                Total: {formatUsd(totalPriceUsd)}
              </h2>
              <button className="lg:w-[10rem] shadow hover:shadow-lg transition-shadow bg-[#04b2bd] hover:bg-[#1c7b82] text-white uppercase py-3 rounded-[2rem] font-semibold tracking-wider">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
