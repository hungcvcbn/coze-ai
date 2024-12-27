"use client";
import React from "react";
import BasicButton from "../common/BasicButton";
import { Popover, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface Props {
  data: any;
}
const BasicControlList = ({ data }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
      {data?.map((bot: any, index: any) => (
        <div
          key={index}
          className='border rounded-lg relative h-[180px] min-w-[300px] cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_10px_10px_gray] duration-300'
        >
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-2xl'>{bot?.avatar}</span>
            <h3 className='font-semibold text-16-24 '>{bot?.name}</h3>
            <button aria-describedby={id} className='absolute top-1 right-1' onClick={handleClick}>
              <MoreHorizIcon sx={{ fontSize: "20px" }} />
            </button>
          </div>
          <div className='h-[100px]'>
            <p className='text-14-20 text-gray-600 mb-4 line-clamp-4'>{bot.description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <img src='/logo.png' className='w-6 h-6 rounded-full' />
              <span className='text-14-20 text-primary font-semibold'>Coze AI</span>
            </div>
            <Tooltip title='Trạng thái công khai/ Không công khai'>
              <BasicButton className='px-3 py-1 text-14-20 bg-green-50 text-green-600 rounded hover:bg-green-100 hover:border-green-600 hover:rounded-lg hover:border-[1px]'>
                Bật
              </BasicButton>
            </Tooltip>
          </div>
        </div>
      ))}
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

export default BasicControlList;
