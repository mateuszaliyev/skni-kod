import { type ButtonHTMLAttributes, Fragment, type ReactNode } from "react";

import { Menu } from "@headlessui/react";
import { cva } from "class-variance-authority";

import { Link, type LinkProps } from "@/components/link";

import { cx } from "@/utilities/cx";

export type MenuItemBaseProps = {
  icon?: ReactNode;
};

export type MenuItemButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MenuItemBaseProps;

export type MenuItemLinkProps = LinkProps & MenuItemBaseProps;

const menuItem = cva(
  "group flex w-full gap-2 rounded-md p-2 text-left text-sm transition hover:bg-sky-500 hover:text-white dark:hover:bg-gray-700",
  {
    defaultVariants: {
      active: true,
    },
    variants: {
      active: {
        true: "bg-sky-500 text-white dark:bg-gray-700",
      },
    },
  }
);

export const MenuItemButton = ({
  children,
  className,
  icon,
  ...props
}: MenuItemButtonProps) => (
  <Menu.Item as={Fragment}>
    {({ active }) => (
      <button className={menuItem({ active, className })} {...props}>
        <span
          className={cx(
            "block transition",
            active ? "text-white" : "text-sky-500 dark:text-gray-500"
          )}
        >
          {icon}
        </span>
        <span className="block">{children}</span>
      </button>
    )}
  </Menu.Item>
);

export const MenuItemLink = ({
  children,
  className,
  icon,
  ...props
}: MenuItemLinkProps) => (
  <Menu.Item as={Fragment}>
    {({ active }) => (
      <Link className={menuItem({ active, className })} {...props}>
        <span
          className={cx(
            "block transition",
            active ? "text-white" : "text-sky-500 dark:text-gray-500"
          )}
        >
          {icon}
        </span>
        <span className="block">{children}</span>
      </Link>
    )}
  </Menu.Item>
);
