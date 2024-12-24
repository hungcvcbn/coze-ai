"use client";
import { login } from "@/helpers/api/login";
import React from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const FormLoginBasic = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await login({
        clientId: "ecb8bbf1",
        grantType: "password",
        username: userName,
        password: password,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative grid grid-rows-9 py-3 sm:max-w-xl sm:mx-auto'>
      <div className='row-span-2'></div>
      <div className='relative row-span-5 px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
        <div className='max-w-md mx-auto'>
          <div className='flex flex-col items-center space-x-5 justify-center text-[30px] font-semibold'>
            Welcome to Login
            <p className='text-[16px] text-[#7a7979]'>Vui lòng đăng nhập tài khoản của bạn</p>
          </div>
          <div className='mt-5 flex flex-col gap-4 pb-1'>
            <FormControl component='fieldset' fullWidth>
              <Typography variant='body2' color='initial' fontWeight={600}>
                Email
              </Typography>
              <TextField
                id='outlined-basic'
                size='small'
                placeholder='Nhập email vào đây'
                variant='outlined'
                type='text'
                fullWidth
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                InputProps={{
                  style: {
                    fontSize: "14px",
                  },
                }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "4px",
                }}
              />
            </FormControl>

            <FormControl component='fieldset' fullWidth>
              <Typography variant='body2' color='initial' fontWeight={600}>
                Mật khẩu
              </Typography>
              <TextField
                id='outlined-basic'
                size='small'
                placeholder='Nhập mật khẩu vào đây'
                variant='outlined'
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    fontSize: "14px",
                  },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? (
                          <Tooltip title='Ẩn mật khẩu'>
                            <VisibilityOffIcon
                              sx={{
                                fontSize: "16px",
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title='Hiện mật khẩu'>
                            <VisibilityIcon
                              sx={{
                                fontSize: "16px",
                              }}
                            />
                          </Tooltip>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "4px",
                }}
              />
            </FormControl>
          </div>
          <div className='mb-4 flex justify-between'>
            <Link href={``}>
              <span className='text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-pointer'>
                Tạo tài khoản
              </span>
            </Link>

            <Link href={``}>
              <span className='text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-pointer pt-1'>
                Quên mật khẩu?
              </span>
            </Link>
          </div>
          <div className='mt-5'>
            <button
              onClick={handleSubmit}
              className={`py-2 px-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </div>

          <div className='flex items-center justify-center mt-4'>
            <a
              className='text-xs text-gray-600 uppercase hover:text-opacity-80 hover:underline'
              href='/sign-up'
            >
              hoặc <span className='font-semibold'>đăng ký</span>
            </a>
          </div>
        </div>
      </div>
      <div className='row-span-1'></div>
    </div>
  );
};
export default FormLoginBasic;
