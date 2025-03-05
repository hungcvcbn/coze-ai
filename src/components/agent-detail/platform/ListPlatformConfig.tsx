"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListPlatformPublish } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import EditPlatformModal from "./EditPlatformModal";

const ListPlatformPublish = () => {
  const [data, setData] = useState<any>({});
  const [openEditPlatformModal, setOpenEditPlatformModal] = useState<boolean>(false);
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
    <div className='flex flex-col mt-4 mx-auto text-neutral'>
      <div className='flex items-center gap-2 mb-4'>
        <IconButton onClick={goBack}>
          <IconArrowBack />
        </IconButton>
        <div className='text-16-24 font-bold'>Cài đặt</div>
      </div>
      <div className='flex flex-col w-[800px] mb-4 rounded-lg bg-white mx-auto p-4 text-neutral'>
        <h2 className='text-16-24 font-bold mb-4'>Nền tảng hỗ trợ</h2>
        <div className='space-y-4'>
          {data?.publishedPlatforms?.map((platform: any) => (
            <div
              key={platform.name}
              className='grid grid-cols-9 gap-4 items-center justify-between p-4 border rounded-lg'
            >
              <div className='col-span-6 flex items-center gap-4'>
                <span className='text-2xl'>🌐</span>
                <div>
                  <h3 className='text-16-24 font-bold'>{platform.name}</h3>
                  <p className='text-14-20 text-gray-600'>{platform.description}</p>
                </div>
              </div>
              <div className='col-span-2 text-14-20 font-medium flex justify-end items-center gap-2'>
                Chưa kết nối
              </div>
              <div className='col-span-1 flex justify-end items-center gap-2'>
                <Tooltip title='Chọn kết nối với nền tảng' placement='top'>
                  <IconButton className='p-1' onClick={() => setOpenEditPlatformModal(true)}>
                    <MoreHorizIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        {openEditPlatformModal && (
          <EditPlatformModal open={openEditPlatformModal} setOpen={setOpenEditPlatformModal} />
        )}
      </div>
    </div>
  );
};

export default ListPlatformPublish;
