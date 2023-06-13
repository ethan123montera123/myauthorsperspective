import "@/styles/globals.css";
import LayoutServices from "@/components/layout-services";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;

  if (path.startsWith("/services")) {
    return (
      <div className={`flex flex-col h-full ${inter.className}`}>
        <LayoutServices font={inter.className}>
          <Component {...pageProps} />
        </LayoutServices>
      </div>
    );
  } else {
    return (
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    );
  }
}

