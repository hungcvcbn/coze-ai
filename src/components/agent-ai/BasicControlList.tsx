"use client";
import React from "react";
import { Popover } from "@mui/material";
import { updateAgentStatus } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import ConfirmDialog from "../hook-form/ConfirmDialog";
import { STATUS_BOT } from "@/helpers/constants/common";
import CommonSkeleton from "../common/Skeleton";
import { useRouter } from "next/navigation";
import BotCard from "./BotCard";
import { isEmpty } from "@/helpers/utils/common";
import TableEmpty from "../common/TableEmpty";

interface Props {
  data: any;
  loading: boolean;
  fetchData: () => void;
}
const BasicControlList = ({ data, loading, fetchData }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [selectedBot, setSelectedBot] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, bot: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBot(bot);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenDetail = (id: any) => {
    router.push(`/control-panel/${id}/settings`);
  };
  const handleUpdateStatus = async (isSaved?: boolean) => {
    let params = {
      status: selectedBot?.status === STATUS_BOT.ACTIVE ? STATUS_BOT.INACTIVE : STATUS_BOT.ACTIVE,
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
        setOpenConfirm(false);
        fetchData();
      } catch (error: any) {
        dispatch(
          setToast({
            message: error?.message,
            type: "error",
            show: true,
          })
        );
      }
    } else {
      setOpenConfirm(false);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {loading ? (
        <CommonSkeleton itemCount={16} />
      ) : isEmpty(data) ? (
        <TableEmpty />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {data?.map((bot: any, index: any) => (
            <BotCard
              key={index}
              bot={bot}
              onOpenDetail={() => {
                setSelectedBot(bot);
                handleOpenDetail(bot.id);
              }}
              onClickMenu={handleClick}
              setSelectedBot={setSelectedBot}
              setOpenConfirm={setOpenConfirm}
            />
          ))}
        </div>
      )}

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
            {selectedBot?.status === STATUS_BOT.ACTIVE && (
              <button className='text-14-20 text-neutral font-medium px-4 py-2 border-b border-gray-300 hover:bg-gray-100'>
                Công khai
              </button>
            )}
            <button className='text-14-20 text-danger font-medium px-4 py-2 hover:bg-gray-100'>
              Xóa bot
            </button>
          </div>
        </Popover>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleUpdateStatus}
        title='Xác nhận'
        subTitle='Bạn có chắc chắn muốn cập nhật trạng thái của bot không?'
      />
    </div>
  );
};

export default BasicControlList;
