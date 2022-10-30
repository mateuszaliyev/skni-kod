import { ApplicationProvider } from "@/providers/application";

import { trpc } from "@/trpc";

import type { Application } from "@/types";

import "@/styles/globals.css";

const Application: Application = ({
  Component,
  pageProps: { i18n, session, ...pageProps },
  router,
}) => (
  <ApplicationProvider i18n={i18n} locale={router.locale} session={session}>
    <Component {...pageProps} />
  </ApplicationProvider>
);

export default trpc.withTRPC(Application);
