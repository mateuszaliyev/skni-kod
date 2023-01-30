export const getImage = (
  url?: string
): Promise<{ height: number; url: string; width: number } | undefined> =>
  new Promise((resolve) => {
    if (!url) return resolve(undefined);

    const image = new Image();

    image.onerror = () => resolve(undefined);
    image.onload = () =>
      resolve({
        height: image.height,
        url,
        width: image.width,
      });
    image.src = url;
  });
