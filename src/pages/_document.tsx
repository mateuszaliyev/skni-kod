import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html className="flex min-h-screen flex-col scroll-smooth">
    <Head>
      {/* Favicons */}
      <link
        href="/images/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/images/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/images/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/images/favicons/site.webmanifest" rel="manifest" />
      <link
        color="#00699e"
        href="/images/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <link href="/images/favicons/favicon.ico" rel="shortcut icon" />
      <meta content="#2d89ef" name="msapplication-TileColor" />
      <meta
        content="/images/favicons/browserconfig.xml"
        name="msapplication-config"
      />
      <meta content="#ffffff" name="theme-color" />
      {/* Fonts */}
      <link
        as="font"
        crossOrigin="anonymous"
        href="/fonts/lato/lato-latin-regular.woff2"
        rel="preload"
        type="font/woff2"
      />
    </Head>
    <body className="flex flex-1 flex-col">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
