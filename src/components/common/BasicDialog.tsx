import Dialog, { DialogProps } from "@mui/material/Dialog";
import clsx from "clsx";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface BasicDialogProps extends DialogProps {
  title?: string;
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  showCloseIcon?: boolean;
  titleClass?: string;
  contentClassContainer?: string;
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
          overflow: "hidden",
          "& ::-webkit-scrollbar": {
            width: "8px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: "#C6C6C6",
            borderRadius: "4px",
          },
          "& ::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#C6C6C6",
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
            <p
              className={clsx(
                "text-20-28 text-center text-neutral font-sans font-semibold",
                titleClass || ""
              )}
            >
              {title}
            </p>
          )}
          {showCloseIcon && (
            <button className='flex justify-end cursor-pointer' onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div className='overflow-y-auto h-auto'>{children}</div>
      </div>
    </Dialog>
  );
};

export default BasicDialog;
