import { type HTMLAttributes, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import {
  MdLightMode,
  MdLogout,
  MdMonitor,
  MdNightlightRound,
  MdPostAdd,
} from "react-icons/md";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Avatar } from "@/components/avatar";
import { ButtonHamburger } from "@/components/button";
import { Link } from "@/components/link";
import { Menu, MenuItemButton, MenuItemLink } from "@/components/menu";

import { ROLES } from "@/constants/strings";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
} from "@/environment";

import { useMediaQuery } from "@/hooks/media-query";

import { cx } from "@/utilities/cx";
import { isModerator } from "@/utilities/permissions";

import { MenuSection } from "../menu/section";

export type NavigationProps = HTMLAttributes<HTMLDivElement>;

export const Navigation = ({
  children,
  className,
  ...props
}: NavigationProps) => {
  const session = useSession();

  const { setTheme, theme } = useTheme();

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
    if (isLargeScreen && menuOpen) toggleMenu(false);

    return () => {
      if (menuOpen) toggleMenu(false);
    };
  }, [isLargeScreen, menuOpen]);

  return (
    <div className={cx("flex", className)} {...props}>
      <nav
        className={cx(
          isLargeScreen
            ? "ml-auto flex items-center gap-6"
            : "fixed inset-0 z-navigation flex-col divide-y divide-black/10 bg-white/80 px-6 pt-20 backdrop-blur-sm backdrop-saturate-180 transition duration-500 dark:divide-white/10 dark:bg-black/50",
          !isLargeScreen && menuOpen && "flex",
          !isLargeScreen && !menuOpen && "hidden"
        )}
      >
        {children}
        {isLargeScreen && (
          <Menu
            button={
              <button className="rounded-full focus:outline-2 focus:outline-offset-4">
                <Avatar
                  alt={session.data?.user?.name ?? undefined}
                  size={48}
                  src={session.data?.user?.image ?? undefined}
                  title={session.data?.user?.name ?? undefined}
                />
              </button>
            }
            placement="right"
          >
            {isModerator(session.data?.user?.role) && (
              <>
                <MenuSection
                  title={
                    session.data?.user?.role
                      ? ROLES[session.data.user.role]
                      : undefined
                  }
                >
                  <MenuItemLink
                    href="/blog/formularz"
                    icon={<MdPostAdd className="h-5 w-5" />}
                  >
                    Nowy post
                  </MenuItemLink>
                  {/* {isAdministrator(session.data.user?.role) && (
                    <MenuItemLink
                      href="/uzytkownicy"
                      icon={<MdGroups className="h-5 w-5" />}
                    >
                      Użytkownicy
                    </MenuItemLink>
                  )} */}
                </MenuSection>
              </>
            )}
            <MenuSection>
              <MenuItemButton
                icon={
                  theme === "dark" ? (
                    <MdNightlightRound className="h-5 w-5" />
                  ) : theme === "light" ? (
                    <MdLightMode className="h-5 w-5" />
                  ) : (
                    <MdMonitor className="h-5 w-5" />
                  )
                }
                onClick={() =>
                  theme === "system"
                    ? setTheme("dark")
                    : theme === "dark"
                    ? setTheme("light")
                    : setTheme("system")
                }
              >
                Motyw
              </MenuItemButton>
              <MenuItemButton
                disabled={session.status === "loading"}
                icon={
                  session.status === "authenticated" ? (
                    <MdLogout className="h-5 w-5" />
                  ) : (
                    <FaGithub className="h-5 w-5" />
                  )
                }
                onClick={
                  session.status === "authenticated"
                    ? () => void signOut()
                    : session.status === "unauthenticated"
                    ? () => void signIn("github")
                    : undefined
                }
              >
                {session.status === "authenticated" && "Wyloguj się"}
                {session.status === "unauthenticated" && "Zaloguj się"}
              </MenuItemButton>
            </MenuSection>
          </Menu>
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
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        className="z-navigation ml-auto lg:hidden"
        onClick={() => toggleMenu()}
        open={menuOpen}
      />
    </div>
  );
};
