/* eslint-disable react/jsx-props-no-spreading */
import NProgress from "nprogress";
import Router from "next/router";
import Page from "../components/Page"; // Option space command for quick import
// Minute 13:03 Creating a page layout
/* eslint-disable react/prop-types */

// TODO Swap with our own
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
