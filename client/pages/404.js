import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="Page not found, please go back to the Home page to continue browsing."
        />
      </Head>
      <div className="mt-[15lvh] xl:mt-[25lvh] grid place-items-center gap-4">
        <div>Error 404: Page Not Found</div>
        <Link href="/" className="text-[#00C1EB] hover:underline">
          Back to home?
        </Link>
      </div>
    </>
  );
}
