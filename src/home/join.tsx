import { useEffect, useRef, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { MdContentCopy, MdDone } from "react-icons/md";

import { Balancer } from "@/components/balancer";
import { Button } from "@/components/button";
import { ButtonLink } from "@/components/button/link";
import { Link } from "@/components/link";

import { POLISH_LOCALE_IDENTIFIER } from "@/constants/strings";

import { SKNI_KOD_FACEBOOK } from "@/environment";

import { useIntersection } from "@/hooks/intersection";

import {
  CONTAINER_STYLES,
  DECK_STYLES,
  HEADLINE_STYLES,
  KICKER_STYLES,
} from "@/styles";

import { cx } from "@/utilities/cx";

export const Join = () => {
  const [copied, setCopied] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const { hasIntersected } = useIntersection(ref);

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000);
  }, [copied]);

  const nextMeeting = new Date("2023-03-16T18:00");

  const dateFormat = new Intl.DateTimeFormat(POLISH_LOCALE_IDENTIFIER, {
    dateStyle: "long",
  });

  const timeFormat = new Intl.DateTimeFormat(POLISH_LOCALE_IDENTIFIER, {
    timeStyle: "short",
  });

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className={CONTAINER_STYLES}>
        <div
          className={cx(
            KICKER_STYLES,
            "mb-6 text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          Dołącz do nas
        </div>
        <h2
          className={cx(
            HEADLINE_STYLES,
            "text-center",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>Rozpocznij swoją podróż z nami</Balancer>
        </h2>
        <p
          className={cx(
            DECK_STYLES,
            "mt-6 mb-12 animation-delay-500",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <Balancer>
            <span>Przyjdź do </span>
            <Link
              className="text-sky-500 underline outline-none transition hover:text-black focus-visible:text-black dark:hover:text-white dark:focus-visible:text-white"
              href="https://goo.gl/maps/Rjm5RN6wk7pxYdvC8"
              target="_blank"
            >
              sali A.61 Wydziału Elektrotechniki i Informatyki Politechniki
              Rzeszowskiej
            </Link>
            <span> na najbliższe spotkanie </span>
            <time dateTime={nextMeeting.toISOString()}>
              {dateFormat.format(nextMeeting)} o godzinie{" "}
              {timeFormat.format(nextMeeting)}
            </time>
            <span> lub skontaktuj się z nami.</span>
          </Balancer>
        </p>
        <div
          className={cx(
            "mx-auto flex flex-wrap justify-center gap-4 animation-delay-1000",
            hasIntersected ? "animate-fade-in" : "opacity-0"
          )}
        >
          <ButtonLink
            className="w-72"
            height
            href={SKNI_KOD_FACEBOOK}
            icon={<FaFacebook className="h-5 w-5" />}
            target="_blank"
            variant="contained"
          >
            Facebook
          </ButtonLink>
          <div className="flex h-10 w-72 items-center rounded-md border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 font-mono dark:border-gray-700 dark:from-gray-900 dark:to-gray-1000">
            <div className="flex-grow text-center">
              <Link
                className="outline-none transition hover:text-sky-500 focus-visible:text-sky-500"
                href="mailto:sknikodprz@gmail.com"
                target="_blank"
              >
                sknikodprz@gmail.com
              </Link>
            </div>
            <Button
              className="ml-auto text-gray-500"
              disabled={copied}
              icon={
                copied ? (
                  <MdDone className="h-5 w-5 text-sky-500" />
                ) : (
                  <MdContentCopy className="h-5 w-5" />
                )
              }
              onClick={() => {
                setCopied(true);
                void navigator.clipboard.writeText("sknikodprz@gmail.com");
              }}
            >
              <span className="sr-only">Kopiuj adres e-mail</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
