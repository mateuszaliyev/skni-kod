import type { HTMLAttributes, ReactNode } from "react";

import { ButtonLink } from "@/components/button";
import { Footer } from "@/components/footer";
import { HeaderLogo } from "@/components/header/logo";
import { Navigation } from "@/components/navigation";

export type LayoutMainProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const LayoutMain = (props: LayoutMainProps) => (
  <>
    <HeaderLogo logotype>
      <Navigation className="flex-grow">
        <ButtonLink href="/blog">Blog</ButtonLink>
      </Navigation>
    </HeaderLogo>
    <main {...props} />
    <Footer />
  </>
);
