/**
 * Infers keys of an object.
 *
 * @template Value Type of values of an object.
 * @returns Function that creates an object with inferred type of keys and specified type of values.
 */
export const withInferredKeys =
  <Value>() =>
  <Type>(object: { [Key in keyof Type]: Value }) =>
    object;
