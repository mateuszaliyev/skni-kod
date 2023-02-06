import { useCallback, useState } from "react";
import {
  type Control,
  type UseFormClearErrors,
  type UseFormSetError,
  type UseFormTrigger,
  useWatch,
  useFormState,
} from "react-hook-form";

import type { Image } from "@prisma/client";

import { api } from "@/api";

import { useDebounce } from "@/hooks/debounce";

import type { PostFormSchema } from "@/schemas/post";

import { getImage } from "@/utilities/image";
import { toSlug } from "@/utilities/slug";

export type UsePostFormImageParameters = {
  clearErrors: UseFormClearErrors<PostFormSchema>;
  control: Control<PostFormSchema>;
  setError: UseFormSetError<PostFormSchema>;
};

export type UsePostFormSlugParameters = {
  clearErrors: UseFormClearErrors<PostFormSchema>;
  control: Control<PostFormSchema>;
  oldSlug?: string;
  setError: UseFormSetError<PostFormSchema>;
  trigger: UseFormTrigger<PostFormSchema>;
};

export type UsePostFormSourceParameters = {
  control: Control<PostFormSchema>;
  preview: boolean;
};

export const usePostFormImage = ({
  clearErrors,
  control,
  setError,
}: UsePostFormImageParameters) => {
  const [imageMetadata, setImageMetadata] = useState<
    Pick<Image, "height" | "url" | "width"> | undefined
  >();

  const image = useWatch({ control, name: "image" });

  const handleImageChange = useCallback(
    async (url?: string) => {
      const image = await getImage(url);
      clearErrors("image");
      setImageMetadata(image);

      if (url !== "" && !image) {
        setError("image", {
          message: "Obraz o podanym adresie URL jest niedostępny.",
          type: "custom",
        });
      }
    },
    [clearErrors, setError]
  );

  useDebounce(
    () => {
      if (image) void handleImageChange(image);
    },
    2000,
    [image, handleImageChange]
  );

  return { handleImageChange, image: imageMetadata };
};

export const usePostFormSlug = ({
  clearErrors,
  control,
  oldSlug = "",
  setError,
  trigger,
}: UsePostFormSlugParameters) => {
  const { errors } = useFormState({ control });
  const [slug, title = ""] = useWatch({ control, name: ["slug", "title"] });

  const {
    data: slugTaken,
    isLoading: slugChecking,
    refetch: checkSlugAvailability,
  } = api.post.find.slug.useQuery(
    { slug },
    {
      enabled: false,
      onSettled: (slugTaken) => {
        if (slugTaken) {
          return setError("slug", {
            message: "Podany slug jest już zajęty.",
            type: "custom",
          });
        }

        clearErrors("slug");

        if (slug) void trigger("slug");
      },
      retry: false,
    }
  );

  const derivedFromTitle = slug === toSlug(title);
  const slugChanged = slug !== oldSlug;
  const slugError = Boolean(
    errors.slug || (slugChanged && !slugChecking && slugTaken)
  );

  useDebounce(
    () => {
      if (slug && slugChanged) void checkSlugAvailability();
    },
    2000,
    [checkSlugAvailability, slug, slugChanged]
  );

  return {
    derivedFromTitle,
    slugChecking,
    slugError,
  };
};

export const usePostFormSource = ({
  control,
  preview,
}: UsePostFormSourceParameters) => {
  const body = useWatch({ control, name: "body" });

  const { data: source, mutate: updateSource } =
    api.post.serialize.useMutation();

  useDebounce(
    () => {
      if (body && !preview) updateSource({ body });
    },
    2000,
    [body, preview, updateSource]
  );

  return { source, updateSource };
};
