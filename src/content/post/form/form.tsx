import {
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  MdAnnouncement,
  MdArrowBack,
  MdArticle,
  MdDone,
  MdInfo,
  MdSave,
  MdSpellcheck,
} from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/api";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { ComboBox } from "@/components/combo-box";
import { Checkbox, Input, TextArea } from "@/components/input";
import { Label } from "@/components/label";
import { LayoutIsometricPrism } from "@/components/layout/isometric-prism";
import { Select } from "@/components/select";

import { CATEGORIES } from "@/constants/strings";

import { Post } from "@/content/post";

import { useRouter } from "@/hooks/router";

import {
  POST_CATEGORIES,
  type PostCategory,
  type PostFormSchema,
  postFormSchema,
} from "@/schemas/post";

import { CONTAINER_STYLES, HEADLINE_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";
import { getImage } from "@/utilities/image";
import { toSlug } from "@/utilities/slug";

import { usePostFormImage, usePostFormSlug, usePostFormSource } from "./hooks";
import { PostFormButtons } from "./buttons";

export type PostFormProps = {
  defaultValues?: Partial<PostFormSchema>;
} & (
  | {
      id: string;
      slug: string;
    }
  | {
      id?: undefined;
      slug?: undefined;
    }
);

const POST_CATEGORY_ICONS: Record<PostCategory, ReactNode> = {
  article: <MdArticle className="h-5 w-5" />,
  news: <MdAnnouncement className="h-5 w-5" />,
};

export const PostForm = ({
  defaultValues,
  id,
  slug: oldSlug,
}: PostFormProps) => {
  const [preview, setPreview] = useState(false);

  const {
    clearErrors,
    control,
    formState: { dirtyFields, errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<PostFormSchema>({
    defaultValues,
    delayError: 1000,
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
  });

  const { handleImageChange, image } = usePostFormImage({
    clearErrors,
    control,
    setError,
  });

  const { derivedFromTitle, slugChecking, slugError } = usePostFormSlug({
    clearErrors,
    control,
    oldSlug,
    setError,
    trigger,
  });

  const { source, updateSource } = usePostFormSource({ control, preview });

  const router = useRouter();

  const onSuccess = ({ slug }: { slug: string }) =>
    router.replace(`/blog/${slug}`);

  const { mutate: create } = api.post.create.useMutation({ onSuccess });
  const { mutate: update } = api.post.update.byId.useMutation({ onSuccess });

  const usersQuery = api.user.find.all.useQuery();

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async ({ authors, image, ...post }: PostFormSchema) => {
    if (id && oldSlug) {
      update({
        ...post,
        authors: authors.map(({ id }) => ({ userId: id })),
        id,
        image: await getImage(image),
        oldSlug,
      });
    } else {
      create({
        ...post,
        authors: authors.map(({ id }) => ({ userId: id })),
        image: await getImage(image),
      });
    }
    reset();
  };

  return preview && source ? (
    <>
      <Post
        post={{
          authors: getValues().authors,
          image,
          publishedAt: new Date(getValues().publishedAt),
          slug: getValues().slug,
          title: getValues().title,
        }}
        preview={preview}
        source={source}
      />
      <div className="fixed bottom-4 left-1/2 z-snackbar flex -translate-x-1/2 items-center gap-4 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm backdrop-saturate-180 dark:border-gray-700 dark:bg-black/50">
        <div className="flex items-center gap-4">
          <MdInfo className="h-5 w-5 text-sky-500" />
          <span>Trwa podgląd.</span>
        </div>
        <div
          className="w-px self-stretch bg-gray-200 dark:bg-gray-700"
          role="separator"
        />
        <Button
          icon={<MdArrowBack className="h-5 w-5" />}
          onClick={() => setPreview(false)}
          type="button"
        >
          Powrót
        </Button>
      </div>
    </>
  ) : (
    <LayoutIsometricPrism
      header={
        <h1 className={cx(HEADLINE_STYLES, "py-16")}>
          {id ? "Edytuj" : "Nowy"} post
        </h1>
      }
    >
      <section className={cx(CONTAINER_STYLES, "pt-20")}>
        <form
          className="mx-auto flex max-w-prose flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            error={Boolean(errors.title)}
            label="Tytuł"
            message={errors.title?.message}
          >
            <Input
              invalid={Boolean(errors.title)}
              type="text"
              {...register("title", {
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  const title = event.target.value;
                  if (dirtyFields.slug) return;
                  setValue("slug", toSlug(title));
                  void trigger("slug");
                },
              })}
            />
          </Label>
          <Label
            error={slugError}
            label="Slug"
            message={
              slugError
                ? errors?.slug?.message
                : !slugChecking
                ? "Podany slug jest dostępny"
                : undefined
            }
            messageIcon={
              !slugChecking && !slugError && <MdDone className="h-5 w-5" />
            }
          >
            <Input
              button={
                <Button
                  disabled={derivedFromTitle}
                  icon={
                    <MdSpellcheck className="h-5 w-5 text-gray-400 dark:text-current" />
                  }
                  onClick={() => {
                    const title = getValues().title;
                    if (title) setValue("slug", toSlug(getValues().title));
                    void trigger("slug");
                  }}
                  type="button"
                  variant="input"
                >
                  Wygeneruj
                </Button>
              }
              invalid={slugError}
              type="text"
              {...register("slug")}
            />
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Label label="Kategoria">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    onChange={field.onChange}
                    options={POST_CATEGORIES.map((category) => ({
                      icon: POST_CATEGORY_ICONS[category],
                      key: category,
                      text: CATEGORIES[category],
                      value: category,
                    }))}
                    value={field.value}
                  />
                )}
              />
            </Label>
            <Label
              error={Boolean(errors.publishedAt)}
              label="Data publikacji"
              message={errors.publishedAt?.message}
            >
              <Input
                invalid={Boolean(errors.publishedAt)}
                type="date"
                {...register("publishedAt")}
              />
            </Label>
          </div>
          <Label
            error={Boolean(errors.image)}
            label="Adres URL obrazu"
            message={
              errors.image?.message ??
              (image ? `${image.width} x ${image.height}` : undefined)
            }
            messageIcon={
              !errors.image?.message && image && <MdDone className="h-5 w-5" />
            }
          >
            <Input
              invalid={Boolean(errors.image)}
              type="text"
              {...register("image", {
                onBlur: (event: FocusEvent<HTMLInputElement>) =>
                  void handleImageChange(event.target.value),
              })}
            />
          </Label>
          {usersQuery.data && (
            <Label
              error={Boolean(errors.authors)}
              label="Autorzy"
              message={errors.authors?.message}
            >
              <Controller
                control={control}
                name="authors"
                render={({ field }) => (
                  <ComboBox
                    by={(a, b) => a.id === b.id}
                    displayValue={(authors) =>
                      authors.map((author) => author.name).join(", ")
                    }
                    invalid={Boolean(errors.authors)}
                    onChange={field.onChange}
                    options={usersQuery.data
                      .filter((author) => author.name)
                      .map((author) => ({
                        icon: (
                          <Avatar
                            alt={author.name}
                            size={24}
                            src={author.image}
                          />
                        ),
                        key: author.id,
                        text: author.name as string,
                        value: author,
                      }))}
                    value={field.value}
                  />
                )}
              />
            </Label>
          )}
          <div>
            <label className="flex items-center gap-4">
              <Controller
                control={control}
                name="public"
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={field.onChange} />
                )}
              />
              <span className="cursor-pointer font-bold">Publiczny</span>
            </label>
            <p className="ml-8 text-gray-500">
              Post będzie widoczny dla wszystkich użytkowników.
            </p>
          </div>
          <Label
            error={Boolean(errors.summary)}
            label="Podsumowanie"
            message={errors.summary?.message}
          >
            <TextArea
              invalid={Boolean(errors.summary)}
              rows={10}
              {...register("summary")}
            />
          </Label>
          <Label
            error={Boolean(errors.body)}
            label="Treść"
            message={errors.body?.message}
          >
            <TextArea
              className="font-mono"
              invalid={Boolean(errors.body)}
              rows={36}
              {...register("body")}
            />
          </Label>
          <div className="flex gap-4">
            <PostFormButtons
              control={control}
              onPreviewClick={() => {
                updateSource({ body: getValues().body });
                setPreview(true);
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
            />
          </div>
        </form>
      </section>
    </LayoutIsometricPrism>
  );
};
