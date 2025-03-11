"use client";
import React from "react";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import BasicButton from "@/components/common/BasicButton";
import { addKnowledgeIntoAgent, getKnowledge } from "@/helpers/api/knowledge";
import { Tabs, Tab, IconButton, Tooltip } from "@mui/material";
import CustomTextField from "@/components/hook-form/CustomTextField";
import CreateKnowledge from "./CreateKnowledge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { requestUpload } from "@/helpers/api/chatbot";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import FileUploadIcon from "@mui/icons-material/FileUpload";
interface EditKnowledgeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const EditKnowledgeModal = ({ open, setOpen, data }: EditKnowledgeModalProps) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>({});
  const [knowledge, setKnowledge] = useState<any>([]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    const typeMap = {
      0: "ALL",
      1: "TEXT",
      2: "TABLE",
      3: "IMAGE",
    } as const;
    setSelectedType(typeMap[newValue as keyof typeof typeMap]);
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
        maxWidth='lg'
        fullWidth
      >
        <BasicDialogContent>
          <div className='grid grid-cols-12 gap-4 min-w-0 overflow-x-auto'>
            <div className='col-span-3 flex flex-col gap-4 min-w-[200px]'>
              <CustomTextField placeholder='Search' />
              <BasicButton
                onClick={() => {
                  setSelectedKnowledge(null);
                  setOpenCreateModal(true);
                }}
              >
                <AddCircleOutlineIcon />
                Create knowledge
              </BasicButton>
            </div>

            {/* Right side - List section */}
            <div className='col-span-9 min-w-0'>
              <div className='flex items-center gap-4 border-b'>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor='primary'
                  indicatorColor='primary'
                >
                  <Tab label='All' value={0} />
                  <Tab label='Document' value={1} />
                  <Tab label='Table' value={2} />
                  <Tab label='Images' value={3} />
                </Tabs>
              </div>

              {/* Knowledge list will be rendered here */}
              <div className='mt-4 min-h-full flex flex-col gap-2 overflow-x-auto'>
                {filteredKnowledge?.map((item: any) => (
                  <div
                    key={item?.id}
                    className='flex justify-between items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer min-w-0'
                  >
                    <div className='flex items-center gap-3 overflow-hidden'>
                      <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <i className='text-blue-500'>📄</i>
                      </div>
                      <div className='flex flex-col overflow-hidden'>
                        <span className='text-14-20 font-semibold truncate'>{item.name}</span>
                        <span className='text-14-20 text-neutral truncate'>{item.description}</span>
                        {item?.files?.map((file: any, index: number) => (
                          <div key={index} className='text-14-20 text-primary'>
                            {file?.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <label htmlFor={`file-upload-${item.id}`}>
                        <Tooltip title='Tải file cho knowledge' placement='top'>
                          <button className='cursor-pointer pl-1'>
                            <FileUploadIcon sx={{ color: "#6A6A6A" }} />
                          </button>
                        </Tooltip>
                      </label>
                      <Tooltip title='Thêm knowledge vào agent' placement='top'>
                        <button
                          className='cursor-pointer pl-1'
                          onClick={() => handleAddKnowledgeToAgent(item?.id)}
                        >
                          <AddCircleOutlineIcon sx={{ color: "#6A6A6A" }} />
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
                ))}
              </div>
            </div>
          </div>
        </BasicDialogContent>
        <BasicDialogActions>
          <BasicButton variant='outlined' onClick={() => setOpen(false)}>
            Quay lại
          </BasicButton>
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
