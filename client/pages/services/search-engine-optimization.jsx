import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function SearchEngineOptimization() {
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
            name: "Search Engine Optimization",
            url: "/services/search-engine-optimization",
          },
        ]}
      />
      <ServiceDetails
        title="Search Engine Optimization"
        imgSrc="/images/services/search-engine-optimization.webp"
        priceUsd={4000}
        inclusions={[
          "Keyword Research",
          "On-page Optimization",
          "Off-page Optimization",
          "Technical SEO",
          "Content Marketing",
          "Local SEO",
          "Analytics and Reporting",
        ]}
      />
      <OtherServices excludeUrl="/services/search-engine-optimization" />
    </>
  );
}
