import "@/styles/globals.css";
import LayoutServices from "@/components/layout-services";

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;

  if (path.startsWith("/services")) {
    return (
      <LayoutServices>
        <Component {...pageProps} />
      </LayoutServices>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

