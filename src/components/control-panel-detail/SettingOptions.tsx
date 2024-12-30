"use client";
import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Switch from "@mui/material/Switch";

type ListItem = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const SettingOptions = () => {
  const [collapseStates, setCollapseStates] = useState<Record<number, boolean>>({});
  const [checkedStates, setCheckedStates] = useState<Record<number, boolean>>({});
  const handleChange = (index: number) => {
    setCheckedStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleCollapse = (index: number) => {
    setCollapseStates(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderSettingBasic = () => {
    const settings = [
      { label: "Phân tích hình ảnh", help: "⭕" },
      { label: "Chọn dữ liệu huấn luyện khi hỏi đáp", help: "⭕" },
      { label: "Đọc câu trả lời của bot", help: "⭕" },
      { label: "Sinh câu gợi ý", help: "⭕" },
      { label: "Sinh câu gợi ý từ dữ liệu FAQ", help: "⭕" },
      { label: "Tạo hình ảnh", help: "⭕" },
      { label: "Kết nối dữ liệu internet", help: "⭕" },
      { label: "Câu chào tự nhiên", help: "⭕" },
    ];

    return (
      <div className='flex flex-col gap-4'>
        {settings.map((setting, index) => (
          <div key={index} className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              {setting.label}
              <span className='cursor-help'>{setting.help}</span>
            </div>
            <div>
              <Switch
                checked={checkedStates[index] || false}
                onChange={() => handleChange(index)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const items: ListItem[] = [
    {
      title: "Cài đặt cơ bản",
      content: <div>{renderSettingBasic()}</div>,
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
    <div className='flex flex-col'>
      <div className='mt-4'>
        {items.map((item, index) => (
          <div key={index} className='border-b'>
            <div
              className='flex justify-between items-center cursor-pointer text-16-24 font-semibold h-[55px] bg-gray-100 px-2 py-1 rounded-[4px] text-neutral'
              onClick={() => toggleCollapse(index)}
            >
              {item.title}
              {collapseStates[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div
              className={`mt-2 text-14-20 text-neutral transition-all duration-1000 ease-in-out overflow-hidden ${
                collapseStates[index] ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {collapseStates[index] && <div className='pb-4 px-2'>{item.content}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingOptions;
