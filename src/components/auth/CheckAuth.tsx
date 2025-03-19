"use client";

import { TOKEN } from "@/helpers/constants";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { setProfile } from "@/redux/slices/common";
import { getProfile } from "@/helpers/api/system";

interface Props {
  children: React.ReactNode;
}

const CheckAuth = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res?.data) {
        dispatch(setProfile(res.data));
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const token = getCookie(TOKEN);
    if (token) fetchProfile()
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default CheckAuth;