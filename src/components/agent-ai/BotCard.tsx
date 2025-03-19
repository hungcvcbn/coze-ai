import React from "react";
import { Tooltip } from "@mui/material";
import { STATUS_BOT } from "@/helpers/constants/common";
import LogoZenee from "@/assets/icons/logo.svg";
import { IconMenu } from "../common/IconCommon";
import CustomSwitch from "../common/CustomSwitch";
import PaidIcon from "@mui/icons-material/Paid";
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
      className={`border rounded-lg relative h-auto md:h-[160px] w-auto cursor-pointer p-4  hover:transform hover:translate-x-[-2px] hover:shadow-[0_4px_4px_gray] duration-300 ${
        bot?.status === STATUS_BOT.ACTIVE
          ? "bg-primary-50 border-primary"
          : "bg-gray-50 border-gray-300"
      }`}
      onClick={() => onOpenDetail(bot.id)}
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center pt-2 min-w-[40px]'>
              <img src={LogoZenee?.src} alt='Bot Avatar' className='w-10 h-10 rounded-lg' />
            </div>

            <div className='flex flex-col justify-center'>
              <Tooltip title={bot?.name}>
                <div className='font-medium text-16-24 text-neutral line-clamp-2'>{bot?.name}</div>
              </Tooltip>
              <span className='text-[13px] text-gray-500 line-clamp-2' title={bot.description}>
                {bot.description}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex justify-between items-center gap-2'>
          <button
            onClick={event => {
              event.stopPropagation();
              onClickMenu(event, bot);
            }}
            className='p-2'
          >
            <IconMenu width={20} height={20} />
          </button>
          {bot.status && (
            <div
              onClick={event => {
                event.stopPropagation();
                setSelectedBot(bot);
                setOpenConfirm(true);
              }}
            >
              <CustomSwitch
                label={bot?.status === STATUS_BOT.ACTIVE ? "Active" : "Off"}
                checked={bot?.status === STATUS_BOT.ACTIVE}
              />
            </div>
          )}
        </div>
        {(bot?.price || bot?.isFree) && (
          <div className='flex items-center gap-2 border-t border-gray-300 py-2 w-[100pz]'>
            <span className='text-14-20 text-neutral font-bold flex items-center gap-1'>
              <PaidIcon sx={{ fontSize: "16px" }} color={bot.price === 0 ? "success" : "error"} />
              {bot?.isFree ? (
                <div className='text-14-20 text-success font-bold'>Free</div>
              ) : (
                <div className='text-14-20 text-danger font-bold'>
                  {bot?.price?.toLocaleString()} VND
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotCard;
