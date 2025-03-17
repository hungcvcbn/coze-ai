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
      <div className='bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white'>
        {children}
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-gray-100'>
      <Menu />
      <div className='lg:pl-64 flex-1 flex flex-col h-full'>
        <main className='flex-1 bg-white rounded-lg'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
