import React from "react";
import ServiceCheckbox from "./ServiceCheckbox";
import InclusionCheckbox from "./InclusionCheckbox";

export default function ServicesToAvail({
  services,
  selectedService,
  selectService,
  addServiceAndInclusionToCart,
  disabled,
}) {
  const selectedServiceData = services.find((e) => e.title === selectedService);

  return (
    <div className="bg-neutral-200 py-6 px-4 md:px-8 rounded-xl">
      <h2 className="text-center uppercase font-semibold text-lg md:text-xl mb-4 md:mb-8">
        Services to Avail
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 pb-8">
        {services.map((service) => {
          return (
            <ServiceCheckbox
              key={service.id}
              serviceId={service.id}
              serviceTitle={service.title}
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
      {selectedServiceData.inclusions.map((inclusion) => (
        <InclusionCheckbox
          disabled={disabled}
          key={inclusion.name}
          serviceId={selectedServiceData.id}
          inclusionName={inclusion.name}
          inclusionId={inclusion.id}
          handleClick={() => {
            addServiceAndInclusionToCart(selectedServiceData.id, inclusion.id);
          }}
        />
      ))}
    </div>
  );
}
