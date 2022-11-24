import { type HTMLAttributes, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar } from "@/components/avatar";
import { Button, ButtonHamburger } from "@/components/button";
import { Link } from "@/components/link";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
} from "@/environment";

import { useMediaQuery } from "@/hooks/media-query";

import { useI18n } from "@/i18n";

import { cx } from "@/utilities/cx";

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
    <div className={cx("flex", className)} {...props}>
      <nav
        className={cx(
          isLargeScreen
            ? "ml-auto flex items-center gap-6"
            : "fixed inset-0 z-navigation flex-col divide-y divide-black/10 bg-white/80 px-6 pt-20 backdrop-blur-sm backdrop-saturate-[180%] transition-[opacity,transform] duration-500 dark:divide-white/10 dark:bg-black/50",
          !isLargeScreen && menuOpen && "flex",
          !isLargeScreen && !menuOpen && "hidden"
        )}
      >
        {children}
        {session.status === "unauthenticated" && (
          <Button
            // className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-800 bg-gray-800 px-3 text-sm font-bold text-white transition-colors hover:bg-transparent hover:text-gray-800 dark:border-white dark:bg-white dark:text-gray-800 dark:hover:bg-transparent dark:hover:text-current lg:h-8"
            icon={<FaGithub className="h-5 w-5" />}
            onPress={() => void signIn("github")}
            size="small"
            variant="contained"
          >
            {/* <FaGithub className="h-5 w-5" /> */}
            {LL.signIn()}
          </Button>
        )}
        {isLargeScreen &&
          session.status === "authenticated" &&
          session.data.user?.image &&
          session.data.user?.name && (
            <button onClick={() => void signOut()}>
              <Avatar
                alt={session.data.user.name}
                size={48}
                src={session.data.user.image}
              />
            </button>
          )}
        {!isLargeScreen && (
          <div className="flex justify-center gap-4">
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
      <ButtonHamburger
        aria-label={menuOpen ? LL.menuClose() : LL.menuOpen()}
        className="z-navigation ml-auto lg:hidden"
        onPress={() => toggleMenu()}
        open={menuOpen}
      />
    </div>
  );
};
