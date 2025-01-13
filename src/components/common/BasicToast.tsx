"use client";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Alert } from "@mui/material";
import { setToast } from "@/redux/slices/common";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BasicToast = () => {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector(state => state.common);
  const { show, message, type = "error", duration = 3000 } = toast;
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setToast({ show: false, message: "", type: "success" }));
  };

  if (!show) return null;

  return (
    <Snackbar
      open={show}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        maxWidth: "400px",
        minWidth: "300px",
      }}
    >
      <Alert
        icon={type === "success" ? <CheckCircleOutlineIcon /> : undefined}
        onClose={handleClose}
        severity={type}
        sx={{
          width: "100%",
          "& .MuiAlert-message": {
            width: "100%",
          },
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          backgroundColor: type === "success" ? "#E7F7ED" : "#FFF3F3",
          border: `1px solid ${type === "success" ? "#A6E4B8" : "#FFCDD2"}`,
        }}
      >
        <p
          className='text-14-20 font-bold'
          style={{
            color: type === "success" ? "#2E7D32" : "#D32F2F",
            margin: 0,
          }}
        >
          {message}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default BasicToast;
