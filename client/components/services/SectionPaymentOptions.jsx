import { Wallet } from "lucide-react";
import Image from "next/image";

export default function SectionPaymentOptions() {
  return (
    <section
      className={`bg-[#C5C900] text-center md:text-left relative -left-2 lg:-left-32 w-[100lvw] lg:w-[calc(100lvw-1.03rem)] py-8 px-4 md:p-16 lg:px-32 lg:py-16`}
    >
      <h3 className="uppercase flex gap-2 mb-8 items-center justify-center font-bold text-lg">
        <Wallet color="black" size={48} />
        Payment Options
      </h3>
      <div className="grid justify-items-center justify-center grid-cols-1 gap-8">
        <Image
          src="/images/services/mastercard_logo.png"
          width={1280}
          height={768}
          alt="Mastercard"
          className="w-[60%]"
        />
        <Image
          src="/images/services/american-express_logo.png"
          width={3000}
          height={1884}
          alt="American Express"
          className="w-[60%]"
        />
        <Image
          src="/images/services/paypal_logo.png"
          width={2560}
          height={678}
          alt="Paypal"
          className="w-[60%]"
        />
        <Image
          src="/images/services/visa_logo.png"
          width={3840}
          height={2160}
          alt="Visa"
          className="w-[60%]"
        />
      </div>
    </section>
  );
}
