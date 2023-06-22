import "@/styles/globals.css";
import LayoutServices from "@/components/services/LayoutServices";
import LayoutGeneral from "@/components/ui/LayoutGeneral";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function isServicesUrl(urlPath) {
  if (typeof urlPath !== "string") {
    return false; // If `urlPath` is not a string, return false
  }

  return /^\/services\/.*/.test(urlPath);
}

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;

  if (isServicesUrl(path)) {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutServices>
          <Component {...pageProps} />
        </LayoutServices>
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutGeneral>
          <Component {...pageProps} />
        </LayoutGeneral>
      </div>
    );
  }
}

