"use client";
import React, { useState } from "react";
import { Popover } from "@mui/material";
import { isEmpty } from "@/helpers/utils/common";
import TableEmpty from "../common/TableEmpty";
import { useRouter } from "next/navigation";
import { updateAgentStatus } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import ConfirmDialog from "../hook-form/ConfirmDialog";
import BotCard from "./BotCard";

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
            message: "Update status successfully",
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {data?.map((bot: any, index: any) => (
            <BotCard
              key={index}
              bot={bot}
              onOpenDetail={handleOpenDetail}
              onClickMenu={handleClick}
              setSelectedBot={setSelectedBot}
              setOpenConfirm={setOpenConfirm}
            />
          ))}
        </div>
      )}
      <ConfirmDialog
        open={openConfirm}
        // setOpen={setOpenConfirm}
        onClose={handleUpdateStatus}
        title='Confirm'
        subTitle='Are you sure you want to update the status of the bot?'
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
              Settings
            </button>
            <button className='text-14-20 text-neutral font-medium px-4 py-2 border-b border-gray-300 hover:bg-gray-100'>
              Public
            </button>
            <button className='text-14-20 text-danger font-medium px-4 py-2 hover:bg-gray-100'>
              Delete Bot
            </button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default AdvancedGPT;
