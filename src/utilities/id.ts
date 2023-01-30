import { customAlphabet } from "nanoid/async";
import { z } from "zod";

export type GenerateIdOptions = {
  alphabet?: string;
  length?: number;
};

const ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const ID_LENGTH = 12;

const nanoid = customAlphabet(ID_ALPHABET);

export const generateId = async (
  options: GenerateIdOptions = {
    length: ID_LENGTH,
  }
): Promise<string> => {
  if (options.alphabet) {
    const nanoid = customAlphabet(options.alphabet);
    return await nanoid(options.length);
  }

  return await nanoid(options.length);
};

export const idSchema = z.string().regex(new RegExp(`[0-9a-z]{${ID_LENGTH}}`));
