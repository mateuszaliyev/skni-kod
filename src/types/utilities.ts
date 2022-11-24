export type Expand<T> = T extends Primitive ? T : { [K in keyof T]: T[K] };

export type Merge<T, U> = Expand<Omit<T, keyof U> & U>;

export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;
