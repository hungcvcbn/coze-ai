"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { isEmpty } from "@/helpers/utils/common";
import TableEmpty from "../common/TableEmpty";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import { searchBotStore } from "@/helpers/api/botStore";
import CustomTextField from "../hook-form/CustomTextField";
import PaidIcon from "@mui/icons-material/Paid";
import CommonSkeleton from "../common/Skeleton";

const BotStore = () => {
  const [data, setData] = useState<any>();
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChangeTerm = (e: any) => {
    setTerm(e.target.value);
  };

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
  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between sticky z-10 p-0' style={{ top: "64px" }}>
        <div className='flexgap-2 px-4 py-2 w-full bg-gray-50'>
          <Grid container spacing={2}>
            <Grid size={4}>
              <CustomTextField
                label='Tìm kiếm'
                placeholder='Nhập tên sản phẩm'
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {data?.map((bot: any, index: any) => (
              <div
                key={index}
                className='border rounded-lg relative h-[180px] w-auto cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 hover:transform hover:translate-x-[-2px] hover:shadow-[0_10px_10px_gray] duration-300'
              >
                <div className='flex flex-row gap-3 mb-3'>
                  <div className='min-w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center'>
                    {bot?.avatar || "🤖"}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-semibold text-neutral text-16-24 mb-1'>{bot?.name}</h3>
                    <div className='flex items-center gap-1'>
                      <img src='/logo.png' className='w-4 h-4' alt='logo' />
                      <span className='text-14-20 text-neutral'>{bot?.provider || "Coze AI"}</span>
                    </div>
                    <p className='text-14-20 text-neutral font-medium mb-4 line-clamp-2'>
                      {bot.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 border-t border-gray-300 pt-4 px-4 w-[100pz]'>
                  <span className='text-14-20 text-neutral font-bold flex items-center gap-1'>
                    <PaidIcon
                      sx={{ fontSize: "16px" }}
                      color={bot.price === 0 ? "success" : "error"}
                    />
                    {bot.isFree ? (
                      <div className='text-14-20 text-success font-bold'>Miễn phí</div>
                    ) : (
                      <div className='text-14-20 text-danger font-bold'>
                        {bot.price.toLocaleString()} VND
                      </div>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotStore;
