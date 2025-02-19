import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreateBotModal from "../create-bot/CreateBotModal";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import { getCookie } from "cookies-next";
import { TOKEN } from "@/helpers/constants";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const token = getCookie(TOKEN);
  const pathname = usePathname();
  const router = useRouter();
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token]);
  const menuItems = [
    {
      title: "Bảng điều khiển",
      path: "/control-panel",
      icon: <DashboardIcon />,
    },
    {
      title: "Bot Store",
      path: "/bot-store",
      icon: <StorefrontIcon />,
    },
  ];

  return (
    <div className='fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-300'>
      <div className='flex items-center gap-2 mb-8 px-4 w-full p-4 h-[64px] bg-gray-50'>
        <Image src={LogoImage} alt='Logo' width={50} height={50} className='rounded-[8px]' />
        <span className='text-xl text-black font-semibold'>Coze AI</span>
      </div>
      <div className='flex justify-center pb-3 px-4'>
        <button
          className='bg-primary w-full text-white px-4 py-2 rounded-lg font-semibold text-14-20'
          onClick={() => setOpen(true)}
        >
          Tạo Bot
        </button>
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
