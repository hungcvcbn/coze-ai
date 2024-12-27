"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIconImage from "@/assets/icons/google.png";
const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    dispatch(setToast({ type: "success", message: "Đăng ký thành công!", show: true }));
  };

  return (
    <div className='relative grid grid-rows-9 sm:max-w-xl sm:mx-auto text-gray-700'>
      <div className='row-span-1'></div>
      <div className='relative row-span-7 px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
        <div className='max-w-md mx-auto'>
          <div className='flex flex-col items-center mb-8'>
            <Image src='/logo.png' alt='Mindmaid.ai' width={80} height={80} />
            <div className='text-[36px] font-semibold mt-2'>Coze AI</div>
          </div>
          <div className='flex flex-col gap-3 mb-6'>
            <button className='flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50'>
              <Image src={GoogleIconImage} alt='Mindmaid.ai' width={25} height={25} />

              <span className='text-[16px] font-medium'>Đăng ký bằng Google</span>
            </button>
          </div>

          <div className='flex items-center justify-center my-2'>
            <div className='border-t flex-grow'></div>
            <span className='px-4 text-[16px] font-medium text-gray-500'>Hoặc</span>
            <div className='border-t flex-grow'></div>
          </div>
          <div className='flex flex-col gap-4'>
            <FormControl component='fieldset' fullWidth>
              <Typography variant='body2' color='initial' fontWeight={600}>
                Tên đăng nhập
              </Typography>
              <TextField
                size='small'
                placeholder='Nhập tên đăng nhập của bạn'
                variant='outlined'
                type='text'
                fullWidth
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </FormControl>

            <FormControl component='fieldset' fullWidth>
              <Typography variant='body2' color='initial' fontWeight={600}>
                Email
              </Typography>
              <TextField
                size='small'
                placeholder='Nhập email của bạn'
                variant='outlined'
                type='email'
                fullWidth
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </FormControl>

            <FormControl component='fieldset' fullWidth>
              <Typography variant='body2' color='initial' fontWeight={600}>
                Mật khẩu
              </Typography>
              <TextField
                size='small'
                placeholder='Nhập mật khẩu'
                variant='outlined'
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? (
                          <Tooltip title='Ẩn mật khẩu'>
                            <VisibilityOffIcon sx={{ fontSize: "16px" }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='Hiện mật khẩu'>
                            <VisibilityIcon sx={{ fontSize: "16px" }} />
                          </Tooltip>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginTop: "4px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </FormControl>
          </div>

          <div className='flex items-center justify-between mt-4 mb-6'>
            <div className='flex items-center'>
              <Checkbox
                size='small'
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                sx={{
                  color: "#000000",
                  padding: "0px",
                  "&.Mui-checked": {
                    color: "#000000",
                  },
                }}
              />
              <div className='text-[14px] px-1 text-gray-600'>
                Tôi đồng ý với{" "}
                <Link href='/terms' className='text-blue-600'>
                  điều khoản sử dụng
                </Link>
              </div>
            </div>
          </div>

          <button
            className={`w-full py-2.5 px-4 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
            } text-white rounded-lg font-medium transition-colors`}
            onClick={handleSubmit}
            disabled={loading || !acceptTerms}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
          <div className='text-center mt-6'>
            <span className='text-[16px] font-medium text-gray-600'>Đã có tài khoản? </span>
            <Link
              href={`/login`}
              className='text-blue-600 hover:text-blue-800 font-medium hover:font-bold'
            >
              Đăng nhập ngay!
            </Link>
          </div>
        </div>
      </div>
      <div className='row-span-1'></div>
    </div>
  );
};

export default FormSignUp;
