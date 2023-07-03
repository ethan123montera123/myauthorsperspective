import React from "react";
import ServiceCheckbox from "./ServiceCheckbox";
import InclusionCheckbox from "./InclusionCheckbox";
import { useContext } from "react";
import CartContext from "./CartContextWrapper";

export default function ServicesToAvail({
  services,
  selectedService,
  selectService,
}) {
  const cart = useContext(CartContext);
  console.log(services);

  return (
    <div className="bg-neutral-200 py-6 px-4 md:px-8 rounded-xl">
      <h2 className="text-center uppercase font-semibold text-lg md:text-xl mb-4 md:mb-8">
        Services to Avail
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 pb-8">
        {services.map((service) => {
          const isStarred =
            cart.find((cartItem) => cartItem.title === service.title) !==
            undefined;
          return (
            <ServiceCheckbox
              key={service.id}
              serviceTitle={service.title}
              isStarred={isStarred}
              selectedService={selectedService}
              handleClick={() => {
                selectService(service.title);
              }}
            />
          );
        })}
      </div>
      <h2 className="uppercase font-semibold text-lg md:text-xl mb-4 md:mb-6">
        Inclusions:
      </h2>
      {/* {selectedServiceData.inclusions.map((inclusionName) => (
        <InclusionCheckbox
          key={inclusionName}
          inclusionName={inclusionName}
          serviceInclusions={selectedServiceData.serviceInclusions}
          handleClick={(_) => {
            toggleCartInclusion(
              selectedServiceData.setFn,
              selectedServiceData.serviceInclusions,
              inclusionName
            );
          }}
        />
      ))} */}
    </div>
  );
}
