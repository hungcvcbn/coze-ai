"use client";
import React from "react";
import LayoutHeader from "./LayoutHeader";
import Menu from "./Menu";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/sign-up";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className='bg-gray-50 flex flex-col'>
      <Menu />
      <div className='pl-64 flex-1 flex flex-col'>
        <div className='sticky top-0 z-10 bg-white'>
          <LayoutHeader />
        </div>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
