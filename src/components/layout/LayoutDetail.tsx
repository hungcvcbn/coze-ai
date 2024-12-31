"use client";
import React, { useEffect } from "react";
import LayoutHeader from "./LayoutHeader";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setFirstLoading, setProfile } from "@/redux/slices/common";
import { getProfile } from "@/helpers/api/system";
import { TOKEN } from "@/helpers/constants";
import { getCookie } from "cookies-next";
import MenuControlPanelDetail from "../control-panel-detail/ControlPanelDetail";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";

  const dispatch = useAppDispatch();
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res?.data) {
        dispatch(setProfile(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setFirstLoading(false));
    }
  };
  useEffect(() => {
    const token = getCookie(TOKEN);
    if (token) {
      fetchProfile();
    } else {
      dispatch(setFirstLoading(false));
    }
  }, []);

  if (isLoginPage) {
    return (
      <div className='min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white'>
        {children}
      </div>
    );
  }

  return (
    <div className='bg-gray-50 flex flex-col'>
      <MenuControlPanelDetail />
      <div className='pl-[70px] flex-1 flex flex-col'>
        {/* <div className='sticky top-0 z-10 bg-white'>
          <LayoutHeader />
        </div> */}
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
