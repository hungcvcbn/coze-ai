"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { searchBotStore } from "@/helpers/api/botStore";
import CustomTextField from "../hook-form/CustomTextField";
import CommonSkeleton from "../common/Skeleton";

import BotCard from "../agent-ai/BotCard";
import { Popover } from "@mui/material";
import { STATUS_BOT } from "@/helpers/constants/common";
const BotStore = () => {
  const [data, setData] = useState<any>();
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  
  const handleChangeTerm = (e: any) => {
    setTerm(e.target.value);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await searchBotStore();
      setData(response.data.items);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error.message, show: true }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, bot: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBot(bot);
  };
  return (
    <div className='flex flex-col text-neutral font-sans'>
      <div className='flex items-center justify-between sticky z-10 p-0 top-0'>
        <div className='px-4 py-2 w-full bg-white'>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomTextField
                label='Search'
                placeholder='Enter product name'
                sx={{ backgroundColor: "white" }}
                value={term}
                onChange={handleChangeTerm}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='p-4'>
        {loading ? (
          <CommonSkeleton itemCount={16} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {data?.map((bot: any, index: any) => (
              <div key={index}>
                <BotCard
                  key={index}
                  bot={bot}
                  onOpenDetail={() => {}}
                  onClickMenu={handleClick}
                  setSelectedBot={setSelectedBot}
                  setOpenConfirm={() => {}}
                />
              </div>
            ))}
          </div>
        )}
      </div>
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
            {selectedBot?.status === STATUS_BOT.ACTIVE && (
              <button className='text-14-20 text-neutral font-medium px-4 py-2 border-b border-gray-300 hover:bg-gray-100'>
                Public
              </button>
            )}
            <button className='text-14-20 text-danger font-medium px-4 py-2 hover:bg-gray-100'>
              Delete Bot
            </button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default BotStore;
