import React, { forwardRef } from "react";
import { Switch, styled, SwitchProps } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 22,
  padding: 0,
  marginLeft: "11px !important",
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 22,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(10px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#39B5E0",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    borderRadius: 16,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export interface CustomSwitchProps extends SwitchProps {
  label: string;
}

const CustomSwitch = forwardRef<HTMLButtonElement, CustomSwitchProps>(
  ({ label, ...other }, ref) => {
    return (
      <div className='flex flex-row text-neutral items-center space-x-2'>
        <StyledSwitch ref={ref} {...other} />
        <p className='text-14-20 font-medium text-neutral'>{label}</p>
      </div>
    );
  }
);

export default CustomSwitch;
