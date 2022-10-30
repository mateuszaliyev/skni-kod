import { type HTMLAttributes, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { signIn, signOut, useSession } from "next-auth/react";

import { clsx } from "clsx";

import { ButtonMenu } from "@/components/button";
import { Link } from "@/components/link";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
} from "@/environment";

import { useMediaQuery } from "@/hooks/media-query";

import { useI18n } from "@/i18n";

export type NavigationProps = HTMLAttributes<HTMLDivElement>;

export const Navigation = ({
  children,
  className,
  ...props
}: NavigationProps) => {
  const { LL } = useI18n();

  const session = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)", true);

  const toggleMenu = (force?: boolean) =>
    setMenuOpen((menuOpen) => {
      if (force !== undefined) {
        document.body.style.overflowY = force ? "hidden" : "initial";
        return force;
      }

      document.body.style.overflowY = !menuOpen ? "hidden" : "initial";
      return !menuOpen;
    });

  useEffect(() => {
    if (isLargeScreen && menuOpen) {
      toggleMenu(false);
    }
  }, [isLargeScreen, menuOpen]);

  return (
    <div className={clsx("flex", className)} {...props}>
      <nav
        className={clsx(
          isLargeScreen
            ? "ml-auto flex items-center gap-6"
            : "fixed inset-0 z-navigation flex-col divide-y divide-black/10 bg-white/80 px-6 pt-20 backdrop-blur-sm backdrop-saturate-[180%] transition-[opacity,transform] duration-500 dark:divide-white/10 dark:bg-black/50",
          !isLargeScreen && menuOpen && "flex",
          !isLargeScreen && !menuOpen && "hidden"
        )}
      >
        {children}
        {session.status === "unauthenticated" && (
          <button
            className="flex h-10 items-center justify-center rounded-md border border-black bg-black px-3 text-sm font-bold text-white transition-colors hover:bg-transparent hover:text-current dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-current lg:h-8"
            onClick={() => void signIn("github")}
          >
            {LL.signIn()}
          </button>
        )}
        {isLargeScreen &&
          session.status === "authenticated" &&
          session.data.user?.image &&
          session.data.user?.name && (
            <button onClick={() => void signOut()}>
              <img
                alt={session.data.user.name}
                className="cursor-pointer rounded-full"
                height={56}
                src={session.data.user.image}
                width={56}
              />
            </button>
          )}
        {!isLargeScreen && (
          <div className="flex justify-center space-x-4">
            <Link href={SKNI_KOD_FACEBOOK} target="_blank">
              <FaFacebook className="h-8 w-8" />
            </Link>
            <Link href={SKNI_KOD_GITHUB} target="_blank">
              <FaGithub className="h-8 w-8" />
            </Link>
            <Link href={SKNI_KOD_INSTAGRAM} target="_blank">
              <FaInstagram className="h-8 w-8" />
            </Link>
          </div>
        )}
      </nav>
      <ButtonMenu
        className="z-navigation ml-auto lg:hidden"
        label={{
          close: LL.menuClose(),
          open: LL.menuOpen(),
        }}
        onClick={() => toggleMenu()}
        open={menuOpen}
      />
    </div>
  );
};
