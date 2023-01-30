import type { HTMLAttributes } from "react";

import { POLISH_LOCALE_IDENTIFIER } from "@/constants/strings";

export type DateTimeProps = Omit<
  HTMLAttributes<HTMLDListElement>,
  "children"
> & {
  date: Parameters<Intl.DateTimeFormat["format"]>[0];
  options?: Intl.DateTimeFormatOptions;
};

export const DateTime = ({
  className,
  date,
  options,
  ...props
}: DateTimeProps) => {
  const dateTimeFormat = new Intl.DateTimeFormat(
    POLISH_LOCALE_IDENTIFIER,
    options
  );

  return (
    <dl className={className} {...props}>
      <dt className="sr-only inline">Data</dt>
      <dd className="inline">
        <time>{dateTimeFormat.format(date)}</time>
      </dd>
    </dl>
  );
};
