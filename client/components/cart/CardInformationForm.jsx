import React from "react";
import propTypes from "prop-types";

export default function CardInformationForm({
  setFName,
  setLName,
  setCardNumber,
  setCardExpiryDate,
  setCardVerificationValue,
  setCardZipCode,
  fName,
  lName,
  cardNumber,
  cardExpiryDate,
  cardVerificationValue,
  cardZipCode,
}) {
  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <form className="md:px-14 grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
          type="text"
          name="fName"
          id="fName"
          value={fName}
          required
          placeholder="First Name"
          onChange={(e) => handleChange(e, setFName)}
        />
        <input
          className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
          type="text"
          name="lName"
          id="lName"
          value={lName}
          required
          placeholder="Last Name"
          onChange={(e) => handleChange(e, setLName)}
        />
      </div>
      <input
        className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
        type="text"
        name="cardNumber"
        id="cardNumber"
        value={cardNumber}
        required
        placeholder="Card Number"
        onChange={(e) => handleChange(e, setCardNumber)}
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
          type="text"
          name="cardExpiryDate"
          id="cardExpiryDate"
          value={cardExpiryDate}
          required
          placeholder="MM/YY"
          onChange={(e) => handleChange(e, setCardExpiryDate)}
        />
        <input
          className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
          type="text"
          name="cardVerificationValue"
          id="cardVerificationValue"
          value={cardVerificationValue}
          required
          placeholder="CVV"
          onChange={(e) => handleChange(e, setCardVerificationValue)}
        />
        <input
          className="text-xs md:text-lg font-medium uppercase text-center flex px-2 py-1 md:px-4 md:py-2 border-2 border-neutral-500 rounded-2xl active:border-black"
          type="text"
          name="cardZipCode"
          id="cardZipCode"
          value={cardZipCode}
          required
          placeholder="Zip Code"
          onChange={(e) => handleChange(e, setCardZipCode)}
        />
      </div>
    </form>
  );
}

CardInformationForm.propTypes = {
  setFName: propTypes.func.isRequired,
  setLName: propTypes.func.isRequired,
  setCardNumber: propTypes.func.isRequired,
  setCardExpiryDate: propTypes.func.isRequired,
  setCardVerificationValue: propTypes.func.isRequired,
  setCardZipCode: propTypes.func.isRequired,
  fName: propTypes.string.isRequired,
  lName: propTypes.string.isRequired,
  cardNumber: propTypes.string.isRequired,
  cardExpiryDate: propTypes.string.isRequired,
  cardVerificationValue: propTypes.string.isRequired,
  cardZipCode: propTypes.string.isRequired,
};
