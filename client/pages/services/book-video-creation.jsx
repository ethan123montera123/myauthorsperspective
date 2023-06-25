import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function BookVideoCreation() {
  return (
    <>
      <Head>
        <title>Book Video Creation</title>
        <meta
          name="description"
          content="Let My Author's Perspective handle your book marketing needs with our Book Video Creation."
        />
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
      <OtherServices excludeUrl="/services/book-video-creation" />
    </>
  );
}
