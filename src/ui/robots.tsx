import Head from "next/head";

/**
 * @see {@link https://developers.google.com/search/docs/advanced/robots/robots_meta_tag?hl=en-GB#directives Valid indexing and serving directives}
 */
export type RobotsDirectives<
  NoIndex extends boolean | undefined = undefined,
  NoSnippet extends boolean | undefined = undefined
> = {
  /**
   * Search engines are allowed to index the content of a page if it's embedded
   * in another page through `iframes` or similar HTML tags, in spite of a
   * `noindex` directive. `indexifembedded` only has an effect if it's
   * accompanied by `noindex`.
   */
  indexIfEmbedded?: NoIndex extends true ? boolean : false;
  /**
   * Set the maximum size of an image preview for this page in a search
   * results.
   *
   * If you don't specify the `max-image-preview` directive, search
   * engines may show an image preview of the default size.
   *
   * Accepted values:
   * - `none`: No image preview is to be shown.
   * - `standard`: A default image preview may be shown.
   * - `large`: A larger image preview, up to the width of the viewport, may be
   *   shown.
   *
   * This applies to all forms of search results (such as Google web search,
   * Google Images, Discover, Assistant). However, this limit does not apply in
   * cases where a publisher has separately granted permission for use of
   * content. For instance, if the publisher supplies content in the form of
   * in-page structured data (such as AMP and canonical versions of an article)
   * or has a license agreement with Google, this setting will not interrupt
   * those more specific permitted uses.
   *
   * If you don't want Google to use larger thumbnail images when their AMP
   * pages and canonical version of an article are shown in Search or Discover,
   * specify a `max-image-preview` value of `standard` or `none`.
   */
  maxImagePreview?: "large" | "none" | "standard";
  /**
   * Use a maximum of `[number]` characters as a textual snippet for this
   * search result (Note that a URL may appear as multiple search results
   * within a search results page). This does not affect image or video
   * previews. This applies to all forms of search results (such as Google web
   * search, Google Images, Discover, Assistant). However, this limit does not
   * apply in cases where a publisher has separately granted permission for use
   * of content. For instance, if the publisher supplies content in the form of
   * in-page structured data or has a license agreement with Google, this
   * setting does not interrupt those more specific permitted uses. This
   * directive is ignored if no parseable `[number]` is specified.
   *
   * If you don't specify this directive, search engines will choose the length
   * of the snippet.
   *
   * Special values:
   * - `0`: No snippet is to be shown. Equivalent to `nosnippet`.
   * - `-1`: Search engines will choose the snippet length that they believe is
   *   most effective to help users discover your content and direct users to
   *   your site.
   */
  maxSnippet?: NoSnippet extends true ? 0 : Omit<number, 0>;
  /**
   * Use a maximum of `[number]` seconds as a video snippet for videos on this
   * page in search results.
   *
   * If you don't specify the `max-video-preview` directive, search engines may
   * show a video snippet in search results, and you leave it up to search
   * engines to decide how long the preview may be.
   *
   * Special values:
   * - `0`: At most, a static image may be used, in accordance to the
   *   `max-image-preview` setting.
   * - `-1`: There is no limit.
   *
   * This applies to all forms of search results (at Google: web search, Google
   * Images, Google Videos, Discover, Assistant). This directive is ignored if
   * no parseable `[number]` is specified.
   */
  maxVideoPreview?: number;
  /**
   * Do not show a {@link https://support.google.com/websearch/answer/1687222 cached link}
   * in search results. If you don't specify this directive, search engines may
   * generate a cached page and users may access it through the search results.
   */
  noArchive?: boolean;
  /**
   * Do not follow the links on this page. If you don't specify this directive,
   * search engines may use the links on the page to discover those linked
   * pages.
   *
   * @see {@link https://developers.google.com/search/docs/advanced/guidelines/qualify-outbound-links Learn More}
   */
  noFollow?: boolean;
  /**
   * Do not index images on this page. If you don't specify this value, images
   * on the page may be indexed and shown in search results.
   */
  noImageIndex?: boolean;
  /**
   * Do not show this page, media, or resource in search results. If you don't
   * specify this directive, the page, media, or resource may be indexed and
   * shown in search results.
   */
  noIndex?: NoIndex;
  /**
   * Do not show a {@link https://developers.google.com/search/docs/advanced/structured-data/sitelinks-searchbox sitelinks search box}
   * in the search results for this page. If you don't specify this directive,
   * search engines may generate a search box specific to your site in search
   * results, along with other direct links to your site.
   */
  noSiteLinksSearchBox?: boolean;
  /**
   * Do not show a text snippet or video preview in the search results for this
   * page. A static image thumbnail (if available) may still be visible, when
   * it results in a better user experience. This applies to all forms of
   * search results (at Google: web search, Google Images, Discover).
   *
   * If you don't specify this directive, search engines may generate a text
   * snippet and video preview based on information found on the page.
   */
  noSnippet?: NoSnippet;
  /**
   * Don't offer translation of this page in search results. If you don't
   * specify this directive, search engines may provide a
   * {@link https://developers.google.com/search/docs/advanced/appearance/translated-results translation of the title link and snippet}
   * of a search result for results that aren't in the language of the search
   * query. If the user clicks the translated title link, all further user
   * interaction with the page is through Google Translate, which will
   * automatically translate any links followed.
   */
  noTranslate?: boolean;
  /**
   * Do not show this page in search results after the specified date/time. The
   * date/time must be specified in a widely adopted format including, but not
   * limited to {@link http://www.ietf.org/rfc/rfc0822.txt RFC 822},
   * {@link http://www.ietf.org/rfc/rfc0850.txt RFC 850}, and
   * {@link https://www.iso.org/iso-8601-date-and-time-format.html ISO 8601}.
   * The directive is ignored if no valid date/time is specified. By default
   * there is no expiration date for content.
   *
   * If you don't specify this directive, this page may be shown in search
   * results indefinitely.
   */
  unavailableAfter?: Date;
};

export const Robots = <
  NoIndex extends boolean | undefined = undefined,
  NoSnippet extends boolean | undefined = undefined
>({
  indexIfEmbedded,
  maxImagePreview,
  maxSnippet,
  maxVideoPreview,
  noArchive,
  noFollow,
  noImageIndex,
  noIndex,
  noSiteLinksSearchBox,
  noSnippet,
  noTranslate,
  unavailableAfter,
}: RobotsDirectives<NoIndex, NoSnippet>) => {
  const content = [
    indexIfEmbedded && noIndex && "indexifembedded",
    maxImagePreview && `max-image-preview:${maxImagePreview}`,
    maxSnippet && !noSnippet && `max-snippet:${maxSnippet as number}`,
    maxVideoPreview && `max-video-preview:${maxVideoPreview}`,
    noArchive && "noarchive",
    noFollow && noIndex
      ? "none"
      : `${noFollow ? "nofollow" : "follow"},${noIndex ? "noindex" : "index"}`,
    noImageIndex && "noimageindex",
    noSiteLinksSearchBox && "nositelinkssearchboxx",
    (noSnippet || maxSnippet === 0) && "nosnippet",
    noTranslate && "notranslate",
    unavailableAfter &&
      `unavailable_after:${
        unavailableAfter.toISOString().split("T")[0] as string
      }`,
  ]
    .filter((value) => Boolean(value))
    .join(",");

  return (
    <Head>
      <meta content={content} name="robots" />
    </Head>
  );
};
