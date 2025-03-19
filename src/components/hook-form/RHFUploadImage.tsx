import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import UploadImage from "./UploadImage";

// ----------------------------------------------------------------------
type Props = {
  name: string;
  uploadFolder: string;
  size?: "small" | "medium";
};

export default function RHFUploadImage({ name, uploadFolder, size = "medium" }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadImage {...field} error={error} size={size} uploadFolder={uploadFolder} />
      )}
    />
  );
}
