/* eslint-disable @typescript-eslint/ban-types */

import type {
  ComponentPropsWithRef,
  ElementType,
  ForwardRefExoticComponent,
  ReactElement,
} from "react";

type Merge<T = {}, U = {}> = Omit<T, keyof U> & U;

type MergeProps<Element, Props = {}> = Props &
  Merge<
    Element extends ElementType ? ComponentPropsWithRef<Element> : never,
    Props
  >;

/**
 * @see {@link https://github.com/radix-ui/primitives/blob/fdb9c368fca915f2003a888b1bf9ad2270d6b415/packages/react/polymorphic/src/forwardRefWithAs.ts Radix UI Polymorphic Utility}
 */
export interface ForwardRefComponent<IntrinsicElementString, OwnProps = {}>
  extends ForwardRefExoticComponent<
    MergeProps<
      IntrinsicElementString,
      OwnProps & { as?: IntrinsicElementString }
    >
  > {
  <As extends keyof JSX.IntrinsicElements>(
    props: MergeProps<As, OwnProps & { as: As }>
  ): ReactElement | null;
  <
    As extends ElementType,
    _AsWithProps = As extends ElementType<infer P> ? ElementType<P> : never
  >(
    props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>
  ): ReactElement | null;
}
