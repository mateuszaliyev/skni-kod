import Head from "next/head";

import { useUrl } from "@/hooks/url";

import type { MimeType } from "@/types";

import { camelToSnake } from "@/utilities/camel-to-snake";

/* Open Graph protocol types. */

export type OpenGraphArticle = {
  article: {
    /**
     * Writers of the article.
     */
    author?: string[];
    /**
     * When the article is out of date after.
     */
    expirationTime?: Date;
    /**
     * When the article was last changed.
     */
    modifiedTime?: Date;
    /**
     * When the article was first published.
     */
    publishedTime?: Date;
    /**
     * A high-level section name. E.g. Technology
     */
    section?: string;
    /**
     * Tag words associated with this article.
     */
    tag?: string[];
  };
};

export type OpenGraphAudio = {
  /**
   * An alternate url to use if the webpage requires HTTPS.
   */
  secureUrl?: string;
  /**
   * A {@link https://en.wikipedia.org/wiki/Internet_media_type MIME type}.
   */
  type?: MimeType;
  /**
   * A URL to accompany this object.
   */
  url: string;
};

export type OpenGraphBook = {
  book: {
    /**
     * Who wrote this book.
     */
    author?: string[];
    /**
     * The {@link https://en.wikipedia.org/wiki/ISBN ISBN}
     */
    isbn?: string;
    /**
     * The date the book was released.
     */
    releaseDate?: Date;
    /**
     * Tag words associated with this book.
     */
    tag?: string[];
    /**
     * The type of your object. Depending on the type you specify, other
     * properties may also be required.
     */
  };
};

export type OpenGraphImageOrVideo = OpenGraphAudio & {
  /**
   * A description of what is in the image or video (not a caption). If the
   * page specifies an image or video it should specify `alt`.
   */
  alt?: string;
  /**
   * The number of pixels high.
   */
  height?: number;
  /**
   * The number of pixels wide.
   */
  width?: number;
};

export type OpenGraphMetadata<ObjectType extends keyof OpenGraphObjectType> =
  OpenGraphObjectType[ObjectType] & {
    og: {
      /**
       * An audio file to accompany this object.
       */
      audio?: OpenGraphAudio[];
      /**
       * A one to two sentence description of your object.
       */
      description?: string;
      /**
       * The word that appears before this object's title in a sentence.
       *
       * Accepted values:
       * - `""`
       * - `"a"`
       * - `"an"`
       * - `"auto"`
       * - `"the"`
       *
       * If `"auto"` is chosen, the consumer of your data should chose between
       * `"a"` or `"an"`. Default is `""` (blank).
       */
      determiner?: "" | "a" | "an" | "auto" | "the";
      /**
       * An image which should represent your object within the graph.
       */
      image: OpenGraphImageOrVideo[];
      locale?: {
        /**
         * An array of other locales this page is available in.
         */
        alternate?: string[];
        /**
         * The locale these tags are marked up in. Of the format
         * `language_TERRITORY`. Default is `en_US`.
         */
        default: string;
      };
      /**
       * If your object is part of a larger web site, the name which should be
       * displayed for the overall site.
       */
      siteName?: string;
      /**
       * The title of your object as it should appear within the graph.
       */
      title: string;
      /**
       * The type of your object. Depending on the type you specify, other
       * properties may also be required.
       */
      type: ObjectType;
      /**
       * The canonical URL of your object that will be used as its permanent ID in
       * the graph.
       */
      url?: string;
      /**
       * A video file that complements this object.
       */
      video?: OpenGraphImageOrVideo[];
    };
  };

export type OpenGraphMusicAlbum = {
  music: OpenGraphMusician &
    OpenGraphSong & {
      /**
       * The date the album was released.
       */
      releaseDate?: Date;
    };
};

export type OpenGraphMusician = {
  /**
   * The musician that made this song.
   */
  musician?: string[];
};

export type OpenGraphMusicSong = {
  music: OpenGraphMusician & {
    /**
     * The album this song is from.
     */
    album?: {
      /**
       * Which disc of the album this song is on.
       */
      disc?: number;
      /**
       * Which track this song is.
       */
      track?: number;
      /**
       * The album this song is from.
       */
      url: string;
    }[];
    /**
     * The song's length in seconds.
     */
    duration?: number;
  };
};

export type OpenGraphMusicPlaylist = {
  music: OpenGraphSong & {
    /**
     * The creator of this playlist.
     */
    creator?: string;
  };
};

export type OpenGraphObjectType = {
  article: OpenGraphArticle;
  book: OpenGraphBook;
  "music.album": OpenGraphMusicAlbum;
  "music.playlist": OpenGraphMusicPlaylist;
  "music.radio_station": OpenGraphMusicRadioStation;
  "music.song": OpenGraphMusicSong;
  profile: OpenGraphProfile;
  "video.episode": OpenGraphVideoEpisode;
  "video.movie": OpenGraphVideoMovie;
  "video.other": OpenGraphVideoOther;
  "video.tv_show": OpenGraphVideoTvShow;
  website: OpenGraphWebsite;
};

