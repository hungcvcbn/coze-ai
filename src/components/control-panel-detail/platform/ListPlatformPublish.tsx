"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListPlatformPublish } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import BasicButton from "@/components/common/BasicButton";
interface Props {
  open: any;
  setOpen: any;
}
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

const ListPlatformPublish = ({ open, setOpen }: Props) => {
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
    <BasicDialog
      maxWidth='lg'
      open={open}
      onClose={() => setOpen(false)}
      title='Thông tin Publish'
      showCloseIcon
    >
      <BasicDialogContent>
        <div className='flex flex-col mx-auto text-neutral'>
          <div className='flex flex-col mb-4 rounded-lg bg-white mx-auto p-4 text-neutral'>
            <h2 className='text-16-24 font-bold mb-4'>Nền tảng hỗ trợ</h2>
            <div className='space-y-4'>
              {platforms.map(platform => (
                <div
                  key={platform.name}
                  className='grid grid-cols-7 gap-4 items-center justify-between p-4 border rounded-lg'
                >
                  <div className='col-span-6 flex items-center gap-4'>
                    <span className='text-2xl'>{platform.icon}</span>
                    <div>
                      <h3 className='text-16-24 font-bold'>{platform.name}</h3>
                      <p className='text-14-20 text-gray-600'>{platform.description}</p>
                    </div>
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
      </BasicDialogContent>
      <BasicDialogActions>
        <BasicButton variant='outlined' type='button' onClick={() => setOpen(false)}>
          Quay lại
        </BasicButton>
        <BasicButton variant='contained'> Publish</BasicButton>
      </BasicDialogActions>
    </BasicDialog>
  );
};

export default ListPlatformPublish;
