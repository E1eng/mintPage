import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Scroll } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


const sdk = new ThirdwebSDK(Scroll, {
  clientId: "2225b6075401150d51b255db3ed60b81",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={Scroll}>
      
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      
    </ThirdwebProvider>
  );
}



export default MyApp;