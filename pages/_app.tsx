import "../styles/globals.css";
import * as React from "react";

import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import ThemeConfig from "../theme";
import createEmotionCache from "../components/createEmotionCache";
import { Provider } from "react-redux";
import store from "global/index";
import { Toaster } from "react-hot-toast";

// import checkDay from "utils/checkDay";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  // checkDay();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="block-all-mixed-content"
          />
        </Head>

        <ThemeConfig>
          <Toaster />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Component {...pageProps} />
        </ThemeConfig>
      </CacheProvider>
    </Provider>
  );
}
