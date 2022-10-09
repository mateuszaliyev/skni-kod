import { ReactNode } from "react";

import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Marquee } from "@/components/marquee";

export type Partner = {
  href: string;
  logo: ReactNode;
  name: string;
};

export type PartnersProps = {
  partners: Partner[];
};

export const Partners = ({ partners }: PartnersProps) => (
  <section className="space-y-4 py-4">
    <Container>
      <h2 className="mb-6 text-center text-sm font-black uppercase tracking-[0.2em]">
        Our partners
      </h2>
      <h2 className="text-center text-4xl font-bold md:text-6xl">
        {/* Backed by */}
        {/* Meet our partners */}
        {/* Proudly backed by */}
        {/* Proudly backed by the Best */}
        Proudly backed by our partners
      </h2>
      <p className="mx-auto mt-6 mb-12 max-w-prose text-center text-xl text-gray-500 dark:text-gray-400">
        We collaborate with companies from various sectors of the IT industry.
        Our partners provide us with access to specialized hardware as well as
        opportunities to learn from the best and gain invaluable experience.
      </p>
    </Container>
    <Marquee
      enabled={({ containerWidth, marqueeWidth }) =>
        containerWidth < marqueeWidth
      }
      fade
      marqueeProps={{
        className: "flex justify-center",
      }}
    >
      {partners.map(({ href, logo, name }) => (
        <Link
          aria-label={name}
          className="group mx-4 md:mx-8"
          href={href}
          key={name}
        >
          {logo}
        </Link>
      ))}
    </Marquee>
  </section>
);
