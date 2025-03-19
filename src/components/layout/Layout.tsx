"use client";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { usePathname } from "next/navigation";
import { useProfileFetch } from "@/hooks/useProfileFetch";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoginPage) {
    return (
      <div className='bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white'>
        {children}
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <Menu />
      <div className={`flex-1 overflow-auto transition-all ${isMobile ? "ml-16" : "ml-64"}`}>
        <div className='p-2 md:p-4 h-auto'>
          <main className='bg-white rounded-lg h-full p-4'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
