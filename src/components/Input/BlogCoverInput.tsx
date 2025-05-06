import React, { Dispatch } from "react";
import { X } from "@phosphor-icons/react";
import Image from "next/image";

export const BlogCoverInput = ({
  coverPreview,
  setCoverPreview,
  setCoverFile,
}: {
  coverPreview?: string;
  setCoverPreview: Dispatch<string | undefined>;
  setCoverFile: Dispatch<File | null>;
}) => {
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }

      const url = URL.createObjectURL(file);
      setCoverPreview(url);
      setCoverFile(file);
    }
  };

  return (
    <div className="bg-secondary w-4/5 flex flex-col gap-4 border rounded-lg px-3 py-2">
      {coverPreview && (
        <figure className="relative h-[250px] w-full md:h-[320px] lg:h-[400px] xl:h-[450px]">
          <X
            size={32}
            className="absolute z-10 bg-red-600 cursor-pointer rounded-full p-1 hover:bg-red-500 right-0 "
            onClick={() => {
              setCoverFile(null);
              URL.revokeObjectURL(coverPreview);
              setCoverPreview(undefined);
            }}
          />

          <Image
            src={coverPreview}
            alt={coverPreview}
            fill={true}
            sizes="100%"
            className="rounded-xl object-cover"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </figure>
      )}
      <label
        htmlFor="image-upload"
        className="px-2 py-1 w-fit rounded-lg bg-mint/90 text-gray-900 font-bold cursor-pointer hover:bg-mint"
      >
        Upload cover
      </label>

      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleCoverChange}
      />
    </div>
  );
};
