import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";
import { rawServices, getRandomServices } from "@/helpers/services.helper";

export default function SocialMediaManagementProgram({ otherServices }) {
  const serviceName = "Social Media Management Program";
  const { inclusions, id } = rawServices.find((e) => e.title === serviceName);

  return (
    <>
      <Head>
        <title>Social Media Management Program</title>
        <meta
          name="description"
          content="Focus on what is important and let My Author's Perspective handle your Social Media Management needs."
        />
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: serviceName,
            url: "/services/social-media-management-program",
          },
        ]}
      />
      <ServiceDetails
        title={serviceName}
        imgSrc="/images/services/social-media-management-program.webp"
        priceUsd={1800}
        serviceId={id}
        inclusions={inclusions}
      />
      <OtherServices servicesData={otherServices} />
    </>
  );
}

export async function getStaticProps() {
  const excludeUrl = "/services/social-media-management-program";
  const otherServices = getRandomServices(3, { excludeUrl });

  return {
    props: {
      otherServices,
    },
  };
}
