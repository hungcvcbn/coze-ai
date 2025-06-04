"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListPlatformPublish } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";

import IconArrowBack from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { Avatar, IconButton, Tooltip } from "@mui/material";
import EditPlatformModal from "./EditPlatformModal";
import { IconZalo } from "@/components/common/IconCommon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ConfigTokenPlatform from "./ConfigTokenPlatform";

const PlatformIcon = ({ name }: { name: string }) => {
  if (name === "WhatsApp") {
    return (
      <Avatar sx={{ bgcolor: "#25D366", width: 40, height: 40 }}>
        <WhatsAppIcon style={{ color: "white" }} />
      </Avatar>
    );
  }

  if (name === "Zalo") {
    return <IconZalo width={40} height={40} />;
  }

  return <Avatar sx={{ bgcolor: "grey.300", width: 40, height: 40 }}>🌐</Avatar>;
};

const ListPlatformPublish = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openModalConfigure, setOpenModalConfigure] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    publishedPlatforms: [
      {
        name: "Zalo",
        description: "Kết nối chatbot với nền tảng Zalo",
        status: "not_connected",
      },
      {
        name: "WhatsApp",
        description: "Kết nối chatbot với nền tảng WhatsApp",
        status: "not_connected",
      },
    ],
  });

  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const fetchListPlatformPublish = async () => {
    try {
      const res = await getListPlatformPublish(id);
      const defaultPlatforms = [
        {
          name: "Zalo",
          description: "Kết nối chatbot với nền tảng Zalo",
          status: "not_connected",
        },
        {
          name: "WhatsApp",
          description: "Kết nối chatbot với nền tảng WhatsApp",
          status: "not_connected",
        },
      ];

      const existingPlatforms = res.data?.publishedPlatforms || [];
      const platformNames = existingPlatforms.map((p: any) => p.name);

      defaultPlatforms.forEach(platform => {
        if (!platformNames.includes(platform.name)) {
          existingPlatforms.push(platform);
        }
      });

      setData({
        ...res.data,
        publishedPlatforms: existingPlatforms,
      });
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
    <div className='flex flex-col mt-4 mx-auto text-neutral'>
      <div className='flex items-center gap-2 mb-4 px-2'>
        <IconButton onClick={goBack}>
          <IconArrowBack />
        </IconButton>
        <div className='text-16-24 font-sans font-semibold'>Setup</div>
      </div>
      <div className='flex flex-col w-[1200px] mb-4 rounded-lg bg-white mx-auto p-4 text-neutral'>
        <h2 className='text-20-28 font-sans font-semibold mb-4'>Support Platforms</h2>
        <div className='space-y-4'>
          {data?.publishedPlatforms?.map((platform: any) => (
            <div
              key={platform.name}
              className='grid grid-cols-9 gap-4 items-center p-4 border rounded-lg'
            >
              <div className='col-span-7 flex items-center gap-4'>
                <PlatformIcon name={platform.name} />
                <div>
                  <h3 className='text-16-24 font-sans font-semibold'>{platform.name}</h3>
                  <p className='text-14-20 font-sans text-neutral'>{platform.description}</p>
                </div>
              </div>
              {/* <div
                className={`col-span-2 text-14-20 font-sans font-medium flex justify-center items-center gap-2 ${
                  platform.status === "connected"
                    ? "text-green-500 bg-green-50 rounded-lg px-4 py-2"
                    : "text-red-500 bg-red-50 rounded-lg px-4 py-2"
                }`}
              >
                {platform.status === "connected" ? "Đã kết nối" : "Chưa kết nối"}
              </div> */}
              <div className='col-span-1 flex justify-end items-center gap-2'>
                <button
                  className='cursor-pointer bg-primary hover:opacity-80 text-white rounded-lg px-4 py-2 col-span-1 text-14-20 font-sans font-medium flex justify-center items-center gap-2'
                  onClick={() => setOpenModalConfigure(true)}
                >
                  Configure
                </button>
              </div>
              <div className='col-span-1 flex justify-end items-center gap-2'>
                <Tooltip title='Select connect to platform' placement='top'>
                  <IconButton className='p-1' onClick={() => setOpen(true)}>
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
          <ConfigTokenPlatform open={openModalConfigure} setOpen={setOpenModalConfigure} />
          <EditPlatformModal open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default ListPlatformPublish;
