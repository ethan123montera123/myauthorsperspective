import { Column, Text } from "@react-email/components";
import Tailwind from "./Tailwind";

interface ReceiptInfoProps {
  label: string;
  value: string;
  isAccented?: boolean;
}

function ReceiptInfo({
  label = "",
  value = "",
  isAccented = false,
}: ReceiptInfoProps) {
  return (
    <Tailwind>
      <Column className="w-1/2 pl-5 border-r border-b border-white h-11">
        <Text className="m-0 p-0 text-muted leading-snug text-xxs uppercase">
          {label}
        </Text>
        <Text
          className={`m-0 p-0 leading-snug text-xs ${
            isAccented ? "text-accent underline" : ""
          }`}
        >
          {value}
        </Text>
      </Column>
    </Tailwind>
  );
}

export default ReceiptInfo;
