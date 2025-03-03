"use client";
import React, { useEffect, useState } from "react";

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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListKnowledge from "./knowledge/ListKnowledge";
import CustomTextField from "../hook-form/CustomTextField";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getKnowledge } from "@/helpers/api/knowledge";
type ChildOption =
  | {
      label: string;
      help?: string;
      value?: boolean;
    }
  | React.ReactNode;

type ParentOption = {
  title: string;
  description?: string;
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
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openEditKnowledgeModal, setOpenEditKnowledgeModal] = useState(false);
  const [knowledge, setKnowledge] = useState<any>({});

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

  const toggleCollapse = (index: string) => {
    setCollapseStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const fetchKnowledge = async () => {
    try {
      const res = await getKnowledge();
      console.log(res);

      setKnowledge(res?.data);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
  useEffect(() => {
    fetchKnowledge();
  }, []);
  const textKnowledge = knowledge?.items?.filter((item: any) => item.type === "TEXT") || [];
  const tableKnowledge = knowledge?.items?.filter((item: any) => item.type === "TABLE") || [];

  const items: ListItem[] = [
    {
      featureName: "Knowledge",
      options: [
        {
          title: "Text",
          description:
            "After documents, URLs, and third-party data sources are uploaded into text knowledge, the agent can reference its content to answer your questions.",
          children: [
            ...textKnowledge.map((item: any) => ({
              label: item.name,
              help: item.description,
              id: item.id,
              type: item.type,
              files: item.files,
            })),
          ],
        },
        {
          title: "Table",
          description:
            "Table supports matching appropriate rows according to a certain column of the table. It also supports querying and calculating the database based on natural language.",
          children: [
            ...tableKnowledge.map((item: any) => ({
              label: item.name,
              help: item.description,
              id: item.id,
              files: item.files,
              type: item.type,
            })),
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

          const childOption = option as { label: string; help?: string; files?: any[] };

          return (
            <div
              key={childIndex}
              className='flex flex-col border p-2 overflow-y-auto max-h-[200px] rounded-md border-gray-300 justify-between gap-2'
            >
              <div className='text-16-24 font-semibold text-neutral'>{childOption.label}</div>
              {childOption.files &&
                childOption.files.map((file: any) => (
                  <div key={file.id} className='text-14-20 text-primary'>
                    {file.name}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='flex flex-col border-x border-b p-3 border-gray-300 '>
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
                  <div className='flex items-center'>
                    {(option.title === "Table" || option.title === "Text") && (
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          setOpenEditKnowledgeModal(true);
                          setSelectedKnowledge(item);
                        }}
                      >
                        <AddCircleOutlineIcon sx={{ fontSize: 24 }} color='primary' />
                      </IconButton>
                    )}
                    {option.title === "Opening questions" && (
                      <IconButton onClick={handlePopoverClick}>
                        <BrightnessAutoIcon sx={{ fontSize: 24 }} color='primary' />
                      </IconButton>
                    )}
                  </div>
                </div>

                <div
                  className={`mt-2 text-14-20 text-neutral transition-all duration-1000 ease-in-out overflow-y-auto
           [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full ${
            collapseStates[`${featureIndex}-${parentIndex}`]
              ? "max-h-[400px]"
              : "max-h-0 overflow-hidden"
          }`}
                >
                  {collapseStates[`${featureIndex}-${parentIndex}`] && (
                    <div>
                      <div className='pb-4 px-2'>
                        {renderSettingOptions(option.children, parentIndex)}
                      </div>
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
      <ListKnowledge open={openEditKnowledgeModal} setOpen={setOpenEditKnowledgeModal} />
    </div>
  );
};

export default SettingOptions;
