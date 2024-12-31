import React from "react";
import { ReduxProvider } from "@/redux/redux-provider";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/helpers/config/theme";
import BasicToast from "@/components/common/BasicToast";
import LayoutDetail from "@/components/layout/LayoutDetail";

export default function ControlPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <LayoutDetail>{children}</LayoutDetail>
        <BasicToast />
      </ThemeProvider>
    </ReduxProvider>
  );
}
