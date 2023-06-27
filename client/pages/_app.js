import "@/styles/globals.css";
import LayoutWhiteHeader from "@/components/ui/LayoutWhiteHeader";
import LayoutGeneral from "@/components/ui/LayoutGeneral";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function pageUsesWhiteHeader(urlPath) {
  if (typeof urlPath !== "string") {
    return false; // If `urlPath` is not a string, return false
  }

  // matches `/services/*` or `/cart`
  return /^\/services\/.*/.test(urlPath) || /^\/cart/.test(urlPath);
}

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;

  if (pageUsesWhiteHeader(path)) {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutWhiteHeader>
          <Component {...pageProps} />
        </LayoutWhiteHeader>
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

