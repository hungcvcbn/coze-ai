"use client";
import React from "react";
import MenuControlPanelDetail from "../control-panel-detail/ControlPanelDetail";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutDetail = ({ children }: LayoutProps) => {
  return (
    <div className='bg-gray-50 flex flex-col'>
      <MenuControlPanelDetail />
      <div className='pl-[70px] flex-1 flex flex-col'>
        {children}
      </div>
    </div>
  );
};

export default LayoutDetail;
