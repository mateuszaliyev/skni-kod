import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { getI18nProps, useI18nContext } from "@/i18n";

import { useQuery } from "@/server/hooks";

import type { Page } from "@/types";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await getI18nProps(locale, ["authentication"])),
    },
  };
};

const Home: Page = () => {
  const { LL } = useI18nContext();

  const session = useSession();

  const hello = useQuery([
    "example.hello",
    { text: session.data?.user?.name ?? "stranger!" },
  ]);

  return (
    <>
      <Head>
        <title>{LL.skniKod.name()}</title>
      </Head>
      <main className="items-center justify-center">
        {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading...</p>}
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
