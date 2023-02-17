import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  Ref,
} from "react";

export type PolymorphicComponent<
  DefaultElement extends ElementType = "div",
  Props = {}
> = <Element extends ElementType = DefaultElement>(
  props: PolymorphicProps<Element, Props>
) => ReactElement | null;

/**
 * Cannot use `ComponentPropsWithRef` on top level.
 */
export type PolymorphicComponentProps<Element extends ElementType = "div"> =
  ComponentPropsWithoutRef<Element> & {
    component?: Element;
    /**
     * `ComponentPropsWithRef` used inside is fine.
     */
    ref?: Ref<ComponentPropsWithRef<Element>["ref"]> | null;
  };

export type PolymorphicProps<
  Element extends ElementType,
  Props = {}
> = PolymorphicComponentProps<Element> & Props;

export type PolymorphicRef<Element extends ElementType = "div"> =
  PolymorphicComponentProps<Element>["ref"];
