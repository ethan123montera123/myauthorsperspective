import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartResult() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const paymentWasSuccessful =
    searchParams.get("redirect_status") === "succeeded" ? true : false;

  const message = paymentWasSuccessful
    ? "Your payment was successful."
    : "Your payment failed, please try again or contact the developers.";

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  if (isLoading) {
    return (
      <div className="mt-[15lvh] xl:mt-[25lvh] grid place-items-center gap-4">
        <Image
          src="/images/loading.svg"
          alt="Loading"
          width="128"
          height="128"
        />
      </div>
    );
  }

  return (
    <div className="mt-[15lvh] xl:mt-[25lvh] grid place-items-center gap-4">
      <div>{message}</div>
      <Link href="/" className="text-[#00C1EB] hover:underline">
        Back to home?
      </Link>
    </div>
  );
}
