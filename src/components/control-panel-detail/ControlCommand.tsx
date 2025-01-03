"use client";
import React, { useState } from "react";
import SelectField from "../hook-form/SelectField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TYPE_COMMAND } from "@/helpers/constants/common";
import SampleCommand from "./SampleCommand";
const ControlCommand = () => {
  const [value, setValue] = useState<string | number>("basic");
  const [open, setOpen] = useState(false);
  const handleChange = (value: string | number) => {
    setValue(value);
  };
  return (
    <div className='flex flex-col gap-2 pt-4 bg-white'>
      <div className='flex gap-2 justify-between'>
        <div className='flex gap-2'>
          <div className='text-16-24 pt-3 font-semibold text-neutral'>Lệnh điều khiển:</div>
          <div className='w-[120px]'>
            <SelectField options={TYPE_COMMAND} value={value} onChange={handleChange} />
          </div>
        </div>
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

      <div className='text-14-20 text-gray-500'>
        # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone.
        Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng
        AddCircleOutlineIcon class="circle ngôn ngữ của họ.
      </div>
      <SampleCommand open={open} setOpen={setOpen} />
    </div>
  );
};

export default ControlCommand;
