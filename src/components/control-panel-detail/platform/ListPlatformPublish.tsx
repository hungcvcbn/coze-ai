"use client";
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getListPlatformPublish, publishAgent } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import BasicButton from "@/components/common/BasicButton";
interface Props {
  open: any;
  setOpen: any;
}

const ListPlatformPublish = ({ open, setOpen }: Props) => {
  const [data, setData] = useState<any>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const { id } = useParams();

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

  const handleCheckboxChange = (platformCode: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformCode)) {
        return prev.filter(code => code !== platformCode);
      } else {
        return [...prev, platformCode];
      }
    });
  };

  const handlePublish = async () => {
    let params = {
      version: "",
      overide: true,
      enablePlatforms: selectedPlatforms?.map((code: any) => ({ code: code })),
    };

    try {
      await publishAgent(id, params);
      dispatch(
        setToast({
          message: "Publish thành công",
          type: "success",
          show: true,
        })
      );
      setOpen(false);
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
    <BasicDialog
      maxWidth='md'
      open={open}
      onClose={() => setOpen(false)}
      title='Thông tin Publish'
      showCloseIcon
    >
      <BasicDialogContent>
        <div className='flex flex-col text-neutral'>
          <div className='flex flex-col mb-4 rounded-lg bg-white p-4 text-neutral'>
            <div className='text-16-24 font-bold mb-4'>Nền tảng hỗ trợ</div>
            <div className='space-y-2'>
              {data?.publishedPlatforms?.map((platform: any) => (
                <div
                  key={platform.code}
                  className='flex w-full items-center  p-4 border rounded-lg'
                >
                  <div className='flex items-center justify-center'>
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.code)}
                      onChange={() => handleCheckboxChange(platform.code)}
                    />
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className='text-2xl'>{platform.icon}</span>
                    <div>
                      <h3 className='text-16-24 font-bold'>{platform.name}</h3>
                      <p className='text-14-20 text-gray-600'>{platform.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BasicDialogContent>
      <BasicDialogActions>
        <BasicButton variant='outlined' type='button' onClick={() => setOpen(false)}>
          Quay lại
        </BasicButton>
        <BasicButton variant='contained' onClick={handlePublish}>
          Publish
        </BasicButton>
      </BasicDialogActions>
    </BasicDialog>
  );
};

export default ListPlatformPublish;
