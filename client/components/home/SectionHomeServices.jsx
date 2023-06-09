import CardHoverService from "./CardHoverService";
import { services } from "@/helpers/services.helper";

export default function SectionHomeServices() {
  const authorsBlogSiteService = services[4];

  return (
    <section className="bg-white flex flex-col items-center md:text-left py-8 px-4 md:p-8 lg:px-32 lg:py-12">
      <h1 className="uppercase font-bold text-3xl md:text-5xl lg:text-6xl xl:text-8xl">
        Services
      </h1>
      <div className="mt-8 xl:mt-16 px-4 w-full grid grid-cols-1 xl:grid-cols-4 gap-6">
        {services.slice(0, 4).map((s) => (
          <CardHoverService
            title={s.title}
            url={s.url}
            imgSrc={s.imgSrc}
            priceUsd={s.priceUsd}
            key={s.title}
          />
        ))}
        {
          <CardHoverService
            className="col-span-1 xl:col-span-4"
            title={authorsBlogSiteService.title}
            url={authorsBlogSiteService.url}
            imgSrc={authorsBlogSiteService.imgSrc}
            priceUsd={authorsBlogSiteService.priceUsd}
            key={authorsBlogSiteService.title}
          />
        }
      </div>
    </section>
  );
}
