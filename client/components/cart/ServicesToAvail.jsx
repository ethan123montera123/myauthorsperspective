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
    authorsBlogSite,
    authorsEcommerceWebsite,
  } = availedServices;

  const hasInclusions = (inclusions) => (inclusions.length > 0 ? true : false);

  const handleSelectService = (_, serviceName) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="bg-neutral-200 py-6 px-8 rounded-xl">
      <h2 className="text-center uppercase font-semibold text-xl mb-8">
        Services to Avail
      </h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        <ServiceCheckbox
          isStarred={hasInclusions(socialMediaManagementProgramServices)}
          serviceName="Social Media Management Program"
          selectedService={selectedService}
          handleClick={(_) => {
            handleSelectService(_, "Social Media Management Program");
          }}
        />
        <ServiceCheckbox
          isStarred={hasInclusions(searchEngineOptimizationServices)}
          serviceName="Search Engine Optimization"
          selectedService={selectedService}
          handleClick={(_) => {
            handleSelectService(_, "Search Engine Optimization");
          }}
        />
        <ServiceCheckbox
          isStarred={hasInclusions(bookVideoCreationServices)}
          serviceName="Book Video Creation"
          selectedService={selectedService}
          handleClick={(_) => {
            handleSelectService(_, "Book Video Creation");
          }}
        />
        <ServiceCheckbox
          isStarred={hasInclusions(authorsBlogSite)}
          serviceName="Author's Blog Site"
          selectedService={selectedService}
          handleClick={(_) => {
            handleSelectService(_, "Author's Blog Site");
          }}
        />
        <ServiceCheckbox
          isStarred={hasInclusions(authorsEcommerceWebsite)}
          serviceName="Author's E-commerce Website"
          selectedService={selectedService}
          handleClick={(_) => {
            handleSelectService(_, "Author's E-commerce Website");
          }}
        />
      </div>
    </div>
  );
}

ServicesToAvail.propTypes = {
  availedServices: propTypes.shape({
    socialMediaManagementProgramServices: propTypes.arrayOf(propTypes.string),
    searchEngineOptimizationServices: propTypes.arrayOf(propTypes.string),
    bookVideoCreationServices: propTypes.arrayOf(propTypes.string),
    authorsBlogSite: propTypes.arrayOf(propTypes.string),
    authorsEcommerceWebsite: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  selectedService: propTypes.string.isRequired,
  setSelectedService: propTypes.func.isRequired,
};
