"use client";
import { Checkbox, IconButton, Switch, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getListPlatformPublish, publishAgent } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import BasicButton from "@/components/common/BasicButton";
import CustomTextField from "@/components/hook-form/CustomTextField";
interface EditPlatformModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const EditPlatformModal = ({ open, setOpen }: EditPlatformModalProps) => {
  const [data, setData] = useState<any>({});

  // const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id as string;
  console.log("data", data);
  const fetchListPlatformPublish = async () => {
    try {
      const res = await getListPlatformPublish(id);
      setData(res.data);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error?.message,
          type: "error",
          show: true,
        })
      );
    }
  };

  useEffect(() => {
    if (open) {
      fetchListPlatformPublish();
    }
  }, [open]);
  return (
    <>
      <BasicDialog
        maxWidth='md'
        open={open}
        onClose={() => setOpen(false)}
        title='Tích hợp Website'
        showCloseIcon
      >
        <BasicDialogContent>
          <div className='flex flex-col text-neutral'>
            <div className='flex flex-col gap-4 mb-4 rounded-lg bg-white p-4'>
              <CustomTextField
                label='Mã Sctript được để vào trong thẻ Head của Webiste'
                multiline
                rows={4}
              />
              <CustomTextField label='Link chia sẻ' multiline rows={4} />
              <CustomTextField label='Thẻ nhúng' multiline rows={4} />
            </div>
          </div>
        </BasicDialogContent>
        <BasicDialogActions>
          <BasicButton variant='outlined' type='button' onClick={() => setOpen(false)}>
            Quay lại
          </BasicButton>
        </BasicDialogActions>
      </BasicDialog>
    </>
  );
};

export default EditPlatformModal;
