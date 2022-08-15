import type { GetStaticProps } from "next";
import Head from "next/head";
import type { BuiltInProviderType } from "next-auth/providers";
import { type LiteralUnion, getProviders, signIn } from "next-auth/react";

import { getI18nProps, useI18nContext } from "@/i18n";

import type { Page } from "@/types";

export type SignInPageProps = {
  providers: {
    id: LiteralUnion<BuiltInProviderType, string>;
    name: string;
  }[];
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const providers = await getProviders();

  return {
    props: {
      ...(await getI18nProps(locale, ["authentication"])),
      providers: providers
        ? Object.values(providers).map(({ id, name }) => ({
            id,
            name,
          }))
        : [],
    },
  };
};

const SignInPage: Page<SignInPageProps> = ({ providers }) => {
  const { LL } = useI18nContext();

  return (
    <>
      <Head>
        <title>{LL.skniKod.name()}</title>
      </Head>
      <div>
        {providers.map(({ id, name }) => (
          <button
            key={id}
            onClick={() =>
              void signIn("github", {
                callbackUrl: "/",
              })
            }
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
};

export default SignInPage;
