export const camelToSnake = (text: string): string =>
  text.replaceAll(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
