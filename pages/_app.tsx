import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig, allChains } from "wagmi";
import { Lexend } from "next/font/google";
import "./i18n";
import React, { useEffect, Suspense } from "react";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  bsc,
  bscTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import i18next from "./i18n";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Lexend({ subsets: ["latin"] });

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    bsc,
    bscTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
// console.log(123123,wagmiConfig,chains);

function MyApp({ Component, pageProps }: AppProps) {
  const handleSetLanguage = () => {
    const userLang = navigator.language; // get system language
    const locale = localStorage.getItem("locale");
    const mappingLanguage: any = {
      zh: "cn",
      "zh-CN": "cn",
      ko: "kr",
      "ko-KR": "kr",
      ja: "jp",
      "ja-JP": "jp",
      de: "de",
      "de-DE": "de",
      ru: "ru",
      "ru-RU": "ru",
      vi: "vi",
      "vi-VN": "vi",
      hi: "in",
      "hi-IN": "in",
    };
    const language = mappingLanguage[userLang];
    if (language && !locale) {
      localStorage.setItem("locale", language);
      i18next.changeLanguage(language);
    }
  };
  useEffect(() => {
    handleSetLanguage();
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={midnightTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
