import type { GetStaticProps } from "next";

import { api } from "@/api";

import { LayoutMain } from "@/components/layout";
import { Meta } from "@/components/meta";
import { OpenGraph } from "@/components/open-graph";
import { Robots } from "@/components/robots";

import { SKNI_KOD } from "@/constants/strings";

import { BASE_URL } from "@/environment";

import { Hero } from "@/home/hero";
import { Join } from "@/home/join";
import { LatestPosts } from "@/home/latest-posts";
import { Partners } from "@/home/partners";
import { Sections } from "@/home/sections";

import { getSsg } from "@/server/api/ssg";

export const getStaticProps = (async () => {
  const ssg = getSsg();

  await ssg.post.find.all.prefetch({
    public: true,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}) satisfies GetStaticProps;

const HomePage = () => {
  const { data: posts } = api.post.find.all.useQuery({
    public: true,
  });

  return (
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
      <Robots
        indexIfEmbedded={false}
        maxImagePreview="none"
        maxVideoPreview={0}
        noArchive
        noFollow
        noImageIndex
        noIndex
        noSiteLinksSearchBox
        noSnippet
        noTranslate
      />
      <Hero />
      <Partners />
      <Sections />
      {posts && <LatestPosts posts={posts.slice(0, 3)} />}
      <Join />
    </LayoutMain>
  );
};

export default HomePage;
