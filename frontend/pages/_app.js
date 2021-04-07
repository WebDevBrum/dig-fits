/* eslint-disable react/jsx-props-no-spreading */

import Page from "../components/Page"; // Option space command for quick import
// Minute 13:03 Creating a page layout
/* eslint-disable react/prop-types */
export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
