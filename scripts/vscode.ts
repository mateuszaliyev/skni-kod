import { randomBytes } from "crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "fs/promises";

import { format, type Options, resolveConfig } from "prettier";
import { z } from "zod";

const cssCustomData = {
  atDirectives: [
    {
      description:
        "Use `@apply` to inline any existing utility classes into your own custom CSS. This is useful when you need to write custom CSS (like to override the styles in a third-party library) but still want to work with your design tokens and use the same syntax you're used to using in your HTML.",
      name: "@apply",
      references: [
        {
          name: "Tailwind Documentation",
          url: "https://tailwindcss.com/docs/functions-and-directives#apply",
        },
      ],
    },
    {
      description:
        'Use the `@layer` directive to tell Tailwind which "bucket" a set of custom styles belong to. Valid layers are `base`, `components`, and `utilities`.',
      name: "@layer",
      references: [
        {
          name: "Tailwind Documentation",
          url: "https://tailwindcss.com/docs/functions-and-directives#responsive",
        },
      ],
    },
    {
      description:
        "Use the `@tailwind` directive to insert Tailwind's `base`, `components`, `utilities` and `variants` styles into your CSS.",
      name: "@tailwind",
      references: [
        {
          name: "Tailwind Documentation",
          url: "https://tailwindcss.com/docs/functions-and-directives#tailwind",
        },
      ],
    },
  ],
  version: 1.1,
};

const cssCustomDataSchema = z.object({
  "css.customData": z.string().array(),
});

/**
 * Formats JSON.
 */
const formatJson = (value: string, prettierConfiguration?: Options) =>
  format(value, { ...prettierConfiguration, parser: "json" });

/**
 * Checks whether the object has `css.customData` property with a string array value.
 */
const hasCssCustomData = <Settings extends Record<string, unknown>>(
  settings: Settings
): settings is Settings & {
  "css.customData": string[];
} => cssCustomDataSchema.safeParse(settings).success;

/**
 * Converts JavaScript object or array to JSON and formats it.
 */
const toFormattedJson = (
  value: Record<string, unknown> | unknown[],
  prettierConfiguration?: Options
) => formatJson(JSON.stringify(value), prettierConfiguration);

/**
 * Writes JavaScript object or array to a formatted JSON file.
 */
const writeFormattedJsonFile = (
  file: Parameters<typeof writeFile>[0],
  data: Record<string, unknown> | unknown[],
  prettierConfiguration?: Options
) => writeJsonFile(file, toFormattedJson(data, prettierConfiguration));

/**
 * Writes JavaScript object or array to a JSON file.
 */
const writeJsonFile = (
  file: Parameters<typeof writeFile>[0],
  data: Parameters<typeof writeFile>[1]
) =>
  writeFile(file, data, {
    encoding: "utf-8",
  });

/**
 * Generates `.vscode` configuration files for this project.
 */
const generateVsCodeConfiguration = async () => {
  let cssCustomDataFileName = "css-custom-data.json";
  const settingsFileName = "settings.json";

  try {
    const rootPath = new URL("../", import.meta.url);
    const vsCodePath = new URL("./.vscode/", rootPath);

    let cssCustomDataPath = new URL(`./${cssCustomDataFileName}`, vsCodePath);
    const settingsPath = new URL(`./${settingsFileName}`, vsCodePath);

    const rootDirectory = await readdir(rootPath);

    /**
     * Create `.vscode` directory if it doesn't already exist.
     */
    if (!rootDirectory.includes(".vscode")) {
      await mkdir(vsCodePath);
    }

    /**
     * Make sure `.vscode` is a directory.
     */
    if (!(await stat(vsCodePath)).isDirectory()) {
      console.error(`${vsCodePath.href} is not a directory.`);
      return;
    }

    const vsCodeDirectory = await readdir(vsCodePath);

    const prettierConfiguration =
      (await resolveConfig(rootPath.href)) ?? undefined;

    const formattedCssCustomData = toFormattedJson(
      cssCustomData,
      prettierConfiguration
    );

    /**
     * Check if `.vscode` directory already includes `css-custom-data.json`
     * file.
     */
    if (vsCodeDirectory.includes(cssCustomDataFileName)) {
      const cssCustomDataFile = await readFile(cssCustomDataPath, {
        encoding: "utf-8",
      });

      /**
       * Create a new file, if existing `css-custom-data.json` file has
       * different contents.
       */
      if (
        formatJson(cssCustomDataFile, prettierConfiguration) !==
        formattedCssCustomData
      ) {
        /**
         * Generate a new, unique name for a file.
         */
        while (vsCodeDirectory.includes(cssCustomDataFileName)) {
          cssCustomDataFileName = `css-custom-data-${randomBytes(4).toString(
            "hex"
          )}.json`;
        }

        cssCustomDataPath = new URL(`./${cssCustomDataFileName}`, vsCodePath);

        await writeJsonFile(cssCustomDataPath, formattedCssCustomData);
      }
    } else {
      await writeJsonFile(cssCustomDataPath, formattedCssCustomData);
    }

    cssCustomDataPath = new URL(`./${cssCustomDataFileName}`, vsCodePath);

    const settingsCssCustomDataPath = `.vscode/${cssCustomDataFileName}`;

    /**
     * Create `settings.json` if it doesn't already exist and return early.
     */
    if (!vsCodeDirectory.includes(settingsFileName)) {
      await writeFormattedJsonFile(
        settingsPath,
        {
          "css.customData": [settingsCssCustomDataPath],
        },
        prettierConfiguration
      );

      return;
    }

    /**
     * Make sure `settings.json` is a file.
     */
    if (!(await stat(settingsPath)).isFile()) {
      console.error(`${settingsPath.href} is not a file.`);
      return;
    }

    const settingsFile = await readFile(settingsPath, {
      encoding: "utf-8",
    });

    const settingsObject = JSON.parse(settingsFile) as Record<string, unknown>;

    if (!hasCssCustomData(settingsObject)) {
      /**
       * If `settings` object doesn't already include valid `css.customData`
       * property, create it with a correct value.
       */
      settingsObject["css.customData"] = [settingsCssCustomDataPath];
    } else if (
      !settingsObject["css.customData"].includes(settingsCssCustomDataPath)
    ) {
      /**
       * Likewise, if `settings` object already includes `css.customData`
       * property, append correct path to the array.
       */
      settingsObject["css.customData"].push(settingsCssCustomDataPath);
    } else {
      /**
       * Otherwise return early, since correct path already exists in the file.
       */
      return;
    }

    await writeFormattedJsonFile(
      settingsPath,
      settingsObject,
      prettierConfiguration
    );
  } catch (error: unknown) {
    console.error(error);
  }
};

void generateVsCodeConfiguration();
