"use client";
import { TextField, Avatar, Popover } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";

const LayoutHeader = () => {
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
    <header className='bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg'>
      <div className='grid grid-cols-3 px-4 py-3'>
        <Link href='/'>
          <div className='flex justify-start space-x-3 col-span-1'>
            <img src='/logo.png' alt='Logo' className='h-10 w-10 rounded-full object-cover' />
            <span className='text-2xl font-bold pt-1'>Training AI</span>
          </div>
        </Link>

        <div className='col-span-1 flex justify-center items-center'>
          <TextField
            size='small'
            placeholder='Tìm kiếm'
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                width: "400px",
                color: "#000",
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
              },
            }}
          />
        </div>

        <div className='col-span-1 flex justify-end items-center'>
          {getCookie("token") ? (
            <>
              <Avatar
                alt={""}
                src={"/default-avatar.png"}
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
                <div className='p-4'>
                  <button
                    className='text-red-600 hover:underline'
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
            <Link href={"/login"}>
              <button className='px-4 py-2 bg-gray-100 text-blue-600 rounded-lg hover:bg-gray-200 transition duration-200'>
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;