export type OpenGraphProfile = {
  profile: {
    /**
     * A name normally given to an individual by a parent or self-chosen.
     */
    firstName?: string;
    /**
     * Their gender.
     */
    gender?: "female" | "male";
    /**
     * A name inherited from a family or marriage and by which the individual is
     * commonly known.
     */
    lastName?: string;
    /**
     * A short unique string to identify them.
     */
    username?: string;
  };
};

export type OpenGraphMusicRadioStation = {
  music: {
    /**
     * The creator of this station.
     */
    creator?: string;
  };
};

export type OpenGraphSong = {
  /**
   * The song on this album or playlist.
   */
  song?: {
    /**
     * Which disc of the album or playlist this song is on.
     */
    disc?: number;
    /**
     * Which track this song is.
     */
    track?: number;
    /**
     * The song on this album or playlist.
     */
    url?: string;
  }[];
};

export type OpenGraphVideo = {
  /**
   * Actors in the movie.
   */
  actor?: {
    /**
     * The role they played.
     */
    role?: string;
    /**
     * Actors in the movie.
     */
    url?: string;
  }[];
  /**
   * Directors of the movie.
   */
  director?: string[];
  /**
   * The movie's length in seconds.
   */
  duration?: number;
  /**
   * The date the movie was released.
   */
  releaseDate?: Date;
  /**
   * Tag words associated with this movie.
   */
  tag?: string[];
  /**
   * Writers of the movie.
   */
  writer?: string[];
};

export type OpenGraphVideoEpisode = {
  video: OpenGraphVideo & {
    /**
     * Which series this episode belongs to.
     */
    series?: string;
  };
};

export type OpenGraphVideoMovie = {
  video: OpenGraphVideo;
};

export type OpenGraphVideoOther = {
  video: OpenGraphVideo;
};

export type OpenGraphVideoTvShow = {
  video: OpenGraphVideo;
};

export type OpenGraphWebsite = {};

/* Component types. */

export type OpenGraphMetaTagAttributes = {
  content: string;
  property: string;
};

export type OpenGraphProps<ObjectType extends keyof OpenGraphObjectType> =
  OpenGraphMetadata<ObjectType>;

type OpenGraphPropsObject = {
  key: string;
  value: OpenGraphPropsObjectValue;
};

type OpenGraphPropsObjectValue =
  | Date
  | number
  | string
  | undefined
  | OpenGraphPropsObjectValue[]
  | { [key: string]: OpenGraphPropsObjectValue };

const defaultProperties = ["default", "url"];

export const getOpenGraphMetaTagAttributes = ({
  key,
  value,
}: OpenGraphPropsObject): OpenGraphMetaTagAttributes[] => {
  const attributes: OpenGraphMetaTagAttributes[] = [];
  const queue: OpenGraphPropsObject[] = [
    {
      key,
      value,
    },
  ];

  while (queue.length) {
    const { key, value } = queue.shift() as OpenGraphPropsObject;

    if (!value) {
      continue;
    }

    if (value instanceof Date) {
      attributes.push({
        content: value.toISOString(),
        property: camelToSnake(key),
      });

      continue;
    }

    if (typeof value === "number" || typeof value === "string") {
      attributes.push({
        content: value.toString(),
        property: camelToSnake(key),
      });

      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queue.push({
          key,
          value: item,
        });
      });

      continue;
    }

    Object.entries(value)
      /**
       * Put default properties at the front, then sort alphabetically.
       */
      .sort(([key1], [key2]) => {
        if (key1 === key2) {
          return 0;
        }

        if (defaultProperties.includes(key1)) {
          return -1;
        }

        if (defaultProperties.includes(key2)) {
          return 1;
        }

        return key1 < key2 ? -1 : 1;
      })
      .forEach(([nestedKey, nestedValue]) => {
        queue.push({
          key:
            defaultProperties.includes(nestedKey) && key !== "og"
              ? key
              : `${key}:${nestedKey}`,
          value: nestedValue,
        });
      });
  }

  return attributes;
};

export const OpenGraph = <ObjectType extends keyof OpenGraphObjectType>(
  props: OpenGraphProps<ObjectType>
) => {
  const url = useUrl();

  const metadata = {
    ...props,
    og: {
      ...props.og,
      url: props.og.url ?? url,
    },
  };

  const tags: { content: string; property: string }[] = Object.entries(
    metadata
  ).reduce((result, [key, value]) => {
    if (value) {
      result.push(
        ...getOpenGraphMetaTagAttributes({
          key,
          value: value as OpenGraphPropsObjectValue,
        })
      );
    }
    return result;
  }, [] as OpenGraphMetaTagAttributes[]);

  return (
    <Head>
      {tags.map(({ content, property }, index) => (
        <meta content={content} key={index} property={property} />
      ))}
    </Head>
  );
};
