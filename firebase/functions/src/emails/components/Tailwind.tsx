import { Tailwind as TailwindBase } from "@react-email/components";
import React from "react";

interface TailwindProps {
  children: React.ReactNode;
}

/**
 * Configuration component for Tailwind base styles.
 *
 * @param props Tailwind props.
 * @returns A wrapper component for a configured Tailwind Component.
 */
function Tailwind({ children }: TailwindProps) {
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
