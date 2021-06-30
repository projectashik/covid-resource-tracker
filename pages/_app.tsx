import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Toaster reverseOrder={false}></Toaster>
      <Layout>
        <NextNProgress color="#EF4444" />
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
export default MyApp;
