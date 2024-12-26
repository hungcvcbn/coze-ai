"use client";

import { useEffect, useState } from "react";
import { searchControlPanels } from "@/helpers/api/control";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";

const ControlPanel = () => {
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response = await searchControlPanels();
      setData(response.data.items);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error.message, show: true }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data?.map((bot: any, index: any) => (
          <div key={index} className='border rounded-lg p-4 relative h-[200px]'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-2xl'>{bot?.avatar}</span>
              <h3 className='font-semibold text-[16px] '>{bot?.name}</h3>
              <button className='absolute top-4 right-4'>⋮</button>
            </div>
            <div className='h-[100px]'>
              <p className='text-sm text-gray-600 mb-4 line-clamp-4'>{bot.description}</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <img src='/logo.png' className='w-6 h-6 rounded-full' />
                <span className='text-sm text-blue-600'>Coze AI</span>
              </div>

              <button className='px-3 py-1 text-sm bg-green-50 text-green-600 rounded'>Bật</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
