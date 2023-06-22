import Head from "next/head";
import BackgroundImage from "@/components/ui/BackgroundImage";

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
      <h1 className="text-4xl">
        Author&apos;s
        <br />
        Perspective
        <br />
        Literary Agency
      </h1>
    </>
  );
}
