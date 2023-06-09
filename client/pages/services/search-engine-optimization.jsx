import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";
import { rawServices, getRandomServices } from "@/helpers/services.helper";

export default function SearchEngineOptimization({ otherServices }) {
  const serviceName = "Search Engine Optimization";
  const { inclusions, id } = rawServices.find((e) => e.title === serviceName);

  return (
    <>
      <Head>
        <title>Search Engine Optimization</title>
        <meta
          name="description"
          content="Grow your business organically with My Author's Perspective's Search Engine Optimization service."
        />
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: serviceName,
            url: "/services/search-engine-optimization",
          },
        ]}
      />
      <ServiceDetails
        title={serviceName}
        imgSrc="/images/services/search-engine-optimization.webp"
        priceUsd={4000}
        serviceId={id}
        inclusions={inclusions}
      />
      <OtherServices servicesData={otherServices} />
    </>
  );
}

export async function getStaticProps() {
  const excludeUrl = "/services/search-engine-optimization";
  const otherServices = getRandomServices(3, { excludeUrl });

  return {
    props: {
      otherServices,
    },
  };
}
