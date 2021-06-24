import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextNProgress color="#EF4444" />
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
