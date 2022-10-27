import { lazy, Suspense } from "react";

import { useTheme } from "next-themes";

import { GradientButton } from "@/components/button";
import { Container } from "@/components/container";

import { useI18nContext } from "@/i18n";

import { AnimatedLogo } from "./animated-logo";
import { PrismSpinner } from "./prism-spinner";

const IsometricPrism = lazy(() =>
  import("@/components/isometric-prism/canvas").then(({ IsometricPrism }) => ({
    default: IsometricPrism,
  }))
);

export const Hero = () => {
  const { LL } = useI18nContext();

  const { resolvedTheme } = useTheme();

  const heroValues = [
    LL.home.hero.code().toUpperCase(),
    LL.home.hero.apps().toLowerCase(),
    LL.home.hero.bots().toLowerCase(),
    LL.home.hero.games().toLowerCase(),
    LL.home.hero.systems().toLowerCase(),
    LL.home.hero.websites().toLowerCase(),
  ];

  return (
    <section className="relative min-h-screen">
      {resolvedTheme === "light" && (
        <>
          <div className="absolute inset-0 overflow-x-hidden">
            <Suspense fallback={null}>
              <IsometricPrism
                animationFrequency={0.5}
                background="#f0f2f4"
                hue={{
                  max: 210,
                  min: 210,
                }}
                lightness={{
                  max: 100,
                  min: 95,
                }}
                saturation={{
                  max: 16,
                  min: 16,
                }}
                size={40} //  TODO: Pick the best `size` value (25-50?).
              />
            </Suspense>
          </div>
          <div className="absolute left-0 bottom-0 right-0 h-96 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </>
      )}
      <div className="absolute inset-0 pt-20">
        <Container className="flex h-full items-center">
          <div className="basis-full xl:basis-1/2">
            <h1 className="select-none text-6xl font-extralight leading-none lg:text-9xl">
              {LL.home.hero.weCreate()}
              <PrismSpinner height={128}>
                {heroValues.map((value) => (
                  <div
                    className="bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 bg-clip-text font-bold text-transparent"
                    key={value}
                  >
                    {value}.
                  </div>
                ))}
              </PrismSpinner>
            </h1>
            <p className="my-16 max-w-prose text-2xl text-gray-500">
              {LL.home.hero.description()}
            </p>
            <div className="flex space-x-4">
              <GradientButton>{LL.home.joinUs()}</GradientButton>
              <a
                className="inline-block select-none rounded-md px-8 py-4 text-lg font-bold transition-colors hover:text-blue-400"
                role="button"
              >
                Learn more
              </a>
            </div>
          </div>
          <AnimatedLogo className="ml-auto hidden w-[480px] stroke-2 xl:block" />
        </Container>
      </div>
    </section>
  );
};
