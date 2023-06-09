import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";
import { rawServices, getRandomServices } from "@/helpers/services.helper";

export default function AuthorEcommerceSite({ otherServices }) {
  const serviceName = "Author's E-commerce Website";
  const { inclusions, id } = rawServices.find((e) => e.title === serviceName);

  return (
    <>
      <Head>
        <title>Author&apos;s E-commerce Website</title>
        <meta
          name="description"
          content="Sell your works & generate passive income with your own e-commerce website!"
        />
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: serviceName,
            url: "/services/author-ecommerce-site",
          },
        ]}
      />
      <ServiceDetails
        title={serviceName}
        imgSrc="/images/services/author-ecommerce-site.webp"
        priceUsd={1800}
        serviceId={id}
        inclusions={inclusions}
      />
      <OtherServices servicesData={otherServices} />
    </>
  );
}

export async function getStaticProps() {
  const excludeUrl = "/services/author-ecommerce-site";
  const otherServices = getRandomServices(3, { excludeUrl });

  return {
    props: {
      otherServices,
    },
  };
}
