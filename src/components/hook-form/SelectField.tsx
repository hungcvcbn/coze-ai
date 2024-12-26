import React, { ChangeEventHandler, forwardRef, memo, useCallback, useMemo } from "react";
import { MenuItem } from "@mui/material";
import CustomTextField, { CustomTextFieldProps } from "./CustomTextField";
import { isEmpty } from "@/helpers/utils/common";
import { SelectOption } from "@/helpers/interfaces";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BasicButton from "../common/BasicButton";

export type SelectFieldProps = Omit<CustomTextFieldProps, "onChange"> & {
  allOption?: boolean;
  multiple?: boolean;
  options?: SelectOption[];
  onChange?: (value: string | number) => void;
  trigger?: (value: string | number) => void;
};

const AllOption = { value: -1, label: "Tất cả" } as const;

const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ options, allOption, value, onChange, children, trigger, multiple = false, ...other }, ref) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      event => {
        // eslint-disable-next-line prefer-destructuring
        let value = event.target.value as string | number;
        onChange?.(value);
        if (trigger) {
          trigger(value);
        }
      },
      [allOption, onChange, trigger]
    );

    const selectValue = useMemo(() => {
      if (allOption && isEmpty(value)) {
        return AllOption.value;
      }
      return value;
    }, [allOption, value]);

    return (
      <CustomTextField
        ref={ref}
        value={selectValue}
        onChange={handleChange}
        InputProps={{
          sx: {
            textAlign: "start",
            "& .MuiSelect-select": { paddingRight: "16px !important" },
            ...other.InputProps?.sx,
          },
        }}
        SelectProps={{
          IconComponent: rest => (
            <BasicButton variant='text' {...rest}>
              <KeyboardArrowDownIcon height={18} width={18} />
            </BasicButton>
          ),
          MenuProps: { sx: { maxWidth: 200 } },
          multiple,
          sx: {
            "& .MuiSelect-select .notranslate::after": other.placeholder
              ? {
                  content: `"${other.placeholder}"`,
                  opacity: 0.42,
                }
              : {},
          },
          title: options?.find(c => c.value === selectValue)?.label,
        }}
        select
        {...other}
      >
        {allOption && (
          <MenuItem
            key={AllOption.value}
            value={AllOption.value}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#f8f4ee",
                color: "#c0905d",
                ":hover": {
                  backgroundColor: "#f8f4ee",
                },
              },
            }}
          >
            {AllOption.label}
          </MenuItem>
        )}
        {options && options?.length > 0
          ? options.map(option => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#f8f4ee",
                    color: "#c0905d",
                    ":hover": {
                      backgroundColor: "#f8f4ee",
                    },
                  },
                }}
              >
                <p className='truncate' title={option.label}>
                  {option.label}
                </p>
              </MenuItem>
            ))
          : !allOption && <p className='px-4 py-1'>Không có lựa chọn nào</p>}
      </CustomTextField>
    );
  }
);

export default memo(SelectField);
