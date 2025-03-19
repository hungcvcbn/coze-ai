"use client";
import React from "react";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import BasicButton from "@/components/common/BasicButton";
import { addKnowledgeIntoAgent, getKnowledge } from "@/helpers/api/knowledge";
import { Tabs, Tab, IconButton, Tooltip, Grid2 } from "@mui/material";
import CustomTextField from "@/components/hook-form/CustomTextField";
import CreateKnowledge from "./CreateKnowledge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { requestUpload } from "@/helpers/api/chatbot";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import clsx from "clsx";
import { IconUpload } from "@/components/common/IconCommon";
interface EditKnowledgeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  fetchDataAssigned: () => void;
}

const EditKnowledgeModal = ({
  open,
  setOpen,
  data,
  fetchDataAssigned,
}: EditKnowledgeModalProps) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>({});
  const [knowledge, setKnowledge] = useState<any>([]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTabChange = (type: string) => {
    setSelectedType(type);
  };

  const filteredKnowledge =
    knowledge?.items?.filter((item: any) => {
      if (!item) return false;
      if (selectedType === "ALL") return item.scope?.toLowerCase() === "accessible";
      return item.type === selectedType && item.scope?.toLowerCase() === "accessible";
    }) || [];

  const fetchKnowledge = async () => {
    try {
      const res = await getKnowledge(data?.id, { scope: "ACCESSIBLE" });
      setKnowledge(res?.data);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      await requestUpload(selectedKnowledge?.id, formData);
      dispatch(setToast({ message: "Tải lên file thành công", type: "success", show: true }));
      fetchKnowledge();
    } catch (error: any) {
      dispatch(setToast({ message: error?.message, type: "error", show: true }));
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  useEffect(() => {
    if (open) {
      fetchKnowledge();
    }
  }, [open]);
  const handleAddKnowledgeToAgent = async (id: string) => {
    try {
      await addKnowledgeIntoAgent(data?.id, { id: id });
      dispatch(setToast({ type: "success", message: "Thành công", show: true }));
      fetchKnowledge();
      fetchDataAssigned();
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
  return (
    <div>
      <BasicDialog
        open={open}
        onClose={() => setOpen(false)}
        title='Select knowledge'
        showCloseIcon
        maxWidth='md'
        fullWidth
      >
        <BasicDialogContent>
          <div className='flex flex-col'>
            <Grid2 container spacing={2}>
              <Grid2 size={8.5}>
                <CustomTextField fullWidth placeholder='Search' />
              </Grid2>
              <Grid2 size={3}>
                <BasicButton
                  clases='mt-1'
                  onClick={() => {
                    setSelectedKnowledge(null);
                    setOpenCreateModal(true);
                  }}
                >
                  <AddCircleOutlineIcon />
                  &nbsp; Create knowledge
                </BasicButton>
              </Grid2>
            </Grid2>

            <div className='flex items-center gap-1 border-b mt-3 bg-gray-200 w-[160px] rounded-lg'>
              {["ALL", "TEXT"].map(type => (
                <button
                  key={type}
                  className={clsx(
                    "px-4 py-2 text-14-20 font-medium rounded-lg transition-all",
                    selectedType === type
                      ? "border border-gray-300 bg-white text-neutral"
                      : "text-gray-500 hover:text-neutral"
                  )}
                  onClick={() => handleTabChange(type)}
                >
                  {type === "ALL" ? "All" : "Document"}
                </button>
              ))}
            </div>

            {/* Knowledge list will be rendered here */}
            <div className='mt-4 min-h-full flex flex-col gap-2'>
              {filteredKnowledge?.map((item: any) => (
                <div
                  key={item?.id}
                  className='flex items-center w-full p-3 rounded-lg border border-gray-300 cursor-pointer'
                >
                  <div className='flex items-center w-full gap-3'>
                    <div className='flex flex-col w-full'>
                      <div className='flex justify-between w-full'>
                        <div className='flex flex-col gap-1 flex-1 mr-2'>
                          <span className='text-16-24 text-neutral font-semibold truncate'>
                            {item.name}
                          </span>
                          <span className='text-14-20 text-gray-500 truncate'>
                            {item.description}
                          </span>
                        </div>
                        <div className='flex gap-1 justify-center items-center'>
                          <label htmlFor={`file-upload-${item.id}`}>
                            <Tooltip title='Upload file for knowledge' placement='top'>
                              <button
                                className='cursor-pointer pl-1 pt-2'
                                onClick={() => {
                                  fileInputRef.current?.click();
                                  setSelectedKnowledge(item);
                                }}
                              >
                                <IconUpload color='#334155' width={16} height={16} />
                              </button>
                            </Tooltip>
                          </label>
                          <Tooltip title='Add knowledge to agent' placement='top'>
                            <button
                              className='cursor-pointer pl-1'
                              onClick={() => handleAddKnowledgeToAgent(item?.id)}
                            >
                              <AddCircleOutlineIcon sx={{ color: "#C6C6C6" }} />
                            </button>
                          </Tooltip>
                          <input
                            type='file'
                            id={`file-upload-${item.id}`}
                            className='hidden'
                            ref={fileInputRef}
                            accept='*/*'
                            onChange={handleFileUpload}
                            onClick={() => setSelectedKnowledge(item)}
                          />
                        </div>
                      </div>
                      {item?.files?.map((file: any, index: number) => (
                        <div
                          key={index}
                          className='text-14-20 bg-gray-100 rounded-lg p-2 text-neutral flex justify-start mt-2 gap-2'
                        >
                          <div className='flex gap-1 border rounded-full p-2 bg-white'>
                            <InsertDriveFileIcon sx={{ color: "#6A6A6A", fontSize: "1.1rem" }} />
                          </div>
                          <div className='pt-2'> {file?.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BasicDialogContent>
        <BasicDialogActions>
          <div className='flex justify-end'>
            <BasicButton variant='outlined' onClick={() => setOpen(false)}>
              Close
            </BasicButton>
          </div>
        </BasicDialogActions>
      </BasicDialog>
      {openCreateModal && (
        <CreateKnowledge
          fetchKnowledge={fetchKnowledge}
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          selectedKnowledge={selectedKnowledge}
        />
      )}
    </div>
  );
};

export default EditKnowledgeModal;
