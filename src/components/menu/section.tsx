import type { ReactNode } from "react";

export type MenuSectionProps = {
  children: ReactNode;
  title?: string;
};

export const MenuSection = ({ children, title }: MenuSectionProps) => (
  <>
    <hr
      aria-orientation="horizontal"
      className="my-1 h-px w-full border-none bg-gray-200 first:hidden dark:bg-gray-700"
    />
    {title && (
      <span aria-hidden="true" className="px-3 text-xs font-bold text-gray-500">
        {title}
      </span>
    )}
    {children}
  </>
);
