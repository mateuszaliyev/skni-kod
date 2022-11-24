import type { ReactNode } from "react";
import { SSRProvider } from "react-aria";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { BASE_URL } from "@/environment";

import { type Locale, type Translations, I18nProvider } from "@/i18n";

export type ApplicationProviderProps = {
  children: ReactNode;
  i18n?: Record<Locale, Translations>;
  locale?: string;
  session: Session;
};

export const ApplicationProvider = ({
  children,
  i18n,
  locale,
  session,
}: ApplicationProviderProps) => (
  <SessionProvider
    basePath={`${BASE_URL}/api/authentication`}
    session={session}
  >
    <SSRProvider>
      <I18nProvider i18n={i18n} locale={locale as Locale}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </I18nProvider>
    </SSRProvider>
  </SessionProvider>
);
