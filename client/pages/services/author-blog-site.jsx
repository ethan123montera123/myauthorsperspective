import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function AuthorEcommerceSite() {
  return (
    <>
      <Head>
        <title>Author&apos;s Blog Site</title>
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: "Author's Blog Site",
            url: "/services/author-blog-site",
          },
        ]}
      />
      <ServiceDetails
        title="Author's Blog Site"
        imgSrc="/images/services/author-blog-site.webp"
        priceUsd={1800}
        inclusions={[
          "Homepage",
          "About Page",
          "Blog Posts",
          "Archives",
          "Categories",
          "Tags",
          "Search Bar",
          "Contact Page",
          "Social Media Links",
          "Comments Section",
        ]}
      />
      <OtherServices excludeUrl="/services/author-blog-site" />
    </>
  );
}
