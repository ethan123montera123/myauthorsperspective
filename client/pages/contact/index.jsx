import Head from "next/head";
import Image from "next/image";

import ContactForm from "@/components/contact/ContactForm";
import BackgroundImage from "@/components/ui/BackgroundImage";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="Contact flex flex-col items-center">
        <BackgroundImage
          src="/images/contact/background.jpg"
          height="3000"
          width="2000"
        />
        <h1 className="flex flex-col items-center px-6 md:px-20">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold">
            We&apos;d love to hear from you! ✒️
          </div>
        </h1>
        <ContactForm />
      </div>
    </>
  );
}
