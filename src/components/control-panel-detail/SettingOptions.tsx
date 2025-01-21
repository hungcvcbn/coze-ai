"use client";
import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Switch from "@mui/material/Switch";
import OpeningQuestion from "./feature/OpeningQuestion";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import BasicButton from "../common/BasicButton";
import WarningIcon from "@mui/icons-material/Warning";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";

type ChildOption =
  | {
      label: string;
      help?: string;
      value?: boolean;
    }
  | React.ReactNode;

type ParentOption = {
  title: string;
  children: ChildOption[];
};

type ListItem = {
  featureName: string;
  options: ParentOption[];
};
interface ISettingOptions {
  data: any;
}
const SettingOptions = ({ data }: ISettingOptions) => {
  const [collapseStates, setCollapseStates] = useState<Record<string, boolean>>({});
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleConfirm = () => {
    dispatch(
      setToast({
        message: "Thành công",
        type: "success",
        show: true,
      })
    );
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleChange = (index: string) => {
    setCheckedStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleCollapse = (index: string) => {
    setCollapseStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const items: ListItem[] = [
    {
      featureName: "Knowledge",
      options: [
        {
          title: "Text",
          children: [{ label: "Chọn dữ liệu huấn luyện khi hỏi đáp", help: "⭕" }],
        },
        {
          title: "Table",
          children: [
            { label: "Mô hình", help: "⭕" },
            { label: "Sinh bảng tự động", help: "⭕" },
            { label: "Tối ưu bảng", help: "⭕" },
          ],
        },
      ],
    },
    {
      featureName: "Chat experience",
      options: [
        {
          title: "Opening questions",
          children: [<OpeningQuestion key='opening-question' />],
        },
        {
          title: "Auto-suggestion",
          children: [
            { label: "Auto-suggestion", help: "⭕" },
            { label: "Background image", help: "⭕" },
            { label: "Shortcuts", help: "⭕" },
            { label: "Opening questions", help: "⭕" },
          ],
        },
        {
          title: "Shortcuts",
          children: [
            { label: "Auto-suggestion", help: "⭕" },
            { label: "Background image", help: "⭕" },
            { label: "Shortcuts", help: "⭕" },
            { label: "Opening questions", help: "⭕" },
          ],
        },
      ],
    },
  ];

  const renderSettingOptions = (children: ChildOption[], parentIndex: number) => {
    return (
      <div className='flex flex-col gap-4'>
        {children.map((option, childIndex) => {
          if (React.isValidElement(option)) {
            return option;
          }

          const childOption = option as { label: string; help?: string };
          return (
            <div key={childIndex} className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                {childOption.label}
                {childOption.help && <span className='cursor-help'>{childOption.help}</span>}
              </div>
              <div>
                <Switch
                  checked={checkedStates[`${parentIndex}-${childIndex}`] || false}
                  onChange={() => handleChange(`${parentIndex}-${childIndex}`)}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      <div className='mt-4'>
        {items.map((item, featureIndex) => (
          <div key={featureIndex}>
            <div className='text-12-18 font-semibold px-2 py-1 text-neutral'>
              {item.featureName}
            </div>
            {item.options.map((option, parentIndex) => (
              <div key={parentIndex} className='border-b'>
                <div
                  className='flex justify-between items-center cursor-pointer text-16-24 font-semibold h-[55px] bg-gray-100 px-2 py-1 rounded-[4px] text-neutral'
                  onClick={() => toggleCollapse(`${featureIndex}-${parentIndex}`)}
                >
                  <div className='flex items-center gap-2'>
                    {collapseStates[`${featureIndex}-${parentIndex}`] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                    {option.title}
                  </div>
                  {option.title === "Opening questions" && (
                    <IconButton onClick={handlePopoverClick}>
                      <BrightnessAutoIcon sx={{ fontSize: 24 }} color='primary' />
                    </IconButton>
                  )}
                </div>
                <div
                  className={`mt-2 text-14-20 text-neutral transition-all duration-1000 ease-in-out overflow-hidden ${
                    collapseStates[`${featureIndex}-${parentIndex}`] ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {collapseStates[`${featureIndex}-${parentIndex}`] && (
                    <div className='pb-4 px-2'>
                      {renderSettingOptions(option.children, parentIndex)}
                    </div>
                  )}
                </div>
                {option.title === "Opening questions" && (
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <div className='flex flex-col gap-2 p-4 w-[450px]'>
                      <div className='flex justify-start gap-2 items-center'>
                        <div className='flex justify-between items-center'>
                          <WarningIcon color='warning' />
                        </div>
                        <div className='text-20-28 font-semibold'>Replace Opening Dialog</div>
                      </div>

                      <div className='pl-8'>
                        The auto-generated opening dialog will replace the current settings.
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <BasicButton variant='outlined' onClick={handlePopoverClose}>
                          Cancel
                        </BasicButton>
                        <BasicButton
                          variant='contained'
                          color='red'
                          onClick={() => {
                            handleConfirm();
                            // handlePopoverClose();
                          }}
                        >
                          Confirm
                        </BasicButton>
                      </div>
                    </div>
                  </Popover>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingOptions;
