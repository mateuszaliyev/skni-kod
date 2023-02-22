import { Lato } from "next/font/google";
import Head from "next/head";

const lato = Lato({
  display: "fallback",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400", "700"],
});

export const Fonts = () => (
  <Head>
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --font-lato: ${lato.style.fontFamily} }`,
      }}
      id="next-font"
    />
  </Head>
);
