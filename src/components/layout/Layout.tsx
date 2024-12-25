"use client";
import React, { useEffect } from "react";
import { getProfile } from "@/helpers/api/system";
import { setProfile } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res?.data) {
        dispatch(setProfile(res.data));
      }
    }
    fetchProfile();
  }, [])

  return (
    <div>
      <LayoutHeader />
      {children}
      <LayoutFooter />
    </div>
  );
}
export default Layout;