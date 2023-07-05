import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";
import { rawServices } from "@/helpers/services.helper";

export default function BookVideoCreation() {
  const serviceName = "Book Video Creation";
  const { inclusions } = rawServices.find((e) => e.title === serviceName);

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
            name: serviceName,
            url: "/services/book-video-creation",
          },
        ]}
      />
      <ServiceDetails
        title={serviceName}
        imgSrc="/images/services/book-video-creation.webp"
        priceUsd={1800}
        inclusions={inclusions}
      />
      <OtherServices excludeUrl="/services/book-video-creation" />
    </>
  );
}
