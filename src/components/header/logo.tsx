import type { ReactNode } from "react";

import { Link } from "@/components/link";
import { Logo } from "@/components/logo";
import { Logomark } from "@/components/logo/mark";

import { useRouter } from "@/hooks/router";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export type HeaderLogoProps = {
  children?: ReactNode;
};

export const HeaderLogo = ({ children }: HeaderLogoProps) => {
  const router = useRouter();

  return (
    <header className="absolute z-header h-20 w-full md:h-28">
      <div className={cx(CONTAINER_STYLES, "flex h-full items-center py-4")}>
        <Link
          className="group flex h-full select-none items-center gap-4 outline-none transition focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          href="/"
          onContextMenu={(event) => {
            if (window.matchMedia("(pointer: fine)").matches) {
              event.preventDefault();
              void router.push("/brand");
            }
          }}
          onMouseOver={() => {
            void router.prefetch("/brand");
          }}
        >
          <Logo className="hidden h-full md:block" />
          <Logomark className="h-full md:hidden" />
        </Link>
        {children}
      </div>
    </header>
  );
};
