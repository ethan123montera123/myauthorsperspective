import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function AuthorEcommerceSite() {
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
      <OtherServices excludeUrl="/services/author-ecommerce-site" />
    </>
  );
}
