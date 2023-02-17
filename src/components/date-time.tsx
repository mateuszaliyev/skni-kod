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
  const dateTime =
    typeof date === "number" || typeof date === "string"
      ? new Date(date)
      : date;

  const dateTimeFormat = new Intl.DateTimeFormat(
    POLISH_LOCALE_IDENTIFIER,
    options
  );

  return (
    <dl className={className} {...props}>
      <dt className="sr-only inline">Data</dt>
      <dd className="inline">
        <time dateTime={dateTime ? dateTime.toISOString() : undefined}>
          {dateTimeFormat.format(date)}
        </time>
      </dd>
    </dl>
  );
};
