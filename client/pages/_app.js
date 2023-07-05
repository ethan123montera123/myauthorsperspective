import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LayoutGeneral from "@/components/ui/LayoutGeneral";
import LayoutWhiteHeader from "@/components/ui/LayoutWhiteHeader";
import { useAppCheck } from "@/services/firebase";

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
  useAppCheck(); // Initializes App Check for protecting Firebase Resources

  const path = router.pathname;

  if (pageUsesWhiteHeader(path)) {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutWhiteHeader>
          <Component {...pageProps} />
        </LayoutWhiteHeader>
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutGeneral>
          <Component {...pageProps} />
        </LayoutGeneral>
        <ToastContainer />
      </div>
    );
  }
}
