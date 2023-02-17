import { Fragment, type HTMLAttributes, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  MdClose,
  MdLightMode,
  MdLogout,
  MdMonitor,
  MdMoreVert,
  MdNightlightRound,
  MdPostAdd,
} from "react-icons/md";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Dialog, Transition } from "@headlessui/react";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { ButtonLink } from "@/components/button/link";
import { Link } from "@/components/link";
import { Logomark } from "@/components/logo/mark";
import { Menu, MenuItemButton, MenuItemLink } from "@/components/menu";
import { MenuSection } from "@/components/menu/section";

import { ROLES } from "@/constants/strings";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
  SKNI_KOD_LINKED_IN,
} from "@/environment";

import { CONTAINER_STYLES, TRANSITION_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";
import { isModerator } from "@/utilities/permissions";

export type NavigationProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

const NAVIGATION_LINKS = [
  {
    href: "/blog",
    title: "Blog",
  },
];

export const Navigation = ({ className, ...props }: NavigationProps) => {
  const session = useSession();

  const [open, setOpen] = useState(false);

  const { setTheme, theme } = useTheme();

  return (
    <div className={cx("flex gap-6", className)} {...props}>
      <nav className="ml-auto hidden items-center md:flex">
        <ul className="flex items-center gap-6">
          {NAVIGATION_LINKS.map(({ href, title }, index) => (
            <li key={index}>
              <ButtonLink href={href}>{title}</ButtonLink>
            </li>
          ))}
        </ul>
      </nav>
      <Menu
        button={
          <button className="rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500">
            <span className="sr-only">Więcej</span>
            <Avatar
              alt={session.data?.user?.name ?? undefined}
              size={48}
              src={session.data?.user?.image ?? undefined}
              title={session.data?.user?.name ?? undefined}
            />
          </button>
        }
        className="hidden md:block"
        placement="right"
      >
        {session.data?.user?.role && isModerator(session.data.user.role) && (
          <MenuSection title={ROLES[session.data.user.role]}>
            <MenuItemLink
              href="/blog/formularz"
              icon={<MdPostAdd className="h-5 w-5" />}
            >
              Nowy post
            </MenuItemLink>
          </MenuSection>
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
          {session.status !== "loading" && (
            <MenuItemButton
              icon={
                session.status === "unauthenticated" ? (
                  <FaGithub className="h-5 w-5" />
                ) : (
                  <MdLogout className="h-5 w-5" />
                )
              }
              onClick={() =>
                session.status === "unauthenticated"
                  ? void signIn("github")
                  : void signOut()
              }
            >
              {session.status === "unauthenticated"
                ? "Zaloguj się"
                : "Wyloguj się"}
            </MenuItemButton>
          )}
        </MenuSection>
      </Menu>
      <Button
        aria-label="Otwórz menu"
        className={cx("ml-auto md:hidden", open && "hidden")}
        icon={<MdMoreVert className="h-5 w-5" />}
        onClick={() => setOpen(true)}
      />
      <Transition as={Fragment} show={open}>
        <Dialog
          className="fixed inset-0 z-navigation"
          onClose={() => setOpen(false)}
        >
          <Transition.Child as={Fragment} {...TRANSITION_STYLES}>
            <div
              aria-hidden="true"
              className="absolute h-full w-full bg-white/80 backdrop-blur-sm backdrop-saturate-180 dark:bg-black/50"
            />
          </Transition.Child>
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="absolute flex h-full w-full flex-col">
              <div
                className={cx(
                  CONTAINER_STYLES,
                  "flex h-20 justify-between py-4"
                )}
              >
                <Link href="/">
                  <Logomark className="h-full" />
                </Link>
                <Button
                  aria-label="Zamknij menu"
                  icon={<MdClose className="h-5 w-5" />}
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className=" flex flex-grow flex-col gap-6 overflow-y-auto p-6">
                <nav className="self-stretch">
                  <ul className="flex flex-col items-start gap-6">
                    {NAVIGATION_LINKS.map(({ href, title }, index) => (
                      <li key={index}>
                        <ButtonLink href={href}>{title}</ButtonLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ul className="flex gap-4">
                  <li>
                    <Link
                      className="outline-none transition hover:text-sky-500 focus-visible:text-sky-500"
                      href={SKNI_KOD_FACEBOOK}
                      target="_blank"
                    >
                      <FaFacebook className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="outline-none transition hover:text-gray-500 focus-visible:text-gray-500"
                      href={SKNI_KOD_GITHUB}
                      target="_blank"
                    >
                      <FaGithub className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="outline-none transition hover:text-rose-500 focus-visible:text-rose-500"
                      href={SKNI_KOD_INSTAGRAM}
                      target="_blank"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="outline-none transition hover:text-sky-600 focus-visible:text-sky-600"
                      href={SKNI_KOD_LINKED_IN}
                      target="_blank"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </Link>
                  </li>
                </ul>
                <ul className="flex flex-col items-start gap-6 border-t border-gray-200 py-6 dark:border-gray-700">
                  {session.data?.user?.role &&
                    isModerator(session.data.user.role) && (
                      <li>
                        <ButtonLink
                          href="/blog/formularz"
                          icon={<MdPostAdd className="h-5 w-5" />}
                        >
                          Nowy post
                        </ButtonLink>
                      </li>
                    )}
                  <li>
                    <Button
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
                    </Button>
                  </li>
                  <li>
                    <Button
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
                    </Button>
                  </li>
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};
