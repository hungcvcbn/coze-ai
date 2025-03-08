"use client";
import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useRouter } from "next/navigation";

const MenuControlPanelDetail = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      path: `/control-panel/${Number(params?.id)}/settings`,
      icon: <SmartToyIcon />,
    },
    {
      path: `/control-panel/${Number(params?.id)}/knowledge`,
      icon: <StorefrontIcon />,
    },
  ];

  return (
    <div className='fixed left-0 top-0 w-[70px] h-full bg-gray-200 border-r border-gray-200'>
      <button
        className='flex justify-center items-center gap-2 w-full p-4 h-[64px]'
        onClick={() => router.push("/control-panel")}
      >
        <Image src={LogoImage} alt='Logo' width={50} height={50} className='rounded-[8px]' />
      </button>
      <div className='space-y-2'>
        {menuItems.map(item => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex justify-center items-center px-4 py-2 transition-colors ${
                isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuControlPanelDetail;
