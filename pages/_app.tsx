import "../styles/globals.css";
import "normalize.css/normalize.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { ContextProvider } from "../context/context";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
