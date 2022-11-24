import type { GetStaticProps } from "next";
import { useTheme } from "next-themes";

import { ButtonLink } from "@/components/button";
import { HeaderLogo } from "@/components/header/logo";
import { Meta } from "@/components/meta";
import { Navigation } from "@/components/navigation";
import { OpenGraph } from "@/components/open-graph";
import { Robots } from "@/components/robots";

import { useMounted } from "@/hooks/mounted";

import { getI18nProps, useI18n } from "@/i18n";

import { CONTAINER_STYLES } from "@/styles";

import { Hero } from "./hero";
import { Partners } from "./partners";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await getI18nProps(locale, ["home"])),
  },
});

export const HomePage = () => {
  const { LL } = useI18n();

  const isMounted = useMounted();

  const { setTheme, theme } = useTheme();

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
          <ButtonLink href="/about">{LL.about()}</ButtonLink>
          <ButtonLink href="/news">{LL.news()}</ButtonLink>
          <ButtonLink href="/articles">{LL.articles()}</ButtonLink>
          <ButtonLink href="/projects">{LL.projects()}</ButtonLink>
        </Navigation>
      </HeaderLogo>
      <main>
        <Hero />
        <Partners />
        <section className="flex gap-4 pt-8">
          <div className={CONTAINER_STYLES}>
            <ButtonLink href="/" locale="en">
              English
            </ButtonLink>
            <ButtonLink href="/" locale="pl">
              Polski
            </ButtonLink>
            {isMounted() && (
              <select
                onChange={(event) => setTheme(event.target.value)}
                value={theme}
              >
                <option value="dark">{LL.theme.dark()}</option>
                <option value="light">{LL.theme.light()}</option>
                <option value="system">{LL.theme.system()}</option>
              </select>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
