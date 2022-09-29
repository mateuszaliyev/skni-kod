import { customAlphabet } from "nanoid/async";

export type GenerateIdOptions = {
  alphabet?: string;
  length?: number;
};

const lowercaseAlphanumeric = "0123456789abcdefghijklmnopqrstuvwxyz";

const nanoid = customAlphabet(lowercaseAlphanumeric);

export const generateId = async (
  options: GenerateIdOptions = {
    length: 12,
  }
): Promise<string> => {
  if (options.alphabet) {
    const nanoid = customAlphabet(options.alphabet);
    return await nanoid(options.length);
  }

  return await nanoid(options.length);
};
