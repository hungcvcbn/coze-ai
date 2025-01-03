import React from "react";
import BasicButton from "../common/BasicButton";
import { Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { STATUS_BOT } from "@/helpers/constants/common";

interface BotCardProps {
  bot: any;
  onOpenDetail: (id: any) => void;
  onClickMenu: (event: React.MouseEvent<HTMLButtonElement>, bot: any) => void;
  setSelectedBot: (bot: any) => void;
  setOpenConfirm: (open: boolean) => void;
}

const BotCard: React.FC<BotCardProps> = ({
  bot,
  onOpenDetail,
  onClickMenu,
  setSelectedBot,
  setOpenConfirm,
}) => {
  return (
    <div
      className='border rounded-lg relative h-[180px] w-auto cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_4px_4px_gray] duration-300'
      onClick={() => onOpenDetail(bot.id)}
    >
      <div className='flex items-center gap-2 mb-2 h-[40px]' onClick={() => onOpenDetail(bot.id)}>
        <span className='text-2xl'>{bot?.avatar}</span>
        <Tooltip title={bot?.name}>
          <div className='font-semibold text-16-24 line-clamp-2 w-[350px] text-primary'>
            {bot?.name}
          </div>
        </Tooltip>
        <button
          className='absolute top-3 right-2'
          onClick={event => {
            event.stopPropagation();
            onClickMenu(event, bot);
          }}
        >
          <MoreHorizIcon sx={{ fontSize: "20px" }} />
        </button>
      </div>
      <div className='h-[80px]'>
        <p className='text-14-20 text-gray-600 mb-4 line-clamp-4'>{bot.description}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <img src='/logo.png' className='w-6 h-6 rounded-full' />
          <span className='text-14-20 text-primary font-semibold'>Coze AI</span>
        </div>
        <Tooltip title='Trạng thái công khai/ Không công khai'>
          <BasicButton
            className={`px-3 py-1 text-14-20 ${
              bot?.status === STATUS_BOT.ACTIVE
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            } rounded hover:bg-green-100 hover:border-green-600 hover:rounded-lg hover:border-[1px]`}
            onClick={event => {
              event.stopPropagation();
              setSelectedBot(bot);
              setOpenConfirm(true);
            }}
          >
            {bot?.status === STATUS_BOT.ACTIVE ? "Bật" : "Tắt"}
          </BasicButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default BotCard;
