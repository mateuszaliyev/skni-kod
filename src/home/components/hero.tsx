import { lazy, Suspense } from "react";

import { useTheme } from "next-themes";

import { GradientButton } from "@/components/button";
import { Container } from "@/components/container";

import { useI18nContext } from "@/i18n";

import { Barrel } from "./barrel";

const IsometricPrismCanvas = lazy(() =>
  import("@/components/isometric-prism/canvas").then(
    ({ IsometricPrismCanvas }) => ({
      default: IsometricPrismCanvas,
    })
  )
);

const IsometricPrismLogo = lazy(() =>
  import("@/components/isometric-prism/logo").then(
    ({ IsometricPrismLogo }) => ({
      default: IsometricPrismLogo,
    })
  )
);

export const Hero = () => {
  const { LL } = useI18nContext();

  const { resolvedTheme } = useTheme();

  const heroValues = [
    `${LL.home.hero.code().toUpperCase()}.`,
    `${LL.home.hero.apps().toLowerCase()}.`,
    `${LL.home.hero.bots().toLowerCase()}.`,
    `${LL.home.hero.games().toLowerCase()}.`,
    `${LL.home.hero.systems().toLowerCase()}.`,
    `${LL.home.hero.websites().toLowerCase()}.`,
  ];

  return (
    <section className="relative h-screen min-h-[640px] lg:min-h-[768px]">
      {resolvedTheme === "light" && (
        <>
          <div className="absolute inset-0 overflow-x-hidden">
            <Suspense fallback={null}>
              <IsometricPrismCanvas
                animationFrequency={0.5}
                background="#f8f8fa"
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
          <div className="flex basis-full flex-col items-center xl:basis-1/2 xl:items-start">
            <h1 className="select-none text-center text-6xl font-extralight leading-none sm:text-8xl md:text-9xl xl:text-left">
              {LL.home.hero.weCreate()}
              <Barrel
                className="text-center xl:text-left"
                lineProps={{
                  className:
                    "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 bg-clip-text font-bold text-transparent",
                }}
                lines={heroValues}
              />
            </h1>
            <p className="my-16 max-w-prose text-center text-lg text-gray-500 md:text-2xl xl:text-left">
              {LL.home.hero.description()}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <GradientButton>{LL.home.joinUs()}</GradientButton>
              <a
                className="inline-block select-none rounded-md px-8 py-4 text-lg font-bold transition-colors hover:text-sky-400"
                role="button"
              >
                {LL.home.learnMore()}
              </a>
            </div>
          </div>
          <Suspense fallback={null}>
            {/* <AnimatedLogo className="ml-auto hidden w-[480px] stroke-2 xl:block" /> */}
            <IsometricPrismLogo
              animationFrequency={0.5}
              background="#0ea5e9"
              className="ml-auto hidden w-[480px] stroke-2 xl:block"
              height={480}
              hue={{
                max: 220,
                min: 200,
              }}
              lightness={{
                max: 53,
                min: 48,
              }}
              saturation={{
                max: 89,
                min: 83,
              }}
              size={40}
              width={480}
            />
          </Suspense>
        </Container>
      </div>
    </section>
  );
};
