export type NullToUndefined<T> = T extends null
  ? Exclude<T, null> | undefined
  : T extends Record<number | string | symbol, unknown>
  ? {
      [Property in keyof T]: NullToUndefined<T[Property]>;
    }
  : T extends (infer U)[]
  ? NullToUndefined<U>[]
  : T;

export const isPlainObject = (
  value: unknown
): value is Record<number | string | symbol, unknown> => {
  if (typeof value !== "object" || value === null) return false;

  const prototype = Object.getPrototypeOf(value) as unknown;

  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
};

export const nullToUndefined = <T>(value: T): NullToUndefined<T> => {
  if (value === null) return undefined as NullToUndefined<T>;

  if (isPlainObject(value))
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, nullToUndefined(value)])
    ) as NullToUndefined<T>;

  if (Array.isArray(value))
    return value.map((item) =>
      nullToUndefined(item as unknown)
    ) as NullToUndefined<T>;

  return value as NullToUndefined<T>;
};
