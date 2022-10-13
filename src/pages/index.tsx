import type { GetStaticProps } from "next";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";

import { Link } from "@/components/link";

import { getI18nProps, useI18nContext } from "@/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getI18nProps(locale, ["authentication"])),
    },
  };
};

const Home = () => {
  const { LL } = useI18nContext();

  const session = useSession();

  return (
    <>
      <Head>
        <title>{LL.skniKod.name()}</title>
      </Head>
      <main className="items-center justify-center">
        {session.status !== "authenticated" ? (
          <Link className="block" href="/sign-in">
            {LL.authentication.signIn()}
          </Link>
        ) : (
          <button
            onClick={() =>
              void signOut({
                callbackUrl: "/",
              })
            }
          >
            {LL.authentication.signOut()}
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
