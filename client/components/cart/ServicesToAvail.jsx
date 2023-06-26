import React from "react";
import propTypes from "prop-types";
import ServiceCheckbox from "./ServiceCheckbox";

export default function ServicesToAvail({
  availedServices,
  selectedService,
  setSelectedService,
}) {
  const {
    socialMediaManagementProgramServices,
    searchEngineOptimizationServices,
    bookVideoCreationServices,
    authorsBlogSiteServices,
    authorsEcommerceWebsiteServices,
  } = availedServices;

  const hasInclusions = (inclusions) => (inclusions.length > 0 ? true : false);

  const handleSelectService = (_, serviceName) => {
    setSelectedService(serviceName);
  };

  const inclusionsData = [
    {
      serviceInclusions: socialMediaManagementProgramServices,
      serviceName: "Social Media Management Program",
    },
    {
      serviceInclusions: searchEngineOptimizationServices,
      serviceName: "Search Engine Optimization",
    },
    {
      serviceInclusions: bookVideoCreationServices,
      serviceName: "Book Video Creation",
    },
    {
      serviceInclusions: authorsBlogSiteServices,
      serviceName: "Author's Blog Site",
    },
    {
      serviceInclusions: authorsEcommerceWebsiteServices,
      serviceName: "Author's E-commerce Website",
    },
  ];

  return (
    <div className="bg-neutral-200 py-6 px-8 rounded-xl">
      <h2 className="text-center uppercase font-semibold text-xl mb-8">
        Services to Avail
      </h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {inclusionsData.map(({ serviceInclusions, serviceName }) => (
          <ServiceCheckbox
            key={serviceName}
            serviceName={serviceName}
            selectedService={selectedService}
            isStarred={hasInclusions(serviceInclusions)}
            handleClick={(_) => {
              handleSelectService(_, serviceName);
            }}
          />
        ))}
      </div>
    </div>
  );
}

ServicesToAvail.propTypes = {
  availedServices: propTypes.shape({
    socialMediaManagementProgramServices: propTypes.arrayOf(propTypes.string),
    searchEngineOptimizationServices: propTypes.arrayOf(propTypes.string),
    bookVideoCreationServices: propTypes.arrayOf(propTypes.string),
    authorsBlogSiteServices: propTypes.arrayOf(propTypes.string),
    authorsEcommerceWebsiteServices: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  selectedService: propTypes.string.isRequired,
  setSelectedService: propTypes.func.isRequired,
};
