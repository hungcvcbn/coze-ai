"use client";
import React, { useState } from "react";
import SelectField from "../hook-form/SelectField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ControlCommand = () => {
  return (
    <div className='flex flex-col gap-2 pt-4'>
      <div className='flex gap-2 justify-between'>
        <div className='flex gap-2'>
          <div className='text-16-24 pt-3 font-semibold text-neutral'>Lệnh điều khiển:</div>
          <div className='w-[120px]'>
            <SelectField
              size='small'
              options={[
                { value: "basic", label: "Cơ bản" },
                { value: "custom", label: "Tuỳ chỉnh" },
              ]}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className='flex gap-4 justify-end pt-1'>
          <div className='text-14-20 flex justify-center items-center font-semibold text-primary border border-primary rounded-[4px] px-2 py-1 cursor-pointer'>
            Tối ưu
          </div>
          <div className='text-14-20 flex justify-center items-center font-semibold text-primary gap-1 px-2 py-1 cursor-pointer'>
            <AddCircleOutlineIcon />
            Lệnh mẫu
          </div>
        </div>
      </div>

      <div className='text-14-20 text-gray-500'>
        # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone.
        Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng
        ngôn ngữ của họ.
      </div>
    </div>
  );
};

export default ControlCommand;
