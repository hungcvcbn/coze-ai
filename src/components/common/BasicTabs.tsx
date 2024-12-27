import { SelectOption } from "@/helpers/interfaces";
import { Tab, Tabs } from "@mui/material";
import React from "react";

type Props = {
  value: string | number;
  onChange: (event: React.SyntheticEvent, newValue: string | number) => void;
  tabOptions: Array<SelectOption>;
};

const BasicTabs = ({ value, tabOptions, onChange }: Props) => {
  return (
    <Tabs
      value={value}
      variant='scrollable'
      onChange={onChange}
      sx={{
        "& .MuiTabs-indicator": {
          display: "none",
          color: "none",
        },
        "& .MuiTab-root": {
          border: "1px solid #6A5ACD",
          borderRadius: "8px",
          color: "neutral",
          fontSize: "14px",
          textTransform: "none",
          fontWeight: "bold",
          margin: "0 4px",
          minHeight: "36px",
          padding: "6px 16px",
        },
        "& .Mui-selected": {
          backgroundColor: "#6A5ACD",
          color: "#FFFFFF !important",
        },
      }}
    >
      {tabOptions.map(option => (
        <Tab key={option.value} value={option.value} label={option.label} />
      ))}
    </Tabs>
  );
};

export default BasicTabs;
