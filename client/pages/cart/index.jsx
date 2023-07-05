import dynamic from "next/dynamic";
import { rawServices } from "@/helpers/services.helper";

const DynamicCart = dynamic(() => import("@/components/cart/CartIndex"), {
  ssr: false,
});

export default function Cart({ services }) {
  return <DynamicCart services={services} />;
}

export async function getStaticProps() {
  // commented out due to FirebaseError bug
  // const { data, error } = await getServices();
  const data = rawServices;
  return {
    props: {
      services: data,
    },
  };
}
