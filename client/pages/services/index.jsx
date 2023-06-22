import Head from "next/head";
import BackgroundImage from "@/components/ui/BackgroundImage";
import SectionService from "@/components/services/SectionService";

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services</title>
      </Head>
      <BackgroundImage
        src="/images/services/g.jpg"
        height="3000"
        width="2000"
        className="brightness-100"
        fixed={false}
      />
      <section className="mb-[300px]">
        <h1 className="mt-10 lg:mt-20 text-center lg:text-left text-3xl md:text-5xl lg:text-7xl uppercase tracking-wider font-bold text-white text-stroke-3">
          <div className="mb-5">Author&apos;s</div>
          <div className="mb-5">Perspective</div>
          <div className="mb-5">Literary Agency</div>
        </h1>
      </section>
      <SectionService
        position={1}
        title="Social Media Management Program"
        url="/services/social-media-management-program"
        imgSrc="/images/services/social-media-management-program.webp"
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
      <SectionService
        position={2}
        title="Social Media Management Program"
        url="/services/social-media-management-program"
        imgSrc="/images/services/social-media-management-program.webp"
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
    </>
  );
}
