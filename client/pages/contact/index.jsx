import Head from "next/head";
import Image from "next/image";

import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="Contact flex flex-col items-center">
        <Image
          src="/images/contact/background.jpg"
          alt="Background"
          height="3000"
          width="2000"
          className="fixed top-0 left-0 -z-10 h-full object-cover brightness-150"
        />
        <h1 className="flex flex-col items-center">
          <div className="text-5xl font-bold h-14">
            We&apos;d love to hear from you! ✒️
          </div>
        </h1>
        <ContactForm />
      </div>
    </>
  );
}
