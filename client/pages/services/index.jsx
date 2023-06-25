import Head from "next/head";
import BackgroundImage from "@/components/ui/BackgroundImage";
import SectionService from "@/components/services/SectionService";
import SectionPaymentOptions from "@/components/services/SectionPaymentOptions";

import serviceHelper from "@/helpers/services.helper";
const { services } = serviceHelper;

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services</title>
        <meta
          name="description"
          content="Avail Author's Perspective services like Social Media Management, Book Video Creation, Author's E-commerce Website, Search Engine Optimization, Author's Blog Site, and checkout with your favorite method of payment!."
        />
      </Head>
      <BackgroundImage
        src="/images/services/background.jpg"
        height="3000"
        width="2000"
        className="brightness-100"
        fixed={false}
      />
      <section className="mb-24 xl:mb-[300px]">
        <h1 className="px-0 md:px-32 mt-10 lg:mt-20 text-center xl:text-left text-3xl md:text-5xl lg:text-7xl uppercase tracking-wider font-bold text-white text-stroke-3 drop-shadow-lg">
          <div className="mb-5">Author&apos;s</div>
          <div className="mb-5">Perspective</div>
          <div className="mb-5">Literary Agency</div>
        </h1>
      </section>
      {services.map((s, ind) => (
        <SectionService
          key={s.url}
          position={ind + 1}
          title={s.title}
          url={s.url}
          imgSrc={s.imgSrc}
          inclusions={s.inclusions}
        />
      ))}
      <SectionPaymentOptions />
    </>
  );
}
