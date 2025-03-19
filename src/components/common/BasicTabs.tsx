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
          border: "1px solid #F3F4F6",
          borderRadius: "8px",
          color: "neutral",
          fontSize: "14px",
          textTransform: "none",
          fontWeight: "bold",
          margin: "4px",
          minHeight: "36px",
          padding: "6px 16px",
          fontFamily: "'JetBrains Mono', monospace",
        },
        "& .Mui-selected": {
          backgroundColor: "#E5E7EB",
          color: "#334155 !important",
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
