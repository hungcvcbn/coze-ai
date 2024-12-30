"use client";
import { Avatar, Popover } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useAppSelector } from "@/redux/hooks";
import { isEmpty } from "@/helpers/utils/common";
import BasicButton from "../common/BasicButton";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
const LayoutHeader = () => {
  const { profile, firstLoading } = useAppSelector(state => state.common);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;

  return (
    <header className='bg-gray-200 text-white sticky top-0 z-50 h-[64px]'>
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
                      deleteCookie("token");
                      handlePopoverClose();
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
