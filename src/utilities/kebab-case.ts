export const toKebabCase = (text: string) =>
  text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((match) => match.toLowerCase())
    ?.join("-") ?? text;
