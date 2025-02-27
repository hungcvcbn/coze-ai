"use client";

import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import BasicButton from "@/components/common/BasicButton";
import { getKnowledge } from "@/helpers/api/knowledge";
import { Tabs, Tab } from "@mui/material";
import CustomTextField from "@/components/hook-form/CustomTextField";
import CreateKnowledge from "./CreateKnowledge";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
interface EditKnowledgeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditKnowledgeModal = ({ open, setOpen }: EditKnowledgeModalProps) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedKnowledge, setSelectedKnowledge] = useState<any>({});
  const [knowledge, setKnowledge] = useState<any>([]);

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

  const filteredKnowledge = knowledge?.items?.filter((item: any) => {
    if (selectedType === "ALL") return true;
    return item.type === selectedType;
  });

  const fetchKnowledge = async () => {
    try {
      const res = await getKnowledge();
      setKnowledge(res?.data);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };

  useEffect(() => {
    if (open) {
      fetchKnowledge();
    }
  }, [open]);
  return (
    <div>
      <BasicDialog
        open={open}
        onClose={() => setOpen(false)}
        title='Select knowledge'
        showCloseIcon
        maxWidth='lg'
        fullWidth
        height='80vh'
      >
        <BasicDialogContent>
          <div className='grid grid-cols-12 gap-4'>
            {/* Left side - Create knowledge section */}
            <div className='col-span-3 flex flex-col gap-4'>
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
            <div className='col-span-9'>
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
              <div className='mt-4 min-h-full flex flex-col gap-2'>
                {filteredKnowledge?.map((item: any) => (
                  <div
                    key={item?.id}
                    className='flex justify-between items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <i className='text-blue-500'>📄</i>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-14-20 font-semibold'>{item.name}</span>
                        <span className='text-14-20 text-neutral'>{item.description}</span>
                      </div>
                    </div>
                    <button
                      className='flex items-center gap-2'
                      onClick={() => {
                        setSelectedKnowledge(item);
                        setOpenCreateModal(true);
                      }}
                    >
                      <AddCircleOutlineIcon color='primary' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BasicDialogContent>
      </BasicDialog>
      {openCreateModal && (
        <CreateKnowledge
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          selectedKnowledge={selectedKnowledge}
        />
      )}
    </div>
  );
};

export default EditKnowledgeModal;
