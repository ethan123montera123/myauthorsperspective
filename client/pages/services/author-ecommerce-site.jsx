import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function AuthorEcommerceSite() {
  return (
    <>
      <Head>
        <title>Author&apos;s E-commerce Website</title>
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: "Author's E-commerce Website",
            url: "/services/author-ecommerce-site",
          },
        ]}
      />
      <ServiceDetails
        title="Author's E-commerce Website"
        imgSrc="/images/services/author-ecommerce-site.webp"
        priceUsd={1800}
        inclusions={[
          "Product Listing",
          "Shopping Cart",
          "Payment Getaway",
          "Order Management",
          "Inventory Management",
          "Customer Database",
          "Analytics and Reporting",
          "Content Management System",
          "Search Engine Optimization",
          "Responsive Design",
          "Security Features",
          "Customer Support",
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
