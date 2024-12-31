import React from "react";
import { Skeleton } from "@mui/material";

const CommonSkeleton = ({ itemCount }: { itemCount: number }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className='border rounded-lg relative h-[180px] w-auto p-2 bg-[#FFFFFF] border-gray-300'
        >
          <Skeleton variant='rounded' width='100%' height={40} />
          <Skeleton variant='rounded' width='100%' height={100} />
          <div className='flex items-center justify-between'>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width={80} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonSkeleton;
