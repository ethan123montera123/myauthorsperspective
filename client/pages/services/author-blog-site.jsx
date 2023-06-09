import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import OtherServices from "@/components/services/OtherServices";
import ServiceDetails from "@/components/services/ServiceDetails";
import { rawServices, getRandomServices } from "@/helpers/services.helper";

export default function AuthorBlogSite({ otherServices }) {
  const serviceName = "Author's Blog Site";
  const { inclusions, id } = rawServices.find((e) => e.title === serviceName);

  return (
    <>
      <Head>
        <title>Author&apos;s Blog Site</title>
        <meta
          name="description"
          content="Monetize your thoughts with your own Blog Site with best Search Engine Optimization (SEO) practices."
        />
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          {
            name: serviceName,
            url: "/services/author-blog-site",
          },
        ]}
      />
      <ServiceDetails
        title={serviceName}
        imgSrc="/images/services/author-blog-site.webp"
        priceUsd={1500}
        serviceId={id}
        inclusions={inclusions}
      />
      <OtherServices servicesData={otherServices} />
    </>
  );
}

export async function getStaticProps() {
  const excludeUrl = "/services/author-blog-site";
  const otherServices = getRandomServices(3, { excludeUrl });

  return {
    props: {
      otherServices,
    },
  };
}
