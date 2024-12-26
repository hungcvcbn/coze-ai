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
    <div className='min-h-screen bg-gray-50'>
      <Menu />
      <div className='pl-64'>
        <LayoutHeader />
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
