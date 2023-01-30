import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Image } from "@prisma/client";

import { api } from "@/api";

import { useDebounce } from "@/hooks/debounce";

import { type PostFormSchema, postFormSchema } from "@/schemas/post";

import { getImage } from "@/utilities/image";

export type UsePostFormParameters = {
  defaultValues?: Partial<PostFormSchema>;
  onSubmit?: (data: PostFormSchema) => void;
  slug?: string;
};

export type UsePostFormReturnType = ReturnType<typeof usePostForm>;

export const usePostForm = ({
  defaultValues,
  onSubmit,
  slug: urlSlug,
}: UsePostFormParameters) => {
  const [image, setImage] = useState<
    Pick<Image, "height" | "url" | "width"> | undefined
  >();
  const [slugChanging, setSlugChanging] = useState(false);

  const { data: users } = api.user.find.all.useQuery();

  const {
    clearErrors,
    control,
    formState: { defaultValues: useFormDefaultValues, dirtyFields, errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<PostFormSchema>({
    defaultValues,
    delayError: 1000,
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
  });

  const body = watch("body");
  const slug = watch("slug");
  const title = watch("title");

  const previewAvailable = Boolean(body && title);

  const slugChanged = slug !== urlSlug;

  const { data: slugAvailable } = api.post.checkSlugAvailability.useQuery(
    { slug },
    {
      enabled: Boolean(slug) && slugChanged && !slugChanging,
      retry: false,
    }
  );

  const slugMessage =
    slugAvailable || !slugChanged
      ? "Podany slug jest dostępny."
      : errors.slug?.message;

  const handleImageChange = async (url?: string) => {
    const image = await getImage(url);
    clearErrors("image");
    setImage(image);

    if (url !== "" && !image) {
      setError("image", {
        message: "Obraz o podanym adresie URL jest niedostępny.",
        type: "custom",
      });
    }
  };

  const onSubmitInternal = (data: PostFormSchema) => {
    onSubmit?.(data);
    reset();
  };

  useDebounce(
    () => {
      void handleImageChange(getValues().image);
    },
    2000,
    []
  );

  useDebounce(
    () => {
      setSlugChanging(false);
    },
    2000,
    [slug]
  );

  useEffect(() => {
    if (slugAvailable === false) {
      return setError("slug", {
        message: "Podany slug jest już zajęty.",
        type: "custom",
      });
    }

    clearErrors("slug");

    if (getValues().slug) void trigger("slug");
  }, [clearErrors, getValues, setError, slugAvailable, trigger]);

  useEffect(() => {
    if (!useFormDefaultValues || !Object.keys(useFormDefaultValues).length) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, useFormDefaultValues]);

  return {
    control,
    dirtyFields,
    errors,
    getValues,
    handleImageChange,
    handleSubmit,
    image,
    isReady: useFormDefaultValues && Object.keys(useFormDefaultValues).length,
    onSubmit: onSubmitInternal,
    previewAvailable,
    register,
    setSlugChanging,
    setValue,
    slugAvailable,
    slugChanged,
    slugMessage,
    title,
    trigger,
    users,
  };
};
