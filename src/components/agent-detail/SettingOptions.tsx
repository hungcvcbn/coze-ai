"use client";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OpeningQuestion from "./feature/OpeningQuestion";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { IconButton, Tooltip } from "@mui/material";
import Popover from "@mui/material/Popover";
import BasicButton from "../common/BasicButton";
import WarningIcon from "@mui/icons-material/Warning";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListKnowledge from "./knowledge/ListKnowledge";
import { addKnowledgeIntoAgent, getKnowledge } from "@/helpers/api/knowledge";
import AutoSuggestion from "./feature/AutoSuggestion";
import { useParams } from "next/navigation";
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openEditKnowledgeModal, setOpenEditKnowledgeModal] = useState(false);
  const [knowledge, setKnowledge] = useState<any>({});
  const { botId } = useParams();
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

  const addKnowledgeToAgent = async (id: string) => {
    try {
      await addKnowledgeIntoAgent(data?.id, { id: id });
      dispatch(setToast({ type: "success", message: "Thành công", show: true }));
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
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
          children: [<OpeningQuestion key='opening-question' id={data?.id} />],
        },
        {
          title: "Auto-suggestion",
          children: [<AutoSuggestion key='auto-suggestion' />],
        },
      ],
    },
  ];

  const renderSettingOptions = (
    children: ChildOption[],
    parentIndex: number,
    featureName: string
  ) => {
    return (
      <div className='flex flex-col gap-4'>
        {children.map((option, childIndex) => {
          if (React.isValidElement(option)) {
            return option;
          }

          const childOption = option as { label: string; help?: string; files?: any[]; id: string };

          return (
            <div
              key={childIndex}
              className={`flex flex-col p-3 overflow-y-auto max-h-[200px] rounded-lg justify-between gap-2 ${
                featureName !== "Chat experience"
                  ? "border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                  : ""
              }`}
            >
              <div className='flex justify-between items-center'>
                <div className='text-16-24 font-semibold text-neutral'>{childOption.label}</div>
                <Tooltip title='Thêm knowledge vào agent' placement='top'>
                  <button
                    onClick={() => addKnowledgeToAgent(childOption.id)}
                    className='text-14-20 text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer border border-primary rounded-lg px-2 py-1'
                  >
                    Add
                  </button>
                </Tooltip>
              </div>
              {childOption.files &&
                childOption.files.map((file: any, index: number) => (
                  <div key={index} className='text-14-20 text-primary'>
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
    <div className='flex flex-col p-3 space-y-4'>
      <div className=''>
        {items.map((item, featureIndex) => (
          <div key={featureIndex} className='space-y-2'>
            <div className='text-12-18 font-semibold px-2 text-neutral pt-4'>
              {item.featureName}
            </div>
            {item.options.map((option, parentIndex) => (
              <div
                key={parentIndex}
                className='mb-2 rounded-lg overflow-hidden border border-gray-200'
              >
                <div
                  className='flex justify-between items-center cursor-pointer text-16-24 font-semibold h-[40px] hover:bg-gray-50 bg-white px-4 py-1 text-neutral transition-colors duration-200'
                  onClick={() => toggleCollapse(`${featureIndex}-${parentIndex}`)}
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='transition-transform duration-300'
                      style={{
                        transform: collapseStates[`${featureIndex}-${parentIndex}`]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <ExpandMoreIcon />
                    </div>
                    <div className='text-14-20 font-semibold text-neutral'>{option.title}</div>
                  </div>
                  <div className='flex items-center'>
                    {(option.title === "Table" || option.title === "Text") && (
                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          setOpenEditKnowledgeModal(true);
                        }}
                      >
                        <AddCircleOutlineIcon sx={{ fontSize: 20, color: "#6A5ACD" }} />
                      </IconButton>
                    )}
                    {option.title === "Opening questions" && (
                      <IconButton onClick={handlePopoverClick}>
                        <BrightnessAutoIcon sx={{ fontSize: 20, color: "#6A5ACD" }} />
                      </IconButton>
                    )}
                  </div>
                </div>

                <div
                  className={`text-14-20 text-neutral transition-all duration-200 ease-in-out overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-gray-50
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  ${
                    collapseStates[`${featureIndex}-${parentIndex}`]
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {collapseStates[`${featureIndex}-${parentIndex}`] && (
                    <div className='p-4 border-t border-gray-100'>
                      {renderSettingOptions(option.children, parentIndex, item.featureName)}
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
