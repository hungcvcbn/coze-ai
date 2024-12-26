import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Button, Dialog, DialogTitle } from "@mui/material";
import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import CreateBotModal from "../create-bot/CreateBotModal";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const menuItems = [
    {
      title: "Bảng điều khiển",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Bot Store",
      path: "/bot-store",
      icon: <StorefrontIcon />,
    },
  ];

  return (
    <div className='fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4'>
      <div className='flex items-center gap-2 mb-8 px-4'>
        <img src='/logo.png' alt='Logo' className='w-8 h-8' />
        <span className='text-xl font-semibold'>Coze AI</span>
      </div>
      <div className='flex justify-center pb-3'>
        <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
          Tạo Bot
        </Button>
      </div>
      <div className='space-y-2'>
        {menuItems.map(item => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className='font-semibold text-[16px]'>{item.title}</span>
            </Link>
          );
        })}
      </div>
      <div className='fixed bottom-0 right-0'>
        <CreateBotModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Menu;
