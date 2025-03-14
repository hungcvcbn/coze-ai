import React from "react";
import IcEmptyData from "@/assets/icons/ic_no_data.png";
import Image from "next/image";
interface Props {
  title?: string;
  children?: React.ReactNode;
}
const TableEmpty = ({ title = "Không có dữ liệu", children }: Props) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col gap-3'>
        <Image src={IcEmptyData} alt='' width={200} height={200} />
        <div className='text-24-32 font-semibold text-neutral text-center'>{title}</div>
        {children}
      </div>
    </div>
  );
};
export default TableEmpty;
