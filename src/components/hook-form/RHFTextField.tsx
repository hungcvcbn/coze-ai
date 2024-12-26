// form
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// @mui
import CustomTextField, { CustomTextFieldProps } from "./CustomTextField";

// ----------------------------------------------------------------------

type Props = CustomTextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField
          {...field}
          value={typeof field?.value === "number" && field?.value === 0 ? "" : field?.value}
          error={error}
          {...other}
        />
      )}
    />
  );
}
