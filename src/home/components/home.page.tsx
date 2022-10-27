import { useEffect, useState } from "react";

import type { GetStaticProps } from "next";
import { useTheme } from "next-themes";

import { HeaderLogo } from "@/components/header/logo";
import { Link } from "@/components/link";
import { Meta } from "@/components/meta";
import { Navigation, NavigationLink } from "@/components/navigation";
import { OpenGraph } from "@/components/open-graph";
import { Robots } from "@/components/robots";

import { getI18nProps, useI18nContext } from "@/i18n";

import { Hero } from "./hero";
import { Partners } from "./partners";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await getI18nProps(locale, ["home"])),
  },
});

export const HomePage = () => {
  const [mounted, setMounted] = useState(false);

  const { LL } = useI18nContext();

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Meta preloadFonts={["bold", "light"]} />
      <OpenGraph
        og={{
          image: [
            {
              alt: "SKNI KOD Logo",
              height: 701,
              secureUrl: "https://localhost:3000/images/logo/logo-color.png",
              type: "image/png",
              url: "http://localhost:3000/images/logo/logo-color.png",
              width: 1304,
            },
          ],
          locale: {
            alternate: ["en_US"],
            default: "pl_PL",
          },
          title: LL.skniKod.name(),
          type: "website",
        }}
      />
      <Robots />
      <HeaderLogo logotype>
        <Navigation className="flex-grow">
          <NavigationLink href="/about">{LL.about()}</NavigationLink>
          <NavigationLink href="/news">{LL.news()}</NavigationLink>
          <NavigationLink href="/articles">{LL.articles()}</NavigationLink>
          <NavigationLink href="/projects">{LL.projects()}</NavigationLink>
        </Navigation>
      </HeaderLogo>
      <main>
        <Hero />
        <Partners />
        <section className="flex space-x-4 pt-8">
          <Link href="/" locale="en">
            English
          </Link>
          <Link href="/" locale="pl">
            Polski
          </Link>
          {mounted && (
            <select
              onChange={(event) => setTheme(event.target.value)}
              value={theme}
            >
              <option value="dark">{LL.theme.dark()}</option>
              <option value="light">{LL.theme.light()}</option>
              <option value="system">{LL.theme.system()}</option>
            </select>
          )}
        </section>
      </main>
    </>
  );
};
