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
            imgSrc={service.imgSrc}
            title={service.title}
            priceUsd={service.priceUsd}
            key={service.title}
          />
        ))}
      </div>
    </div>
  );
}
