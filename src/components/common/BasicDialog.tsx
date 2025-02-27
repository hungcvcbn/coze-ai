import Dialog, { DialogProps } from "@mui/material/Dialog";
import clsx from "clsx";
// import { IconX } from '../icons/common'
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface BasicDialogProps extends DialogProps {
  title?: string;
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  showCloseIcon?: boolean;
  titleClass?: string;
  contentClassContainer?: string;
  height?: string;
}

const BasicDialog = (props: BasicDialogProps) => {
  const {
    title,
    open,
    onClose,
    children,
    maxWidth,
    showCloseIcon,
    sx,
    titleClass,
    contentClassContainer,
    height,
    ...other
  } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={maxWidth || "sm"}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "8px",
          "& ::-webkit-scrollbar": {
            height: "8px",
          },
        },
        ".MuiDialog-paperWidthMd": {
          maxWidth: "800px",
        },
        ...sx,
      }}
      {...other}
    >
      <div className={clsx("py-3", contentClassContainer)}>
        <div className='flex flex-row justify-between items-center px-4 sticky border-b border-[#E5E7EB] pb-2'>
          {title && (
            <p className={clsx("text-[20px] text-center font-semibold", titleClass || "")}>
              {title}
            </p>
          )}
          {showCloseIcon && (
            <button className='flex justify-end cursor-pointer' onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div className='overflow-y-auto' style={{ height: height || "auto" }}>
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default BasicDialog;
