"use client";
import React, { useState } from "react";
import SelectField from "../hook-form/SelectField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ListItem {
  title: string;
  content: React.ReactNode;
}

interface SettingOptionsProps {
  items?: ListItem[];
}

const SettingOptions = ({ items = [] }: SettingOptionsProps) => {
  const [collapseStates, setCollapseStates] = useState<Record<number, boolean>>({});

  const toggleCollapse = (index: number) => {
    setCollapseStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className='flex flex-col'>
      <div className='mt-4'>
        {items.map((item, index) => (
          <div key={index} className='border-b'>
            <div
              className='flex justify-between items-center cursor-pointer text-16-24 font-semibold h-[55px] bg-gray-100 px-2 py-1 rounded-[4px] text-neutral'
              onClick={() => toggleCollapse(index)}
            >
              {item.title}
              {collapseStates[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {collapseStates[index] && (
              <div className='mt-2 text-14-20 text-neutral pb-4'>{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingOptions;
