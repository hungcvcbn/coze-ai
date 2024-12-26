import React, { forwardRef } from "react";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { FieldError } from "react-hook-form";
import { getHelperText } from "@/helpers/utils/common";
import RequiredLabel from "./RequiredLabel";

export type CustomTextFieldProps = Omit<TextFieldProps, "error"> & {
  error?: FieldError;
  label?: string;
  isRequired?: boolean;
  readOnly?: boolean;
  dashedBorder?: boolean;
};

const CustomTextField = forwardRef<HTMLDivElement, CustomTextFieldProps>(
  ({ isRequired, readOnly, label, error, dashedBorder, ...other }, ref) => {
    return (
      <Box display='flex' flexDirection='column' gap={0.5}>
        <RequiredLabel isRequired={isRequired}>{label}</RequiredLabel>
        <TextField
          ref={ref}
          fullWidth
          size='small'
          label=''
          inputProps={{
            readOnly: readOnly,
            sx: dashedBorder
              ? {
                  padding: "3px 8px",
                  height: "24px",
                  fontSize: "12px",
                }
              : {},
          }}
          error={!!error}
          sx={{
            "& .MuiInputBase-input": !other.multiline
              ? {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }
              : {},
            "& .Mui-disabled": {
              backgroundColor: "#F9FAFB",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderStyle: "solid",
                borderColor: dashedBorder ? "rgb(209 213 219)" : "",
                borderRadius: "10px",
              },
              " &:focus-within fieldset": {
                borderStyle: "solid",
                borderColor: dashedBorder ? "primary" : "",
                borderWidth: dashedBorder ? "2px" : "",
              },
              "&:hover fieldset": {
                borderStyle: "solid",
                borderColor: dashedBorder ? "primary" : "",
                borderWidth: dashedBorder ? "1px" : "",
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: "0px !important",
            },
            ...(dashedBorder && {
              height: "16px",
              fontSize: "12px",
            }),
          }}
          helperText={getHelperText(error)}
          {...other}
        />
      </Box>
    );
  }
);

export default CustomTextField;
