"use client";
import React from "react";
import MenuControlPanelDetail from "../agent-detail/MenuControlPanel";
import LayoutHeader from "./LayoutHeader";
import { useProfileFetch } from "@/hooks/useProfileFetch";
import { useParams, usePathname, useRouter } from "next/navigation";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutDetail = ({ children }: LayoutProps) => {
  useProfileFetch();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      path: `/control-panel`,
      icon: <SmartToyIcon />,
      label: "Settings",
    },
    {
      path: `/control-panel/${Number(params?.id)}/knowledge`,
      icon: <StorefrontIcon />,
      label: "Knowledge",
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <div className='bg-white sticky top-0 z-10 shadow-sm'>
        <LayoutHeader />
      </div>
      <div className='fixed left-0 top-0 w-[70px] h-full bg-white border-r border-gray-200 z-10'>
        <div className='flex items-center gap-3 border-b border-gray-200 w-full p-5 h-[64px]'>
          <button
            onClick={() => router.push("/control-panel")}
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'
          >
            <Image src={LogoImage} alt='Logo' width={32} height={32} className='rounded-[8px]' />
          </button>
        </div>
        <div className='p-4 space-y-1'>
          {menuItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center justify-center'>{item.icon}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='pl-[70px] '>{children}</div>
    </div>
  );
};

export default LayoutDetail;
