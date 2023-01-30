/* eslint-disable @next/next/no-img-element */

import type { NextApiHandler } from "next";

import { ImageResponse, type ImageResponseOptions } from "@vercel/og";

import { IsometricPrismSvg } from "@/components/isometric-prism";

import { BASE_URL } from "@/environment";

import { colorFromText, getHexColorBrightness } from "@/utilities/color";

export const config = {
  runtime: "edge",
};

type Font = Exclude<ImageResponseOptions["fonts"], undefined>[number];

const getFont = async ({
  url,
  ...font
}: Omit<Font, "data"> & { url: string }): Promise<Font> => {
  const response = await fetch(url);

  return {
    ...font,
    data: await response.arrayBuffer(),
  };
};

const postImageHandler: NextApiHandler = async (request) => {
  const urlSearchParams = new URLSearchParams(request.url?.split("?")[1] ?? "");

  const authorImage = urlSearchParams.getAll("authorImage");
  const authorName = urlSearchParams.getAll("authorName");

  const authors: { image?: string; name: string }[] = [];
  const title = urlSearchParams.get("title") ?? "";

  authorName.forEach((name, index) => {
    authors.push({
      image: authorImage[index] === "none" ? undefined : authorImage[index],
      name,
    });
  });

  const fonts: Font[] = [];

  (
    await Promise.allSettled([
      getFont({
        name: "Lato",
        style: "normal",
        url: `${BASE_URL}/assets/fonts/lato/lato-bold.ttf`,
        weight: 700,
      }),
      getFont({
        name: "Lato",
        style: "normal",
        url: `${BASE_URL}/assets/fonts/lato/lato-light.ttf`,
        weight: 300,
      }),
      getFont({
        name: "Lato",
        style: "normal",
        url: `${BASE_URL}/assets/fonts/lato/lato-regular.ttf`,
        weight: 400,
      }),
    ])
  ).forEach((result) => {
    if (result.status === "fulfilled") {
      fonts.push(result.value);
    }
  });

  const height = 1200;
  const shouldDisplayAvatars = authors.length <= 3;
  const size = 160;
  const width = 2400;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            'Lato, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          height: "100%",
          paddingBottom: 48,
          paddingLeft: 96,
          paddingRight: 96,
          paddingTop: 48,
          width: "100%",
        }}
      >
        <IsometricPrismSvg
          background="hsl(210 16% 95%)"
          height={height}
          size={size}
          width={width}
        />
        <img
          alt="SKNI KOD Logo"
          height={416 * 0.5}
          src="http://localhost:3000/assets/images/logo/logomark-color.png"
          width={457 * 0.5}
        />
        <div
          style={{
            color: "#054163",
            fontSize: title.length >= 128 ? 96 : title.length >= 64 ? 128 : 144,
            fontWeight: 700,
            marginTop: "auto",
            maxWidth: 1600,
          }}
        >
          {title}
        </div>
        <div
          style={{
            background: "linear-gradient(to right, #22d3ee, #0ea5e9, #2563eb)",
            height: 16,
            marginBottom: 48,
            marginTop: 48,
            width: "100%",
          }}
        ></div>
        {authors && authors.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: shouldDisplayAvatars ? "nowrap" : "wrap",
              width: "100%",
            }}
          >
            {authors.map((author, index) =>
              shouldDisplayAvatars ? (
                <div
                  key={index}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    paddingLeft: index > 0 ? 48 : 0,
                    paddingRight: 48,
                  }}
                >
                  {author.image ? (
                    <img
                      alt={author.name}
                      height={128}
                      src={author.image}
                      style={{
                        borderRadius: 9999,
                      }}
                      width={128}
                    />
                  ) : (
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor: colorFromText(author.name),
                        borderRadius: 9999,
                        color:
                          getHexColorBrightness(colorFromText(author.name)) >=
                          160
                            ? "#054163"
                            : "#ffffff",
                        display: "flex",
                        fontSize: 64,
                        fontWeight: 700,
                        height: 128,
                        justifyContent: "center",
                        paddingBottom: 8,
                        width: 128,
                      }}
                    >
                      {author.name[0]}
                    </div>
                  )}
                  <div
                    style={{
                      color: "#054163",
                      fontSize: 48,
                      fontWeight: 700,
                      paddingLeft: 48,
                    }}
                  >
                    {author.name}
                  </div>
                </div>
              ) : (
                <span
                  key={index}
                  style={{
                    color: "#054163",
                    fontSize: 48,
                    fontWeight: 700,
                    paddingRight: 16,
                  }}
                >
                  {author.name}
                  {index < authors.length - 1 && ","}
                </span>
              )
            )}
          </div>
        )}
      </div>
    ),
    {
      fonts,
      height,
      width,
    }
  );
};

export default postImageHandler;
