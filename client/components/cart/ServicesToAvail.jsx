import React from "react";
import propTypes from "prop-types";
import ServiceCheckbox from "./ServiceCheckbox";
import InclusionCheckbox from "./InclusionCheckbox";
import { getInclusionsOfService } from "@/helpers/services.helper";

export default function ServicesToAvail({
  availedServices,
  availedServicesSetters,
  selectedService,
  setSelectedService,
}) {
  console.log(availedServices);
  const {
    socialMediaManagementProgramServices,
    searchEngineOptimizationServices,
    bookVideoCreationServices,
    authorsBlogSiteServices,
    authorsEcommerceWebsiteServices,
  } = availedServices;

  const {
    setSocialMediaManagementProgramServices,
    setSearchEngineOptimizationServices,
    setBookVideoCreationServices,
    setAuthorsBlogSiteServices,
    setAuthorsEcommerceWebsiteServices,
  } = availedServicesSetters;

  const handleSelectService = (_, serviceName) => {
    setSelectedService(serviceName);
  };

  const inclusionsData = [
    {
      serviceInclusions: socialMediaManagementProgramServices,
      serviceName: "Social Media Management Program",
      inclusions: getInclusionsOfService("Social Media Management Program"),
      setFn: setSocialMediaManagementProgramServices,
    },
    {
      serviceInclusions: searchEngineOptimizationServices,
      serviceName: "Search Engine Optimization",
      inclusions: getInclusionsOfService("Search Engine Optimization"),
      setFn: setSearchEngineOptimizationServices,
    },
    {
      serviceInclusions: bookVideoCreationServices,
      serviceName: "Book Video Creation",
      inclusions: getInclusionsOfService("Book Video Creation"),
      setFn: setBookVideoCreationServices,
    },
    {
      serviceInclusions: authorsBlogSiteServices,
      serviceName: "Author's Blog Site",
      inclusions: getInclusionsOfService("Author's Blog Site"),
      setFn: setAuthorsBlogSiteServices,
    },
    {
      serviceInclusions: authorsEcommerceWebsiteServices,
      serviceName: "Author's E-commerce Website",
      inclusions: getInclusionsOfService("Author's E-commerce Website"),
      setFn: setAuthorsEcommerceWebsiteServices,
    },
  ];

  const selectedServiceData = inclusionsData.find(
    (e) => e.serviceName === selectedService
  );

  const toggleCartInclusion = (setFn, prevInclusions, inclusionName) => {
    if (prevInclusions.find((i) => i === inclusionName) === undefined) {
      setFn(prevInclusions.concat(inclusionName));
    } else {
      setFn(prevInclusions.filter((i) => i !== inclusionName));
    }
  };

  return (
    <div className="bg-neutral-200 py-6 px-8 rounded-xl">
      <h2 className="text-center uppercase font-semibold text-xl mb-8">
        Services to Avail
      </h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 pb-8">
        {inclusionsData.map(({ serviceInclusions, serviceName }) => {
          const isStarred = serviceInclusions.length > 0 ? true : false;
          return (
            <ServiceCheckbox
              key={serviceName}
              serviceName={serviceName}
              selectedService={selectedService}
              isStarred={isStarred}
              handleClick={(_) => {
                handleSelectService(_, serviceName);
              }}
            />
          );
        })}
      </div>
      <h2 className="uppercase font-semibold text-xl mb-6">Inclusions:</h2>
      {selectedServiceData.inclusions.map((inclusionName) => (
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
      ))}
    </div>
  );
}

ServicesToAvail.propTypes = {
  availedServices: propTypes.object.isRequired,
  availedServicesSetters: propTypes.object.isRequired,
  selectedService: propTypes.string.isRequired,
  setSelectedService: propTypes.func.isRequired,
};
