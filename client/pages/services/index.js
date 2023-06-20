import Head from "next/head";
import Breadcrumb from "@/components/breadcrumb";

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services</title>
      </Head>
      <Breadcrumb
        orderedPathNames={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
    </>
  );
}
