import type { MouseEventHandler } from "react";
import { type Control, useWatch, useFormState } from "react-hook-form";
import { MdSave, MdVisibility } from "react-icons/md";

import { Button } from "@/components/button";

import type { PostFormSchema } from "@/schemas/post";

export type PostFormButtonsProps = {
  control: Control<PostFormSchema>;
  onPreviewClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PostFormButtons = ({
  control,
  onPreviewClick,
}: PostFormButtonsProps) => {
  const { dirtyFields } = useFormState({ control });

  const [authors, body, publishedAt, title] = useWatch({
    control,
    name: ["authors", "body", "publishedAt", "title"],
  });

  const previewDisabled =
    authors.length === 0 || !body || !publishedAt || !title;

  return (
    <>
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
        disabled={previewDisabled}
        icon={<MdVisibility className="h-5 w-5" />}
        onClick={previewDisabled ? undefined : onPreviewClick}
        type="button"
      >
        Podgląd
      </Button>
    </>
  );
};
