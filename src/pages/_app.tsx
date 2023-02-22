import { Provider as BalancerProvider } from "react-wrap-balancer";

import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "@/api";

import { Fonts } from "@/components/fonts";

import "@/styles/globals.scss";
import "@/styles/katex.css";

const Application: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <BalancerProvider>
        <Fonts />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </BalancerProvider>
    </ThemeProvider>
  </SessionProvider>
);

export default api.withTRPC(Application);
