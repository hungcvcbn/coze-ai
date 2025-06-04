"use client";
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListPlatformConfig, publishAgent } from "@/helpers/api/chatbot";
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
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const fetchListPlatformPublish = async () => {
    try {
      const res = await getListPlatformConfig(id);
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
      router.push(`/control-panel/${id}/settings/list`);
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
      maxWidth='xs'
      open={open}
      onClose={() => setOpen(false)}
      title='Publish Information'
      showCloseIcon
    >
      <BasicDialogContent>
        <div className='flex flex-col mx-auto justify-start border border-gray-300 rounded-lg'>
          <div className='mb-2 text-neutral rounded-t-lg bg-gray-100 font-medium border-b border-gray-300 p-2 w-full'>
            Supported Platforms
          </div>
          <div className='p-2'>
            {data?.availablePlatforms?.map((platform: any) => (
              <div key={platform.code} className='flex items-center'>
                <Checkbox
                  size='small'
                  sx={{
                    "&.Mui-checked": {
                      color: "#39B5E0",
                    },
                  }}
                  checked={selectedPlatforms.includes(platform.code)}
                  onChange={() => handleCheckboxChange(platform.code)}
                />
                <span className='ml-2'>{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </BasicDialogContent>
      <BasicDialogActions>
        <BasicButton variant='outlined' type='button' onClick={() => setOpen(false)}>
          Close
        </BasicButton>
        <BasicButton variant='contained' onClick={handlePublish}>
          Publish
        </BasicButton>
      </BasicDialogActions>
    </BasicDialog>
  );
};

export default ListPlatformPublish;
