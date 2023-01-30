import { Fragment, type ReactNode } from "react";

import { Menu as HeadlessUiMenu, Transition } from "@headlessui/react";

import { TRANSITION_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export type MenuProps = {
  button: ReactNode;
  children: ReactNode;
  placement?: "left" | "right";
};

export const Menu = ({ button, children, placement }: MenuProps) => (
  <HeadlessUiMenu as="div" className="relative flex items-center">
    <HeadlessUiMenu.Button as={Fragment}>{button}</HeadlessUiMenu.Button>
    <Transition as={Fragment} {...TRANSITION_STYLES}>
      <HeadlessUiMenu.Items
        as="div"
        className={cx(
          "absolute top-full z-menu mt-2 min-w-[12rem] rounded-md border border-gray-200 bg-white/80 p-1 shadow-lg outline-none backdrop-blur-sm backdrop-saturate-180 dark:border-gray-700 dark:bg-black/50",
          placement === "right" ? "right-0" : "left-0"
        )}
      >
        {children}
      </HeadlessUiMenu.Items>
    </Transition>
  </HeadlessUiMenu>
);
