import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CartResult() {
  const searchParams = useSearchParams();

  const paymentWasSuccessful =
    searchParams.get("redirect_status") === "succeeded" ? true : false;

  const message = paymentWasSuccessful
    ? "Your payment was successful."
    : "Your payment failed, please try again or contact the developers.";

  return (
    <div className="mt-[15lvh] xl:mt-[25lvh] grid place-items-center gap-4">
      <div>{message}</div>
      <Link href="/" className="text-[#00C1EB] hover:underline">
        Back to home?
      </Link>
    </div>
  );
}
