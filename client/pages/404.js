import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mt-[15lvh] xl:mt-[25lvh] grid place-items-center gap-4">
      <div>Error 404: Page Not Found</div>
      <Link href="/" className="text-[#00C1EB] hover:underline">
        Back to home?
      </Link>
    </div>
  );
}
