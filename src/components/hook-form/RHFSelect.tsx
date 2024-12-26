import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectField, { SelectFieldProps } from "./SelectField";

// ----------------------------------------------------------------------

export type RHFSelectProps = SelectFieldProps & {
  name: string;
  children?: React.ReactNode;
  label: string;
  trigger?: (value: string | number | undefined) => void;
};

export default function RHFSelect({
  name,
  children,
  isRequired,
  trigger,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <SelectField {...field} trigger={trigger} isRequired={isRequired} error={error} {...other}>
          {children}
        </SelectField>
      )}
    />
  );
}
