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
  MdVisibility,
} from "react-icons/md";

import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/api";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { ComboBox } from "@/components/combo-box";
import { Checkbox, Input, TextArea } from "@/components/input";
import { Label } from "@/components/label";
import { LayoutIsometricPrism } from "@/components/layout/isometric-prism";
import { Meta } from "@/components/meta";
import { Select } from "@/components/select";

import { CATEGORIES, SKNI_KOD_ABBREVIATION } from "@/constants/strings";

import { Post } from "@/content/post";

import { useDebounce } from "@/hooks/debounce";
import { useRouter } from "@/hooks/router";

import {
  POST_CATEGORIES,
  type PostCategory,
  type PostFormSchema,
  postFormSchema,
} from "@/schemas/post";

import { getServerSession } from "@/server/authentication";

import { CONTAINER_STYLES, HEADLINE_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";
import { getImage } from "@/utilities/image";
import { isModerator } from "@/utilities/permissions";
import { toSlug } from "@/utilities/slug";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res);

  if (!isModerator(session?.user?.role)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
    },
  };
};

const POST_CATEGORY_ICONS: Record<PostCategory, ReactNode> = {
  article: <MdArticle className="h-5 w-5" />,
  news: <MdAnnouncement className="h-5 w-5" />,
};

const NewPostPage = () => {
  const session = useSession();

  const [image, setImage] = useState<
    { height: number; url: string; width: number } | undefined
  >(undefined);
  const [preview, setPreview] = useState(false);
  const [slug, setSlug] = useState("");
  const [slugChanged, setSlugChanged] = useState(false);

  const router = useRouter();

  const slugQuery = api.post.find.bySlug.useQuery(
    { slug },
    {
      enabled: Boolean(slug),
      retry: false,
    }
  );

  const usersQuery = api.user.find.all.useQuery();

  const isSlugTaken = Boolean(slugQuery.data);

  const { mutate } = api.post.create.useMutation({
    onSuccess: async ({ slug }) => {
      await router.replace(`/blog/${slug}`);
    },
  });

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
    watch,
  } = useForm<PostFormSchema>({
    defaultValues: {
      authors: [
        {
          id: session.data?.user?.id as string,
          image: session.data?.user?.image as string,
          name: session.data?.user?.name as string,
        },
      ],
      category: "article",
      public: false,
    },
    delayError: 1000,
    mode: "onChange",
    resolver: zodResolver(postFormSchema),
  });

  const bodyFormValue = watch("body");
  const slugFormValue = watch("slug");
  const titleFormValue = watch("title");

  const { data: source } = api.post.serialize.useQuery(
    { body: bodyFormValue },
    {
      enabled: Boolean(bodyFormValue),
    }
  );

  useDebounce(
    () => {
      setSlug(slugFormValue);
      setSlugChanged(false);
    },
    2000,
    [slugFormValue]
  );

  useEffect(() => {
    if (isSlugTaken) {
      return setError("slug", {
        message: "Podany slug jest już zajęty.",
        type: "custom",
      });
    }

    clearErrors("slug");

    if (getValues().slug) void trigger("slug");
  }, [clearErrors, getValues, isSlugTaken, setError, trigger]);

  const onSubmit = async ({ authors, image, ...post }: PostFormSchema) => {
    mutate({
      ...post,
      authors: authors.map(({ id }) => ({ userId: id })),
      image: await getImage(image),
    });
    reset();
  };

  return preview && source ? (
    <>
      <Post
        post={{
          authors: getValues().authors,
          image,
          publishedAt: getValues().publishedAt,
          slug,
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
      header={<h1 className={cx(HEADLINE_STYLES, "py-16")}>Nowy post</h1>}
    >
      <Meta title={`Nowy post - ${SKNI_KOD_ABBREVIATION}`} />
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
            error={!slugQuery.isLoading && Boolean(errors.slug)}
            label="Slug"
            message={
              slugQuery.isLoading
                ? undefined
                : errors.slug?.message ??
                  (slug && !slugChanged
                    ? "Podany slug jest dostępny."
                    : undefined)
            }
            messageIcon={
              !slugQuery.isLoading &&
              !errors.slug?.message &&
              slug &&
              !slugChanged && <MdDone className="h-5 w-5" />
            }
          >
            <Input
              button={
                <Button
                  disabled={!titleFormValue}
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
              invalid={!slugQuery.isLoading && Boolean(errors.slug)}
              type="text"
              {...register("slug", {
                onChange: () => {
                  setSlugChanged(true);
                },
              })}
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
                // {...register("publishedAt")}
                {...register("publishedAt", { valueAsDate: true })}
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
                onBlur: (event: FocusEvent<HTMLInputElement>) => {
                  void getImage(event.target.value).then((image) => {
                    clearErrors("image");
                    setImage(image);

                    if (event.target.value !== "" && !image) {
                      setError("image", {
                        message:
                          "Obraz o podanym adresie URL jest niedostępny.",
                        type: "custom",
                      });
                    }
                  });
                },
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
            <Button
              className="w-32"
              disabled={!Object.keys(dirtyFields).length}
              icon={<MdSave className="h-5 w-5" />}
              variant="contained"
            >
              Zapisz
            </Button>
            <Button
              className="w-32"
              icon={<MdVisibility className="h-5 w-5" />}
              onClick={() => setPreview(true)}
              type="button"
              variant="text"
            >
              Podgląd
            </Button>
          </div>
        </form>
      </section>
    </LayoutIsometricPrism>
  );
};

export default NewPostPage;
