"use client";
import React from "react";
import BasicButton from "../common/BasicButton";
import { Popover, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { isEmpty } from "@/helpers/utils/common";
import TableEmpty from "../common/TableEmpty";
import { updateAgentStatus } from "@/helpers/api/control";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import ConfirmDialog from "../hook-form/ConfirmDialog";
import { STATUS_BOT } from "@/helpers/constants/common";
import CommonSkeleton from "../common/Skeleton";

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, bot: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBot(bot);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <CommonSkeleton itemCount={data?.length} />
      ) : isEmpty(data) ? (
        <TableEmpty />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
          {data?.map((bot: any, index: any) => (
            <div
              key={index}
              className='border rounded-lg relative h-[180px] w-auto cursor-pointer p-2 bg-white border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_10px_10px_gray] duration-300'
            >
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-2xl'>{bot?.avatar}</span>
                <Tooltip title={bot?.name}>
                  <h3 className='font-semibold text-16-24 line-clamp-1 text-primary'>
                    {bot?.name}
                  </h3>
                </Tooltip>
                <button
                  aria-describedby={id}
                  className='absolute top-1 right-1'
                  onClick={event => handleClick(event, bot)}
                >
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
                  <BasicButton
                    className={`px-3 py-1 text-14-20 ${
                      bot?.status === STATUS_BOT.ACTIVE
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    } rounded hover:bg-green-100 hover:border-green-600 hover:rounded-lg hover:border-[1px]`}
                    onClick={() => {
                      setSelectedBot(bot);
                      setOpenConfirm(true);
                    }}
                  >
                    {bot?.status === STATUS_BOT.ACTIVE ? "Bật" : "Tắt"}
                  </BasicButton>
                </Tooltip>
              </div>
            </div>
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
