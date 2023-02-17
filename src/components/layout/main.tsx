import type { HTMLAttributes, ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";

export type LayoutMainProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const LayoutMain = (props: LayoutMainProps) => (
  <>
    <Header>
      <Navigation className="flex-grow" />
    </Header>
    <main {...props} />
    <Footer />
  </>
);
