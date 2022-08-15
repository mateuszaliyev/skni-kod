import type { ReactNode } from "react";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { env } from "@/environment/client.mjs";

import { type Locale, type Translations, I18nProvider } from "@/i18n";

import type { Component } from "@/types";

export type ApplicationProviderProps = {
  children: ReactNode;
  i18n?: Record<Locale, Translations>;
  locale?: string;
  session: Session;
};

export const ApplicationProvider: Component<ApplicationProviderProps> = ({
  children,
  i18n,
  locale,
  session,
}) => (
  <SessionProvider
    basePath={`${env.NEXT_PUBLIC_BASE_URL}/api/authentication`}
    session={session}
  >
    <I18nProvider i18n={i18n} locale={locale as Locale}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </I18nProvider>
  </SessionProvider>
);
