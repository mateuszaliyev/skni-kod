import type { GetStaticProps } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { getI18nProps, useI18nContext } from "@/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await getI18nProps(locale)),
  },
});

const SignInPage = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <Head>
        <title>{LL.skniKod.name()}</title>
      </Head>
      <div>
        <button
          onClick={() =>
            void signIn("github", {
              callbackUrl: "/",
            })
          }
        >
          GitHub
        </button>
      </div>
    </>
  );
};

export default SignInPage;
