"use client";
import { Avatar, Popover } from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isEmpty } from "@/helpers/utils/common";
import BasicButton from "../common/BasicButton";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { useRouter } from "next/navigation";
import { logout } from "@/helpers/api/system";
import { setProfile, setToast } from "@/redux/slices/common";
import { REFRESH_TOKEN, TOKEN } from "@/helpers/constants";
const LayoutHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile, firstLoading } = useAppSelector(state => state.common);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-br from-black via-blue-900 to-black text-white"
  );

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    deleteCookie("token");
    router.push("/login");
  };
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setToast({ type: "success", message: "Đăng xuất thành công", show: true }));
      deleteCookie(TOKEN);
      deleteCookie(REFRESH_TOKEN);
      deleteCookie("uuid");
      setProfile({});
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor("bg-gradient-to-br from-black via-blue-600 to-black text-white");
    } else {
      setBgColor("bg-gradient-to-br from-black via-blue-900 to-black text-white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${bgColor} text-white sticky top-0 z-50 h-[64px]`}>
      <div className='px-4 py-3'>
        <div className=' flex justify-end items-center'>
          {!isEmpty(profile) ? (
            <>
              <div className='text-14-20 font-semibold pr-2'>{profile?.username}</div>
              <Avatar
                alt={""}
                src={AdminAvatar.src}
                onClick={handleAvatarClick}
                className='cursor-pointer'
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div className='p-2'>
                  <button
                    className='text-neutral hover:underline w-[100px]'
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              </Popover>
            </>
          ) : (
            <>
              {!firstLoading && (
                <Link href={"/login"}>
                  <BasicButton size='md' variant='contained' color='primary'>
                    <div className='flex items-center gap-2 font-semibold'>Đăng nhập</div>
                  </BasicButton>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
