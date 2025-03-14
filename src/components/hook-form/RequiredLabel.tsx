import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type Props = {
  children: ReactNode;
  isRequired?: boolean;
};

function RequiredLabel({ children, isRequired }: Props) {
  return (
    <div className='flex flex-row'>
      <p className='text-14-20 text-neutral font-inter-600'>{children}</p>
      {isRequired && (
        <Box sx={{ color: "error.main" }} component='span'>
          &nbsp;*
        </Box>
      )}
    </div>
  );
}

export default RequiredLabel;
