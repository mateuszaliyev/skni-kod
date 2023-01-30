import { type ChangeEvent, FocusEvent, ReactNode } from "react";
import { Controller } from "react-hook-form";
import {
  MdAnnouncement,
  MdArticle,
  MdDone,
  MdSave,
  MdSpellcheck,
  MdVisibility,
} from "react-icons/md";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { ComboBox } from "@/components/combo-box";
import { Checkbox, Input, TextArea } from "@/components/input";
import { Label } from "@/components/label";
import { Select } from "@/components/select";

import { CATEGORIES } from "@/constants/strings";

import {
  POST_CATEGORIES,
  type PostCategory,
  type PostFormSchema,
} from "@/schemas/post";

import { toSlug } from "@/utilities/slug";

import type { UsePostFormReturnType } from "./hooks/post-form";

export type PostFormProps = {
  onPreviewClick?: (data: PostFormSchema) => void;
  postForm: UsePostFormReturnType;
};

const POST_CATEGORY_ICONS: Record<PostCategory, ReactNode> = {
  article: <MdArticle className="h-5 w-5" />,
  news: <MdAnnouncement className="h-5 w-5" />,
};

export const PostForm = ({
  onPreviewClick,
  postForm: {
    control,
    dirtyFields,
    errors,
    getValues,
    handleImageChange,
    handleSubmit,
    image,
    isReady,
    onSubmit,
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
  },
}: PostFormProps) =>
  isReady ? (
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
        error={Boolean(errors.slug)}
        label="Slug"
        message={slugMessage}
        messageIcon={
          (slugAvailable || !slugChanged) && <MdDone className="h-5 w-5" />
        }
      >
        <Input
          button={
            <Button
              disabled={!title}
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
          invalid={Boolean(errors.slug)}
          type="text"
          {...register("slug", {
            onChange: () => {
              setSlugChanging(true);
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
            onBlur: (event: FocusEvent<HTMLInputElement>) =>
              void handleImageChange(event.target.value),
          })}
        />
      </Label>
      {users && (
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
                options={users
                  .filter((author) => author.name)
                  .map((author) => ({
                    icon: (
                      <Avatar alt={author.name} size={24} src={author.image} />
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
          disabled={!previewAvailable}
          icon={<MdVisibility className="h-5 w-5" />}
          onClick={() => onPreviewClick?.(getValues())}
          type="button"
        >
          Podgląd
        </Button>
      </div>
    </form>
  ) : null;
