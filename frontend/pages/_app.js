/* eslint-disable react/jsx-props-no-spreading */
import NProgress from "nprogress";
import Router from "next/router";
import Page from "../components/Page"; // Option space command for quick import
// Minute 13:03 Creating a page layout
/* eslint-disable react/prop-types */

// TODO Swap with our own
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// this a next.js method along with next.js ctx - sd
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  console.log(pageProps);
  return { pageProps };
};

export default withData(MyApp);
