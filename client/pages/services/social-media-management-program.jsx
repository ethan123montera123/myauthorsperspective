import Head from "next/head";
import Breadcrumb from "@/components/ui/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";

export default function SocialMediaManagementProgram() {
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
      <OtherServices excludeUrl="/services/social-media-management-program" />
    </>
  );
}
