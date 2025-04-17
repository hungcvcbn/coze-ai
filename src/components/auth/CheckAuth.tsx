"use client";

import { TOKEN } from "@/helpers/constants";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { asyncGetAccountProfile } from "@/redux/slices/common";

interface Props {
  children: React.ReactNode;
}

const CheckAuth = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const token = getCookie(TOKEN);

  useEffect(() => {
    if (token) {
      dispatch(asyncGetAccountProfile());
    }
  }, [token]);
  // const fetchProfile = async () => {
  //   try {
  //     const res = await getProfile();
  //     if (res?.data) {
  //       dispatch(setProfile(res.data));
  //     }
  //   } catch (error: any) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   const token = getCookie(TOKEN);
  //   if (token) {
  //     fetchProfile();
  //   }
  // }, []);

  return <>{children}</>;
};

export default CheckAuth;
