import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function Services() {
  return (
    <>
      <Head>
        <title>Social Media Management Program</title>
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: "Social Media Management Program",
            url: "/services/social-media-management-program",
          },
        ]}
      />
      <ServiceDetails
        title="Social Media Management Program"
        imgSrc="/images/services/social-media-management-program.webp"
        priceUsd={1800}
        inclusions={[
          "Social Media Strategy",
          "Content Creation",
          "Account Management",
          "Paid Social Advertising",
          "Influencer Marketing",
          "Analytics and Reporting",
          "Social Listening",
          "Community Management",
          "Training and Consultation",
        ]}
      />
      <OtherServices
        servicesData={[
          {
            url: "/services/search-engine-optimization",
            imgSrc: "/images/services/search-engine-optimization.webp",
            title: "Search Engine Optimization",
            priceUsd: 4000,
          },
          {
            url: "/services/author-blog-site",
            imgSrc: "/images/services/author-blog-site.webp",
            title: "Author's Blog Site",
            priceUsd: 700,
          },
          {
            url: "/services/social-media-management-program",
            imgSrc: "/images/services/social-media-management-program.webp",
            title: "Social Media Management Program",
            priceUsd: 1800,
          },
        ]}
      />
    </>
  );
}
