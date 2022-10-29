export type FromModel<Model> = Model extends Record<string, unknown>
  ? {
      [Property in keyof Model as Property extends "publicId"
        ? "id"
        : Property]: Property extends "id" ? never : FromModel<Model[Property]>;
    }
  : Model extends (infer Item)[]
  ? FromModel<Item>[]
  : Model;

/**
 * Recursively converts all `publicId` properties into `id`.
 */
export const fromModel = <Model>(model: Model): FromModel<Model> => {
  if (Array.isArray(model)) {
    return model.map((item: unknown) => fromModel(item)) as FromModel<Model>;
  }

  if (model && typeof model === "object") {
    const entries: [string, unknown][] = [];

    for (const [key, value] of Object.entries(model)) {
      if (key === "id") {
        continue;
      }

      if (key === "publicId") {
        entries.push(["id", value]);
        continue;
      }

      entries.push([key, fromModel(value)]);
    }

    return Object.fromEntries(entries) as FromModel<Model>;
  }

  return model as FromModel<Model>;
};
