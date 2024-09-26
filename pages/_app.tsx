import { RootContextProvider } from "@/context";
import { Layout } from "@/components/layout";
import AlertContainer from "@/components/alert/alert-container";
import { Manrope } from "next/font/google";
import "@aragon/ods/index.css";
import "@/pages/globals.css";
import { PUB_APP_NAME } from "@/constants";
import Head from "next/head";

const manrope = Manrope({
  subsets: ["latin"],
});

export default function AragonetteApp({ Component, pageProps }: any) {
  // const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <div className={manrope.className}>
      <div className="sticky top-0 z-40 flex h-[50px] w-full items-center justify-center bg-[#ff0083]">
        <p>
          This is a <b className="font-[900]">BETA</b> version. Features and performance are subject to change and may
          contain bugs.
        </p>
      </div>
      <Head>
        <title>{PUB_APP_NAME}</title>
      </Head>
      <RootContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <AlertContainer />
      </RootContextProvider>
    </div>
  );
}
