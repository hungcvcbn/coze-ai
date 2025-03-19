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
  placeholder?: string;
};

const CustomTextField = forwardRef<HTMLDivElement, CustomTextFieldProps>(
  ({ isRequired, readOnly, label, error, dashedBorder, placeholder, ...other }, ref) => {
    return (
      <Box display='flex' flexDirection='column' gap={0.5}>
        <RequiredLabel isRequired={isRequired}>{label}</RequiredLabel>
        <TextField
          ref={ref}
          fullWidth
          size='small'
          label=''
          placeholder={placeholder}
          inputProps={{
            readOnly: readOnly,
            sx: dashedBorder
              ? {
                  padding: "3px 8px",
                  height: "24px",
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                  },
                  fontFamily: "'JetBrains Mono', monospace",
                }
              : {
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                  },
                },
          }}
          error={!!error}
          sx={{
            "& .MuiInputBase-input": !other.multiline
              ? {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                  },
                }
              : {
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                  },
                },
            "& .MuiInputBase-input::placeholder": {
              fontSize: dashedBorder
                ? {
                    xs: "10px",
                    sm: "12px",
                    md: "14px",
                  }
                : {
                    xs: "12px",
                    sm: "14px",
                    md: "16px",
                  },
              fontFamily: "'JetBrains Mono', monospace",
            },
            "& .Mui-disabled": {
              backgroundColor: "#F9FAFB",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderStyle: "solid",
                borderColor: dashedBorder ? "rgb(209 213 219)" : "",
                borderRadius: "10px",
              },
              "&:focus-within fieldset": {
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
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: {
                xs: "10px",
                sm: "12px",
                md: "14px",
              },
            },
            ...(dashedBorder && {
              height: "16px",
              fontSize: {
                xs: "10px",
                sm: "12px",
                md: "14px",
              },
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
