import { LayoutMain } from "@/components/layout";
import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";
import { Robots } from "@/components/robots";

import { SKNI_KOD } from "@/constants/strings";

import { BASE_URL } from "@/environment";

import { Hero } from "@/home/hero";
import { Partners } from "@/home/partners";

const HomePage = () => (
  <LayoutMain>
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
  </LayoutMain>
);

export default HomePage;
