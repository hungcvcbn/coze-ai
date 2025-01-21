"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import ControlCommand from "./ControlCommand";
import SettingOptions from "./SettingOptions";
import { useParams, useRouter } from "next/navigation";
import EditCommandModal from "./EditCommandModal";
import { IcCheckCircle } from "../common/IconCommon";
import ChatBox from "./ChatBox";
import { getAgentDetail, resetConversation } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { getConversationId } from "@/helpers/api/chatbot";
import { isEmpty } from "@/helpers/utils/common";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
const ControlSetting = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [conversation, setConversation] = useState<any>({});
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
    setConversation(response?.data);
  };

  const resetConversationAgent = async () => {
    try {
      await resetConversation({ botId: botId?.id });
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };
  useEffect(() => {
    if (isEmpty(conversation?.conversations)) {
      resetConversationAgent();
    }
    getConversation();
  }, []);
  useEffect(() => {
    fetchAgentDetail();
  }, []);
  return (
    <div className='flex p-4 gap-2 bg-white'>
      <div
        className={`w-[70%] bg-white border border-gray-200 rounded-lg p-4 ${
          !isEmpty(conversation?.conversations) ? "w-[70%]" : "w-[100%]"
        }`}
      >
        <div className='flex justify-between h-[80px] border-b border-gray-200'>
          <div className='flex'>
            <div className='flex justify-center items-center gap-3'>
              <button className='cursor-pointer p-1' onClick={() => router.back()}>
                <ArrowBackIosIcon sx={{ color: "#000000", fontSize: "20px" }} />
              </button>
              <Image
                src={LogoImage}
                alt='Logo'
                width={44}
                height={44}
                className='rounded-[8px] object-cover w-[60px] h-[60px]'
              />
            </div>

            <div className='flex flex-col justify-center px-3'>
              <div className='text-16-24 flex items-center gap-2 font-semibold text-primary mb-1'>
                {data?.name}
                <IconButton sx={{ padding: "2px" }} onClick={() => setOpen(true)}>
                  <BorderColorIcon sx={{ fontSize: "16px", color: "#007bff" }} />
                </IconButton>
              </div>
              {data?.status === "ACTIVE" ? (
                <div className='flex items-center border border-success w-fit rounded-lg px-2 py-1 gap-1 bg-success-50'>
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
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <ControlCommand data={data} />
          </div>
          <div>
            <SettingOptions data={data} />
          </div>
        </div>
      </div>

      <div className='w-[30%] border border-gray-300 rounded-lg'>
        <ChatBox conversation={conversation} />
      </div>

      <EditCommandModal open={open} setOpen={setOpen} data={data} fetchData={fetchAgentDetail} />
    </div>
  );
};

export default ControlSetting;
