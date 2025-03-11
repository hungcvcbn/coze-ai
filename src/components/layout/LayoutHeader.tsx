"use client";
import { Avatar, Popover } from "@mui/material";
import React, { useState } from "react";
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
import { IcBell, IconMessage } from "../common/IconCommon";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";

const LayoutHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile, firstLoading } = useAppSelector(state => state.common);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
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

  return (
    <header className='bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 text-white sticky top-0 z-40 h-[63px]'>
      <div className='px-4 py-3'>
        <div className='flex lg:justify-end justify-between items-center'>
          <div className='lg:hidden flex items-center gap-2 ml-12'>
            <Image src={LogoImage} alt='Logo' width={32} height={32} className='rounded-[8px]' />
            <span className='text-neutral font-semibold pt-2'>Zenee AI</span>
          </div>
          <div className='flex justify-end items-center'>
            {!isEmpty(profile) ? (
              <>
                <div className='flex items-center gap-2'>
                  {/* <IconMessage /> <IcBell /> */}
                  <div className='text-14-20 text-neutral font-semibold px-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-[200px] md:max-w-none'>
                    {profile?.username}
                  </div>
                  <Avatar
                    alt={""}
                    src={AdminAvatar.src}
                    onClick={handleAvatarClick}
                    className='cursor-pointer'
                  />
                </div>
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
                  <div className='p-2 flex flex-col gap-2'>
                    <div className='text-neutral font-semibold border-b pb-2'>
                      {profile?.username}
                    </div>
                    <button
                      className='text-neutral hover:underline w-[100px] h-[30px]'
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
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
      </div>
    </header>
  );
};

export default LayoutHeader;
