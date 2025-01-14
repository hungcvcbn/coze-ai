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
import { getAgentDetail } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { getConversationId } from "@/helpers/api/chatbot";
import { isEmpty } from "@/helpers/utils/common";

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
    const response = await getConversationId({ botId: botId?.id, tcode: "hag" });
    setConversation(response?.data);
  };
  useEffect(() => {
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
        <div className='flex justify-between h-[50px] border-b border-gray-200'>
          <div className='flex'>
            <div className='flex justify-center items-center gap-2'>
              <button className='cursor-pointer' onClick={() => router.back()}>
                <ArrowBackIosIcon sx={{ color: "#000000" }} />
              </button>
              <Image
                src={LogoImage}
                alt='Logo'
                width={40}
                height={40}
                className='rounded-[8px] object-cover w-[40px] h-[40px]'
              />
            </div>

            <div className='flex flex-col justify-start items-start px-2 pt-[2px]'>
              <div className='text-14-20 flex gap-2 font-semibold text-primary'>
                {data?.name}
                <IconButton sx={{ padding: 0, marginBottom: "4px" }} onClick={() => setOpen(true)}>
                  <BorderColorIcon sx={{ fontSize: "16px", color: "#007bff" }} />
                </IconButton>
              </div>
              <div className='flex justify-center items-center border border-[#007bff] rounded-lg p-[2px] gap-1'>
                <div>
                  <IcCheckCircle color='#007bff' />
                </div>
                <div className='text-10-12 pt-[2px] font-semibold text-[#007bff]'>Đã lưu</div>
              </div>
            </div>
          </div>
          <div className='text-14-20 font-semibold text-primary flex justify-center items-center px-2 '>
            Open AI
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
      {!isEmpty(conversation?.conversations) && (
        <div className='w-[30%] border border-gray-300 rounded-lg'>
          <ChatBox conversation={conversation} />
        </div>
      )}
      <EditCommandModal open={open} setOpen={setOpen} data={data} fetchData={fetchAgentDetail} />
    </div>
  );
};

export default ControlSetting;
