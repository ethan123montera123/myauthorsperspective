import Head from "next/head";

import BackgroundImage from "@/components/ui/BackgroundImage";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className="About flex flex-col items-center">
        <BackgroundImage
          src="/images/about/background.jpg"
          height="3000"
          width="2000"
          className="brightness-[0.8]"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 items-center w-full text-center md:text-left">
          <div className="lg:col-span-3">
            <h1 className="uppercase leading-10 tracking-wide text-white text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold drop-shadow-2xl">
              <div className="mb-5">Literary</div>
              <div className="mb-5">Marketing</div>
              <div className="mb-5">Agency</div>
            </h1>
            <div className="text-white mt-4 text-sm md:text-xl">
              <div className="uppercase">More Information</div>
              <div className="lowercase">info@apliteraryagency.com</div>
              <div className="uppercase">+1 (201) 208 - 2048</div>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-center">
            <Image
              src="/images/logo.png"
              width="500"
              height="500"
              alt="My Author's Perspective"
              className="lg:w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
