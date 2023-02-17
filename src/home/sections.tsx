import { useId, useRef } from "react";
import type { IconType } from "react-icons";
import { MdDevices, MdMemory, MdSportsEsports } from "react-icons/md";

import { Balancer } from "@/components/balancer";
import { CyanSkyBlueGradient } from "@/components/gradient/cyan-sky-blue";
import { Link } from "@/components/link";

import { useIntersection } from "@/hooks/intersection";

import {
  CONTAINER_STYLES,
  DECK_STYLES,
  HEADLINE_STYLES,
  KICKER_STYLES,
} from "@/styles";

import { cx } from "@/utilities/cx";

type SectionProps = {
  body: string;
  href: string;
  icon: IconType;
  title: string;
};

const SectionCard = ({ body, href, icon: Icon, title }: SectionProps) => {
  const id = useId();

  return (
    <Link
      className="group rounded-xl border border-gray-200 px-6 py-10 text-center shadow outline-none transition hover:bg-gray-50 focus-visible:border-sky-500 focus-visible:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-1000 dark:focus-visible:border-sky-500 dark:focus-visible:bg-gray-1000"
      href={href}
    >
      <div className="mx-auto flex max-w-prose flex-col items-center gap-1">
        <div className="relative h-32 w-32">
          <svg height="0" width="0">
            <defs>
              <CyanSkyBlueGradient id={id} x1="0" x2="1" y1="0" y2="1" />
            </defs>
          </svg>
          <Icon className="absolute h-32 w-32 text-gray-300 dark:text-gray-700" />
          <Icon
            className="absolute h-32 w-32 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
            fill={`url(#${id})`}
          />
        </div>
        <span className="text-2xl text-gray-500">Sekcja</span>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-lg text-gray-500 md:text-xl">{body}</p>
      </div>
    </Link>
  );
};

export const Sections = () => {
  const ref = useRef<HTMLElement>(null);

  const { hasIntersected } = useIntersection(ref);

  return (
    <section id="sections" ref={ref}>
      <div className={CONTAINER_STYLES}>
        <div
          className={cx(
            KICKER_STYLES,
            "mb-6 text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          Poznaj nasze sekcje
        </div>
        <h2
          className={cx(
            HEADLINE_STYLES,
            "text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>Każdy znajdzie coś dla siebie</Balancer>
        </h2>
        <p
          className={cx(
            DECK_STYLES,
            "mt-6 mb-12 animation-delay-500",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>
            Projekty realizowane są w obrębie trzech, różnych tematycznie
            sekcji. Dołącz do interesujących Cię projektów i przyczyń się do
            stworzenia czegoś wyjątkowego.
          </Balancer>
        </p>
        <div
          className={cx(
            "grid grid-cols-1 gap-4 animation-delay-1000 lg:grid-cols-3",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <SectionCard
            body="Buduj wieloplatformowe aplikacje wykorzystujące szeroką gamę technologii."
            href="#sekcja-aplikacji-desktopowych-mobilnych-i-webowych"
            icon={MdDevices}
            title="Aplikacji Desktopowych, Mobilnych i Webowych"
          />
          <SectionCard
            body="Twórz gry komputerowe, głównie oparte o silnik Unity, z możliwością wykorzystania technologii wirtualnej rzeczywistości."
            href="#sekcja-game-dev"
            icon={MdSportsEsports}
            title="Game-Dev"
          />
          <SectionCard
            body="Łącz przeszłość z teraźniejszością, odrestaurowując stary sprzęt oraz realizuj różne projekty elektroniczne."
            href="#sekcja-elektroniki-i-retro"
            icon={MdMemory}
            title="Eletroniki i Retro"
          />
        </div>
      </div>
    </section>
  );
};
