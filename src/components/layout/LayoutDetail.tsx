"use client";
import React from "react";
import MenuControlPanelDetail from "../control-panel-detail/MenuControlPanel";
import LayoutHeader from "./LayoutHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutDetail = ({ children }: LayoutProps) => {
  return (
    <div className='bg-gray-50 flex flex-col'>
      <MenuControlPanelDetail />
      <div className='pl-[70px]'>
        <LayoutHeader />
      </div>
      <div className='pl-[70px] flex-1 flex flex-col'>{children}</div>
    </div>
  );
};

export default LayoutDetail;
