import React, { forwardRef, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  Popover,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import { SelectOption } from "@/helpers/interfaces";
import { FieldError } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomLabel from "./RequiredLabel";
import { stringNoSign } from "@/helpers/utils/common";
import SearchIcon from "@mui/icons-material/Search";
interface Props {
  options: Array<SelectOption>;
  label: string;
  menuProps?: any;
  isRequired?: boolean;
  value: string | number | null;
  onChange: Function;
  disabled?: boolean;
  placeholder?: string;
  error?: FieldError;
  sx?: SxProps<Theme> | undefined;
  trigger?: (value: string | number | null) => void;
}

const CustomSelect = forwardRef<HTMLDivElement, Props>(
  (
    { isRequired, sx, label, options, menuProps, placeholder, value, onChange, error, trigger },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [listOption, setListOption] = useState<Array<SelectOption>>([]);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      setListOption(options);
    }, [options]);

    const onInutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value?.trim()) {
        let arr = [];
        arr = options.filter((it: any) =>
          stringNoSign(it.label.toLocaleLowerCase()).includes(
            stringNoSign(e.target.value.trim().toLocaleLowerCase())
          )
        );
        setListOption([...arr]);
        return;
      }
      setListOption([...options]);
    };

    const handleSelect = (item: SelectOption) => {
      onChange(item.value || item.label);
      handleClose();
      if (trigger) trigger(item.value || item.label);
    };

    return (
      <Box display='flex' flexDirection='column' gap={0.5}>
        <div className='flex flex-col gap-1 cursor-pointer'>
          <CustomLabel isRequired={isRequired}>{label}</CustomLabel>
          <TextField
            ref={ref}
            label=''
            size='small'
            onClick={handleClick}
            placeholder={placeholder}
            title={options.find(c => c.value === value)?.label || ""}
            value={options.find(c => c.value === value)?.label || ""}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    style={{
                      transform: `${open ? "rotate(180deg)" : "rotate(0deg)"}`,
                    }}
                    className='h-auto w-auto px-0'
                    variant='text'
                    onClick={handleClick}
                  >
                    <KeyboardArrowDownIcon width={16} height={16} />
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
              ...sx,
            }}
            onChange={onInutChange}
            error={!!error}
          />
          {error && (
            <FormHelperText style={{ padding: "0", margin: "0", color: "#d32f2f" }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ "& .MuiPaper-root": { maxHeight: "350px", paddingY: 1 } }}
          {...menuProps}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <p className='text-14-20 font-inter-600 px-2'>{label}</p>
          <TextField
            size='small'
            onChange={onInutChange}
            placeholder='Search'
            fullWidth
            sx={{
              mt: 1,
              mb: 0,
              padding: 1,
              borderTop: "1px solid #E5E7EB",
              borderBottom: "1px solid #E5E7EB",
              "&:hover fieldset": {
                border: "1px solid #C2D7FF !important",
              },
              ".Mui-disabled:hover fieldset": {
                border: "1px solid !important",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon width={20} height={20} />
                </InputAdornment>
              ),
              style: { paddingLeft: 16, paddingRight: 16 },
            }}
            inputProps={{
              style: { fontSize: 14, padding: 8 },
            }}
            // onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={e => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />

          {listOption.map((item: SelectOption) => {
            return (
              <MenuItem
                key={item.value}
                onClick={() => {
                  if (handleSelect) handleSelect(item);
                  handleClose();
                }}
                sx={{ minHeight: "10px" }}
              >
                <div
                  className={`flex justify-between items-center w-full gap-[16px] sm:h-7 font-inter-400 text-14-20 ${
                    item.value == value ? "text-primary  font-medium" : "text-black"
                  }`}
                >
                  <span>{item.label}</span>
                </div>
              </MenuItem>
            );
          })}
          {listOption.length < 1 && (
            <p className='font-inter-400 text-14-20 p-2'>No results found</p>
          )}
        </Popover>
      </Box>
    );
  }
);

export default CustomSelect;
