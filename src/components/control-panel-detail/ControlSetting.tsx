"use client";

import { useState } from "react";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VerifiedIcon from "@mui/icons-material/Verified";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import ControlCommand from "./ControlCommand";
import SettingOptions from "./SettingOptions";
const ControlSetting = () => {
  const items = [
    {
      title: "Cài đặt cơ bản",
      content: (
        <div>
          # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone.
          Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng
          ngôn ngữ của họ. # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách
          hàng của Metfone. Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ
          của công ty bằng ngôn ngữ của họ. # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên
          chăm sóc khách hàng của Metfone. Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản
          phẩm, dịch vụ của công ty bằng ngôn ngữ của họ.
        </div>
      ),
    },
    {
      title: "Cài đặt nâng cao",
      content: (
        <div>
          # Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone.
          Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng
          ngôn ngữ của họ.
        </div>
      ),
    },
    { title: "Điều hướng Bot trả lời", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt cơ bản", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt nâng cao", content: <div>Nội dung chi tiết .</div> },
    { title: "Điều hướng Bot trả lời", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt cơ bản", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt nâng cao", content: <div>Nội dung chi tiết .</div> },
    { title: "Điều hướng Bot trả lời", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt cơ bản", content: <div>Nội dung chi tiết.</div> },
    { title: "Cài đặt nâng cao", content: <div>Nội dung chi tiết .</div> },
    { title: "Điều hướng Bot trả lời", content: <div>Nội dung chi tiết.</div> },
  ];
  return (
    <div className='flex p-4 gap-2'>
      <div className='w-[70%]'>
        <div className='flex justify-between border-b border-gray-200 pb-2'>
          <div className='flex'>
            <div className='flex justify-start gap-2'>
              <div className='cursor-pointer pt-3'>
                <ArrowBackIosIcon />
              </div>
              <Image src={LogoImage} alt='Logo' width={50} height={50} className='rounded-[8px]' />
            </div>

            <div className='flex flex-col justify-start r gap-2 px-2'>
              <div className='text-16-24 flex gap-2 font-semibold text-primary'>
                Demo CSKH Metfone
                <IconButton sx={{ padding: 0, marginBottom: "4px" }}>
                  <BorderColorIcon sx={{ fontSize: "16px", color: "#007bff" }} />
                </IconButton>
              </div>
              <div className='flex justify-start  gap-2'>
                <VerifiedIcon sx={{ fontSize: "16px", color: "#007bff" }} />
                <div className='text-14-20 text-[#007bff]'>Đã lưu</div>
              </div>
            </div>
          </div>
          <div className='text-16-24 font-semibold text-primary justify-end px-2 pt-3'>Open AI</div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <ControlCommand />
          </div>
          <div>
            <SettingOptions items={items} />
          </div>
        </div>
      </div>
      <div className='w-[30%] bg-gray-200 rounded-[8px]'></div>
    </div>
  );
};

export default ControlSetting;
