import dynamic from "next/dynamic";

import { Balancer } from "@/components/balancer";
import { ButtonGradientLink } from "@/components/button/gradient-link";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

import { Barrel } from "./barrel";

const IsometricPrismCanvasBackground = dynamic(
  () =>
    import("@/components/isometric-prism/background").then(
      ({ IsometricPrismCanvasBackground }) => IsometricPrismCanvasBackground
    ),
  {
    ssr: false,
  }
);

const IsometricPrismCanvasLogo = dynamic(
  () =>
    import("@/components/isometric-prism/logo").then(
      ({ IsometricPrismCanvasLogo }) => IsometricPrismCanvasLogo
    ),
  {
    ssr: false,
  }
);

export const Hero = () => (
  <section className="relative h-screen min-h-[40rem] md:min-h-[56rem]">
    <IsometricPrismCanvasBackground className="absolute inset-0 animate-fade-in" />
    <div className="absolute left-0 bottom-0 right-0 h-96 bg-gradient-to-b from-transparent via-transparent to-white dark:to-transparent" />
    <div className="absolute inset-0">
      <div className={cx(CONTAINER_STYLES, "flex h-full items-center")}>
        <div className="flex basis-full flex-col items-center xl:basis-1/2 xl:items-start">
          <h1 className="animate-fade-in select-none text-center text-6xl font-thin sm:text-8xl md:text-9xl xl:text-left">
            Tworzymy
            <Barrel
              className="text-center xl:text-left"
              lineProps={{
                className:
                  "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 bg-clip-text font-bold leading-tight text-transparent",
              }}
              lines={[
                `KOD.`,
                `aplikacje.`,
                `boty.`,
                `gry.`,
                `systemy.`,
                `strony.`,
              ]}
            />
          </h1>
          <p className="my-16 max-w-prose animate-fade-in text-center text-lg text-gray-500 animation-delay-500 md:text-2xl xl:text-left">
            <Balancer>
              Studenckie Koło Naukowe Informatyków &quot;KOD&quot; to miejsce, w
              którym wspólnie tworzymy projekty z użyciem interesujących nas,
              nowoczesnych technologii.
            </Balancer>
          </p>
          <div className="flex animate-fade-in flex-col items-center gap-12 animation-delay-1000 sm:flex-row">
            <ButtonGradientLink href="#sections">
              Dowiedz się więcej
            </ButtonGradientLink>
          </div>
        </div>
        <IsometricPrismCanvasLogo
          animationFrequency={0.5}
          className="ml-auto hidden h-[449px] w-[480px] animate-fade-in animation-delay-1000 xl:block"
          size={40}
        />
        {/* <AnimatedLogo className="ml-auto hidden w-[480px] stroke-2 xl:block" /> */}
        {/* <svg
            className="ml-auto hidden w-[480px] stroke-2 xl:block"
            viewBox="0 0 581.57 543.422"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <CyanSkyBlueGradient
                id={gradientId}
                x1="0"
                x2="1"
                y1="0"
                y2="1"
              />
            </defs>
            <g fill={`url(#${gradientId})`}>
              <path d="M113.812 19.828c-8.742 0-16.726 1.527-23.953 4.578-7.218 3.055-13.421 7.43-18.609 13.125-5.187 5.7-9.258 12.617-12.203 20.75-2.95 8.137-4.422 17.188-4.422 27.156 0 11.594.91 22.887 2.734 33.875a792.804 792.804 0 0 0 6.11 32.485 868.968 868.968 0 0 1 6.094 32.047 190.017 190.017 0 0 1 2.75 32.187c0 7.524-1.274 14.438-3.813 20.75-2.543 6.305-5.898 11.793-10.062 16.469A58.963 58.963 0 0 1 44.094 265c-5.387 3.156-11.031 5.344-16.938 6.563 5.907 1.43 11.551 3.718 16.938 6.875a58.81 58.81 0 0 1 14.344 11.734c4.164 4.68 7.519 10.172 10.062 16.484 2.54 6.305 3.813 13.219 3.813 20.75 0 10.781-.918 21.512-2.75 32.188a922.16 922.16 0 0 1-6.094 32.187 833.918 833.918 0 0 0-6.11 32.656c-1.824 10.981-2.734 22.168-2.734 33.563 0 9.957 1.473 19.004 4.422 27.14 2.945 8.145 7.016 15.063 12.203 20.75 5.188 5.696 11.39 10.07 18.61 13.126 7.226 3.05 15.21 4.578 23.952 4.578h10.079c1.82 0 3.546.61 5.171 1.828 1.633 1.219 2.454 2.945 2.454 5.187v12.813h-16.782c-13.43 0-25.48-2.188-36.156-6.563-10.68-4.367-19.68-10.464-27-18.297-7.324-7.835-12.922-17.042-16.797-27.625-3.867-10.574-5.797-22.062-5.797-34.468 0-11.395.961-22.43 2.891-33.11 1.938-10.675 4.023-21.3 6.266-31.875a1157.53 1157.53 0 0 0 6.25-31.734c1.937-10.582 2.906-21.469 2.906-32.656 0-6.707-1.121-12.86-3.36-18.453-2.23-5.594-5.433-10.473-9.609-14.641-4.168-4.176-9.152-7.383-14.953-9.625-5.793-2.238-12.25-3.36-19.375-3.36v-18.609c7.125 0 13.582-1.117 19.375-3.36 5.8-2.237 10.785-5.44 14.953-9.609 4.176-4.164 7.379-9.046 9.61-14.64 2.238-5.594 3.359-11.75 3.359-18.469 0-11.187-.969-22.066-2.906-32.64a1146.042 1146.042 0 0 0-6.25-31.735 1099.1 1099.1 0 0 1-6.266-31.875c-1.93-10.687-2.89-21.723-2.89-33.11 0-12.413 1.93-23.91 5.796-34.484 3.875-10.582 9.473-19.785 16.797-27.609 7.32-7.832 16.32-13.938 27-18.313C89.254 2.188 101.305 0 114.734 0h16.782v12.813c0 2.242-.82 3.968-2.454 5.187-1.625 1.219-3.351 1.828-5.171 1.828z" />
              <path d="m238.235 340.49-103.383 33.205V202.179l103.383 33.203v-.308l-33.207-103.38h171.515l-33.203 103.38v.308l103.38-33.203v171.516L343.34 340.49v.312l33.203 103.375H205.028l33.207-103.375" />
              <path d="M581.569 281.016c-7.117 0-13.574 1.12-19.375 3.359-5.793 2.242-10.777 5.45-14.953 9.625-4.168 4.168-7.371 9.047-9.61 14.64-2.242 5.594-3.359 11.747-3.359 18.454 0 11.187.961 22.074 2.89 32.656a1172.78 1172.78 0 0 0 6.266 31.734 1090.69 1090.69 0 0 1 6.25 31.875c1.938 10.68 2.907 21.715 2.907 33.11 0 12.406-1.934 23.894-5.797 34.469-3.867 10.582-9.461 19.789-16.782 27.625-7.324 7.832-16.324 13.93-27 18.296-10.68 4.375-22.73 6.563-36.156 6.563h-16.78v-12.813c0-2.242.812-3.968 2.437-5.187 1.625-1.219 3.352-1.828 5.188-1.828h10.062c8.75 0 16.735-1.528 23.954-4.578 7.218-3.055 13.421-7.43 18.609-13.125 5.187-5.688 9.254-12.606 12.203-20.75 2.957-8.137 4.438-17.184 4.438-27.141 0-11.395-.918-22.582-2.75-33.563a848.685 848.685 0 0 0-6.11-32.656 960.149 960.149 0 0 1-6.094-32.187 189.582 189.582 0 0 1-2.75-32.188c0-7.531 1.27-14.445 3.813-20.75 2.54-6.312 5.895-11.804 10.062-16.484a59.105 59.105 0 0 1 14.344-11.735c5.395-3.156 11.04-5.445 16.938-6.875-5.899-1.218-11.543-3.406-16.938-6.562a59.26 59.26 0 0 1-14.344-11.75c-4.167-4.676-7.523-10.164-10.062-16.469-2.543-6.312-3.813-13.226-3.813-20.75 0-10.781.915-21.508 2.75-32.187a902.91 902.91 0 0 1 6.094-32.047 806.275 806.275 0 0 0 6.11-32.485c1.832-10.988 2.75-22.28 2.75-33.875 0-9.968-1.48-19.019-4.438-27.156-2.95-8.133-7.016-15.05-12.203-20.75-5.188-5.695-11.39-10.07-18.61-13.125-7.218-3.05-15.203-4.578-23.953-4.578h-10.062c-1.836 0-3.563-.61-5.188-1.828-1.625-1.219-2.437-2.945-2.437-5.188V0h16.781c13.426 0 25.477 2.187 36.156 6.562 10.676 4.375 19.676 10.481 27 18.313 7.32 7.824 12.915 17.027 16.782 27.61 3.863 10.574 5.797 22.07 5.797 34.484 0 11.386-.97 22.422-2.907 33.11a1085.98 1085.98 0 0 1-6.25 31.874 1160.962 1160.962 0 0 0-6.265 31.734c-1.93 10.575-2.89 21.454-2.89 32.641 0 6.719 1.116 12.875 3.358 18.469 2.239 5.594 5.442 10.476 9.61 14.64 4.176 4.168 9.16 7.372 14.953 9.61 5.8 2.242 12.258 3.36 19.375 3.36z" />
            </g>
          </svg> */}
        {/* <div className="ml-auto hidden w-[480px] stroke-2 [mask-image:url(/assets/images/logo/logomark.svg)] [mask-repeat:no-repeat] xl:block">
            <IsometricPrismCanvas
              animationFrequency={0.5}
              background="#0ea5e9"
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
          </div> */}
      </div>
    </div>
  </section>
);
