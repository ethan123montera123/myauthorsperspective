import { Tailwind as TailwindBase } from "@react-email/components";
import { PropsWithChildren } from "react";

/**
 * Configuration component for Tailwind base styles.
 *
 * @param props Tailwind props.
 * @returns A wrapper component for a configured Tailwind Component.
 */
function Tailwind({ children }: PropsWithChildren) {
  return (
    <TailwindBase
      config={{
        theme: {
          extend: {
            maxWidth: {
              email: "660px",
            },
            fontFamily: {
              helvetica: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            },
            fontSize: {
              xxs: "10px",
            },
            colors: {
              primary: "#000000",
              accent: "#16A5F7",
              muted: "#888888",
              offwhite: "#FAFAFA",
            },
          },
        },
      }}
    >
      {children}
    </TailwindBase>
  );
}

export default Tailwind;
