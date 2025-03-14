import Dialog from "@mui/material/Dialog";
import React from "react";
import BasicButton from "../common/BasicButton";

interface ConfirmDialogProps {
  open: boolean;
  onClose: (isSaved?: boolean, id?: any) => void;
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
  textSubmitButton?: string;
  textCancelButton?: string;
  width?: number;
  isDisabled?: boolean; // Thêm để điều chỉnh trạng thái nút xác nhận
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  subTitle,
  icon,
  textSubmitButton = "Xác nhận",
  textCancelButton = "Không",
  width = 600,
  isDisabled = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "16px",
          maxWidth: width,
          width: "100%",
        },
      }}
    >
      <div className='flex flex-col justify-center items-center space-y-6 p-9 rounded-[16px]'>
        {icon && <div className='flex justify-center items-center'>{icon}</div>}
        <div>
          <div className='text-28-40 text-center font-inter-600'>{title}</div>
          {subTitle && <div className='text-14-20 text-center pt-2 font-inter-600'>{subTitle}</div>}
        </div>
        <div className='flex flex-row justify-center space-x-4'>
          <BasicButton variant='outlined' onClick={() => onClose()} clases='text-neutral'>
            {textCancelButton}
          </BasicButton>
          <BasicButton color='primary' onClick={() => onClose(true)} disabled={isDisabled}>
            {textSubmitButton}
          </BasicButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
