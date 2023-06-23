import Head from "next/head";
import BackgroundImage from "@/components/ui/BackgroundImage";
import { Move, MoveDown } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Our Services</title>
      </Head>
      <BackgroundImage
        src="/images/home/background.jpg"
        height="1922"
        width="2560"
        className="brightness-100"
        fixed={false}
      />
      <section className="mb-24 xl:mb-[300px]">
        <h1 className="mt-10 lg:mt-20 text-center xl:text-left text-3xl md:text-5xl lg:text-6xl xl:text-8xl uppercase tracking-wider font-bold text-white text-stroke-3 drop-shadow-lg">
          <div className="mb-5">Author&apos;s</div>
          <div className="mb-5">Perspective</div>
          <div className="mb-5">Literary Agency</div>
        </h1>
      </section>
      <section className="bg-white flex justify-center md:text-left relative w-[100lvw] lg:w-[calc(100lvw-1.03rem)] -left-2 lg:-left-32 py-8 px-4 md:p-8 lg:px-32 lg:py-16">
        <h1 className="uppercase font-bold text-3xl md:text-5xl lg:text-6xl xl:text-8xl">
          Services
        </h1>
      </section>
      <section className="bg-black justify-center md:text-left relative w-[100lvw] lg:w-[calc(100lvw-1.03rem)] -left-2 lg:-left-32 py-16 px-4 md:px-16 lg:px-32 lg:py-32">
        <h2 className="text-center text-white uppercase font-bold text-lg md:text-2xl lg:text-4xl xl:text-5xl">
          Why Author&apos;s Perspective?
        </h2>
        <div className="text-[#00C1EB] text-center text-4xl py-4 lg:text-6xl -translate-y-1">
          &lowast;
        </div>
        <p className="text-white text-center text-sm lg:text-2xl px-5 lg:px-32 uppercase tracking-wide leading-loose">
          Author&apos;s perspective provide full scale digital marketing and
          advertising services. We help our clients succeed through creative and
          effective stratigies.
        </p>
      </section>
    </>
  );
}

