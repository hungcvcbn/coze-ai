"use client";
import React from "react";
import LayoutHeader from "./LayoutHeader";
import Menu from "./Menu";
import { usePathname } from "next/navigation";
import { useProfileFetch } from "@/hooks/useProfileFetch";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";

  useProfileFetch();

  if (isLoginPage) {
    return (
      <div className='min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white'>
        {children}
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Menu />
      <div className='lg:pl-64 flex-1 flex flex-col'>
        {/* <div className='sticky top-0 z-10 bg-white'>
          <LayoutHeader />
        </div> */}
        <main className='flex-1 bg-white m-4 rounded-lg shadow-sm'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
