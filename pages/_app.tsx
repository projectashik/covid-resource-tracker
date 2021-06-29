import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const url = process.env.DB_URL;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
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
