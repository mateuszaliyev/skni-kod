export type GetPostImageOptions = {
  authors?: {
    image?: string;
    name?: string;
  }[];
  title?: string;
};

export const getPostImage = ({ authors, title }: GetPostImageOptions) => {
  const urlSearchParams = new URLSearchParams();

  if (title) urlSearchParams.append("title", title);

  if (authors) {
    for (const author of authors) {
      if (author.name) {
        urlSearchParams.append("authorName", author.name);
        urlSearchParams.append("authorImage", author.image ?? "none");
      }
    }
  }

  return `/api/image/post?${urlSearchParams.toString()}`;
};
