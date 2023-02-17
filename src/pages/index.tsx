import { LayoutMain } from "@/components/layout";
import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";
import { Robots } from "@/components/robots";

import { SKNI_KOD } from "@/constants/strings";

import { BASE_URL } from "@/environment";

import { Hero } from "@/home/hero";
import { Join } from "@/home/join";
import { Partners } from "@/home/partners";
import { Sections } from "@/home/sections";

const HomePage = () => (
  <LayoutMain className="flex flex-col gap-20 md:gap-28">
    <Meta />
    <OpenGraph
      og={{
        image: [
          {
            alt: "SKNI KOD Logo",
            height: 701,
            type: "image/png",
            url: `${BASE_URL}/assets/images/logo/logo-color.png`,
            width: 1304,
          },
        ],
        locale: {
          default: "pl_PL",
        },
        title: SKNI_KOD,
        type: "website",
      }}
    />
    <Robots />
    <Hero />
    <Partners />
    <Sections />
    <Join />
  </LayoutMain>
);

export default HomePage;
