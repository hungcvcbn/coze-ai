import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomDatePicker, { IDatePickerProps } from "./CustomDatePicker";

// ----------------------------------------------------------------------

export type RHFDatePickerProps = IDatePickerProps & {
  name: string;
  trigger?: Function;
};

const RHFDatePicker = ({ name, trigger, ...other }: RHFDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomDatePicker
          {...field}
          error={error}
          onChange={(value: any) => {
            field.onChange(value);
            if (trigger) trigger();
          }}
          {...other}
        />
      )}
    />
  );
};

export default RHFDatePicker;
