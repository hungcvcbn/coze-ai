"use client";
import React, { useState } from "react";
import BasicButton from "../common/BasicButton";
import { Icon, IconButton, Popover, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { isEmpty } from "@/helpers/utils/common";
import TableEmpty from "../common/TableEmpty";
import { useRouter } from "next/navigation";
import { updateAgentStatus } from "@/helpers/api/control";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import ConfirmDialog from "../hook-form/ConfirmDialog";

interface Props {
  data: any;
}
const AdvancedGPT = ({ data }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdateStatus = async (isSaved?: boolean, id?: any) => {
    let params = {
      status: selectedBot?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    };
    if (isSaved) {
      try {
        await updateAgentStatus(selectedBot?.id, params);
        dispatch(
          setToast({
            message: "Cập nhật trạng thái thành công",
            type: "success",
            show: true,
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpenConfirm(false);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleOpenDetail = (id: any) => {
    router.push(`/control-panel/${id}/settings`);
  };
  return (
    <div>
      {!isEmpty(data?.items) ? (
        <TableEmpty />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data?.map((bot: any, index: any) => (
            <div
              key={index}
              className='border rounded-lg relative h-[180px] w-auto cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_10px_10px_gray] duration-300'
            >
              <div onClick={() => handleOpenDetail(bot.id)}>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='text-2xl'>{bot?.avatar}</span>
                  <h3 className='font-semibold text-16-24 '>{bot?.name}</h3>
                  <IconButton
                    aria-describedby={id}
                    className='absolute top-1 right-1'
                    onClick={handleClick}
                  >
                    <MoreHorizIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                </div>
                <div className='h-[90px]'>
                  <p className='text-14-20 text-gray-600 mb-4 line-clamp-4'>{bot.description}</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <img src='/logo.png' className='w-6 h-6 rounded-full' />
                  <span className='text-14-20 text-primary font-semibold'>Coze AI</span>
                </div>
                <Tooltip title='Trạng thái công khai/ Không công khai'>
                  <BasicButton
                    className='px-3 py-1 text-14-20 bg-green-50 text-green-600 rounded hover:bg-green-100 hover:border-green-600 hover:rounded-lg hover:border-[1px]'
                    onClick={() => {
                      setSelectedBot(bot);
                      setOpenConfirm(true);
                    }}
                  >
                    Bật
                  </BasicButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog
        open={openConfirm}
        // setOpen={setOpenConfirm}
        onClose={handleUpdateStatus}
        title='Xác nhận'
        subTitle='Bạn có chắc chắn muốn cập nhật trạng thái của bot không?'
      />
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            borderRadius: "10px",
          }}
        >
          <div className='flex flex-col w-[120px] rounded-lg bg-white'>
            <button className='text-14-20 text-neutral font-medium px-4 py-2 border-b border-gray-300 hover:bg-gray-100'>
              Cài đặt
            </button>
            <button className='text-14-20 text-neutral font-medium px-4 py-2 border-b border-gray-300 hover:bg-gray-100'>
              Công khai
            </button>
            <button className='text-14-20 text-danger font-medium px-4 py-2 hover:bg-gray-100'>
              Xóa bot
            </button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default AdvancedGPT;
