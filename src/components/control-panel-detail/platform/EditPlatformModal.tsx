"use client";
import { Checkbox, Switch } from "@mui/material";
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
interface Props {
  open: any;
  setOpen: any;
}

const EditPlatformModal = ({ open, setOpen }: Props) => {
  const [data, setData] = useState<any>({});
  const [isConnected, setIsConnected] = useState(false);
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
      title='Tích hợp Website'
      showCloseIcon
    >
      <BasicDialogContent>
        <div className='flex flex-col text-neutral'>
          <div className='flex flex-col gap-4 mb-4 rounded-lg bg-white p-4'>
            <div className='text-14-20 font-bold flex items-center gap-2'>
              Trạng thái kết nối
              <Switch
                checked={isConnected}
                onChange={e => setIsConnected(e.target.checked)}
                color='primary'
                sx={{
                  width: 50,
                  height: 26,
                  padding: 0,
                  "& .MuiSwitch-switchBase": {
                    padding: 0,
                    margin: "2px",
                    transitionDuration: "300ms",
                    "&.Mui-checked": {
                      transform: "translateX(25px)",
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#2ECA45",
                        opacity: 1,
                        border: 0,
                      },
                      "& .MuiSwitch-thumb:before": {
                        content: "'Bật'",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        left: 0,
                        top: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#2ECA45",
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    boxSizing: "border-box",
                    width: 22,
                    height: 22,
                    "&:before": {
                      content: "'Tắt'",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      left: 0,
                      top: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#000000",
                    },
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    backgroundColor: "#E9E9EA",
                    opacity: 1,
                    transition: "background-color 500ms",
                  },
                }}
              />
            </div>
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
  );
};

export default EditPlatformModal;
