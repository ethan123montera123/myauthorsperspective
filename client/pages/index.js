import Head from "next/head";
import BackgroundImage from "@/components/ui/BackgroundImage";
import SectionHomeServices from "@/components/home/SectionHomeServices";
import SectionHomeWhy from "@/components/home/SectionHomeWhy";

export default function Home() {
  return (
    <>
      <Head>
        <title>Our Services</title>
        <meta
          name="description"
          content="My Author's Perspective offers services for content writers and business owners alike. Increase your marketability with us!"
        />
      </Head>
      <BackgroundImage
        src="/images/home/background.jpg"
        height="1922"
        width="2560"
        className="brightness-100"
        fixed={false}
      />
      <section className="mb-24 xl:mb-[300px]">
        <h1 className="px-0 md:px-32 mt-10 lg:mt-20 text-center xl:text-left text-3xl md:text-5xl lg:text-6xl xl:text-8xl uppercase tracking-wider font-bold text-white text-stroke-3 drop-shadow-lg">
          <div className="mb-5">Author&apos;s</div>
          <div className="mb-5">Perspective</div>
          <div className="mb-5">Literary Agency</div>
        </h1>
      </section>
      <SectionHomeServices />
      <SectionHomeWhy />
    </>
  );
}

