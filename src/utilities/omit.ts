export const omit = <
  T extends Record<number | string | symbol, unknown>,
  P extends keyof T
>(
  object: T,
  properties: readonly P[]
): Omit<T, P> => {
  const result = { ...object };

  properties.forEach((property) => delete result[property]);

  return result;
};
