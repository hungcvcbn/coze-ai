"use client";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SampleCommand from "./SampleCommand";
interface IControlCommand {
  data: any;
}
const ControlCommand = ({ data }: IControlCommand) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2 pt-4 bg-white'>
      <div className='flex gap-2 justify-end'>
        <div className='flex gap-4 justify-end pt-1'>
          <div className='text-14-20 flex justify-center items-center font-semibold text-primary border border-primary rounded-[10px] px-2 py-1 cursor-pointer'>
            Tối ưu
          </div>
          <button
            className='text-14-20 flex justify-center items-center font-semibold text-primary gap-1 px-2 py-1 cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlineIcon />
            Lệnh mẫu
          </button>
        </div>
      </div>

      <div className='text-14-20 text-gray-500'>{data?.description}</div>
      <SampleCommand open={open} setOpen={setOpen} />
    </div>
  );
};

export default ControlCommand;
