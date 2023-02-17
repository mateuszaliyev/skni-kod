import { toKebabCase } from "@/utilities/kebab-case";

const removePolishDiacritics = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("Ł", "L")
    .replaceAll("ł", "l");

export const toSlug = (text: string) =>
  toKebabCase(removePolishDiacritics(text.toLocaleLowerCase()));
