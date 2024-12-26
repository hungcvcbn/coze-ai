import { DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BasicDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "12px 16px 0px 16px",
  borderTop: "1px solid #E5E7EB",
  position: "sticky",
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 10,
}));

export default BasicDialogActions;
