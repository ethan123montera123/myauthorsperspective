import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function BookVideoCreation() {
  return (
    <>
      <Head>
        <title>Book Video Creation</title>
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: "Book Video Creation",
            url: "/services/book-video-creation",
          },
        ]}
      />
      <ServiceDetails
        title="Book Video Creation"
        imgSrc="/images/services/book-video-creation.webp"
        priceUsd={1000}
        inclusions={[
          "Book Title and Author",
          "Book Synopsis",
          "Book Cover",
          "Book Quotes",
          "Author Background",
          "Reader Demographic",
          "Visual Aids",
          "Music and Sound Effects",
          "Call to Action",
          "Credits",
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
