import propTypes from "prop-types";
import CardService from "./CardService";

export default function OtherServices({ servicesData }) {
  return (
    <div className="OtherServices">
      <hr className="bg-neutral-300 h-[0.1rem] my-4" />
      <h2 className="uppercase font-light text-xl mb-4">Other Services</h2>
      <div className="grid lg:grid-cols-3 gap-8 grid-cols-1">
        {servicesData.map((service) => (
          <CardService
            url={service.url}
            imgUrl={service.imgUrl}
            title={service.title}
            priceUsd={service.priceUsd}
            key={service.title}
          />
        ))}
      </div>
    </div>
  );
}

OtherServices.propTypes = {
  servicesData: propTypes.arrayOf(
    propTypes.shape({
      url: propTypes.string.isRequired,
      imgUrl: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      priceUsd: propTypes.number.isRequired,
    })
  ).isRequired,
};
