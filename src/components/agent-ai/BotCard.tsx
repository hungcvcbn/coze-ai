import React from "react";
import BasicButton from "../common/BasicButton";
import { Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { STATUS_BOT } from "@/helpers/constants/common";
import LogoZenee from "@/assets/icons/logo.png";
import Image from "next/image";
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
      className='border rounded-lg relative h-[186px] w-auto cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_4px_4px_gray] duration-300'
      onClick={() => onOpenDetail(bot.id)}
    >
      <div className='flex justify-between items-center gap-2 mb-2 h-[40px] relative'>
        <div
          className='flex items-center w-full gap-2 flex-grow overflow-hidden'
          onClick={() => onOpenDetail(bot.id)}
        >
          <span className='text-16-24'>{bot?.avatar}</span>
          <Tooltip title={bot?.name}>
            <div className='font-semibold text-16-24 line-clamp-2 w-[calc(100%-40px)] text-neutral font-sans'>
              {bot?.name}
            </div>
          </Tooltip>
        </div>
        <button
          className='absolute top-1/2 right-0 transform -translate-y-1/2 w-[40px]'
          onClick={event => {
            event.stopPropagation();
            onClickMenu(event, bot);
          }}
        >
          <MoreHorizIcon sx={{ fontSize: "20px", color: "#000" }} />
        </button>
      </div>

      <div className='h-[80px]'>
        <p className='text-14-20 text-gray-600 mb-4 line-clamp-4'>{bot.description}</p>
      </div>
      <div className='flex items-center justify-between py-2'>
        <div className='flex items-center gap-1'>
          <Image src={LogoZenee} alt='Zenee AI' width={20} height={20} className='rounded-lg' />
          <span className='text-14-20 font-sans font-semibold text-primary'>Zenee AI</span>
        </div>
        <Tooltip title='Trạng thái công khai/ Không công khai'>
          <BasicButton
            className={`px-3 py-1 text-14-20 font-sans ${
              bot?.status === STATUS_BOT.ACTIVE
                ? "bg-green-50 text-success"
                : "bg-danger-50 hover:bg-danger-50 hover:border-danger hover:border-[1px] text-danger"
            } rounded hover:bg-green-100 hover:border-success hover:rounded-lg hover:border-[1px]`}
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
