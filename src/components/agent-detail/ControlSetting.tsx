"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import PersonalPrompt from "./PersonalPrompt";
import SettingOptions from "./SettingOptions";
import { useParams, useRouter } from "next/navigation";
import EditAgentName from "./EditAgentName";
import { IcCheckCircle } from "../common/IconCommon";
import ChatBox from "./ChatBox";
import { getAgentDetail } from "@/helpers/api/agent";
import { loadConversation } from "@/helpers/api/chatbot";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { getConversationId } from "@/helpers/api/chatbot";
import { isEmpty } from "@/helpers/utils/common";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
const ControlSetting = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [conversation, setConversation] = useState<any>([]);
  const dispatch = useAppDispatch();
  const botId = useParams();

  const fetchAgentDetail = async () => {
    try {
      const response = await getAgentDetail(botId?.id as string);
      setData(response?.data);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
  const getConversation = async () => {
    const response = await getConversationId({ botId: botId?.id });
    setConversation(response?.data?.conversations);
  };

  const loadConversationAgent = async () => {
    try {
      let params = {
        botId: botId?.id as string,
        conversationId: conversation ? conversation[0] : undefined,
      };
      await loadConversation(params);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: "error",
          show: true,
        })
      );
    }
  };
  useEffect(() => {
    fetchAgentDetail();
    getConversation();
  }, []);
  useEffect(() => {
    if (!isEmpty(conversation)) {
      loadConversationAgent();
    }
  }, [conversation]);

  return (
    <div className='grid grid-cols-12 gap-2 p-4 bg-white'>
      <div className='col-span-12 lg:col-span-4 lg:sticky lg:top-[64px] h-auto lg:h-[calc(100vh-104px)] bg-white border border-gray-200 rounded-lg px-4 pb-4'>
        <div className='flex justify-between h-[80px] border-b border-gray-200'>
          <div className='flex'>
            <div className='flex justify-center items-center gap-3'>
              <button className='cursor-pointer p-1' onClick={() => router.back()}>
                <ArrowBackIosIcon sx={{ color: "#000000", fontSize: "20px" }} />
              </button>
              <Image
                src={LogoImage}
                alt='Logo'
                width={30}
                height={30}
                className='rounded-[8px] object-cover w-[60px] h-[60px]'
              />
            </div>

            <div className='flex flex-col justify-center px-3'>
              <div className='text-14-20 flex items-center gap-2 font-semibold text-primary'>
                {data?.name}
                <IconButton onClick={() => setOpen(true)}>
                  <EditNoteIcon sx={{ fontSize: "20px", color: "#6A5ACD" }} />
                </IconButton>
              </div>
              {data?.status === "ACTIVE" ? (
                <div className='flex items-center border border-success w-fit rounded-lg px-2 gap-1 bg-success-50'>
                  <div>
                    <IcCheckCircle color='#22C55E' width={16} height={16} />
                  </div>
                  <div className='text-12-18 font-semibold text-success'>Đang bật</div>
                </div>
              ) : (
                <div className='flex items-center border border-danger w-fit rounded-lg px-2 gap-1 bg-danger-50'>
                  <div>
                    <ThumbDownOffAltIcon sx={{ color: "#EF4444", fontSize: "16px", padding: 0 }} />
                  </div>
                  <div className='text-12-18 font-semibold text-danger'>Đã tắt</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <PersonalPrompt data={data} fetchAgentDetail={fetchAgentDetail} />
        </div>
      </div>

      <div className='col-span-12 lg:col-span-5 h-auto border border-gray-200 rounded-lg'>
        <SettingOptions data={data} />
      </div>

      <div className='col-span-12 lg:col-span-3 lg:sticky lg:top-[64px] h-auto lg:h-[calc(100vh-104px)] border border-gray-200 rounded-lg'>
        <ChatBox conversation={conversation} />
      </div>

      <EditAgentName open={open} setOpen={setOpen} data={data} fetchData={fetchAgentDetail} />
    </div>
  );
};

export default ControlSetting;
