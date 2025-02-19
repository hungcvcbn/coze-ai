"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListPlatformPublish } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
const platforms = [
  {
    name: "Website",
    icon: "🌐",
    description: "Tương tác tự động với người dùng trên website của (Chrome, Safari, Firefox, v.v)",
  },
  {
    name: "Facebook",
    icon: "📘",
    description:
      "Trò chuyện với bot của bạn trên Messenger FanPage và Auto trả lời Comment của người dùng",
  },
  {
    name: "Viber",
    icon: "📱",
    description: "Tương tác với người dùng trong kênh riêng tư, trò chuyện nhóm và kênh Viber",
  },
  {
    name: "Zalo OA",
    icon: "💬",
    description: "Tương tác với tự động với người dùng Zalo OA",
  },
  {
    name: "Telegram",
    icon: "✈️",
    description: "Tương tác với người dùng trong kênh riêng tư, trò chuyện nhóm và kênh Telegram",
  },
  {
    name: "Mindmaid Chợ Bot",
    icon: "🤖",
    description:
      "Bot sẽ xuất hiện trong Mindmaid Chợ Bot. Mang lại nhiều niềm tin và lưu lượng truy cập hơn cho bot của bạn!",
  },
];

const ListPlatformPublish = () => {
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const fetchListPlatformPublish = async () => {
    try {
      const res = await getListPlatformPublish(id);
      setData(res.data);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error?.message,
          type: "error",
          show: true,
        })
      );
    }
  };

  useEffect(() => {
    fetchListPlatformPublish();
  }, []);
  return (
    <div className='flex flex-col mx-auto text-neutral'>
      <div className='flex items-center gap-2 mb-4 pt-4'>
        <IconButton onClick={goBack}>
          <IconArrowBack />
        </IconButton>
        <div className='text-16-24 font-bold'>Cài đặt</div>
      </div>
      <div className='flex flex-col mb-4 rounded-lg bg-white mx-auto h-screen p-4 text-neutral'>
        <h2 className='text-16-24 font-bold mb-4'>Nền tảng hỗ trợ</h2>
        <div className='space-y-4'>
          {platforms.map(platform => (
            <div
              key={platform.name}
              className='grid grid-cols-7 gap-4 items-center justify-between p-4 border rounded-lg'
            >
              <div className='col-span-5 flex items-center gap-4'>
                <span className='text-2xl'>{platform.icon}</span>
                <div>
                  <h3 className='text-16-24 font-bold'>{platform.name}</h3>
                  <p className='text-14-20 text-gray-600'>{platform.description}</p>
                </div>
              </div>
              <div className='col-span-1 flex justify-end items-center gap-2 hover:opacity-80 hover:cursor-pointer'>
                <span className='text-primary text-14-20 font-semibold'>Chưa kết nối</span>
              </div>
              <div className='col-span-1 flex justify-end items-center gap-2'>
                <Tooltip title='Chọn kết nối với nền tảng' placement='top'>
                  <IconButton className='p-1'>
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-medium mb-4'>Link chia sẻ</h2>
          <div className='flex items-center justify-between p-4 border rounded-lg'>
            <span className='text-gray-600'>
              https://mindmaid.ai/preview-section/v4H2LlFPeQHfdvmHHYUYAr
            </span>
            <button className='p-1'>📋</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPlatformPublish;
