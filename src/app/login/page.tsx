"use client";
import { login } from "@/helpers/api/login";
import React from "react";
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
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIconImage from "@/assets/icons/google.png";
import FacebookIconImage from "@/assets/icons/facebook.png";
const FormLoginBasic = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await login({
        clientId: "ecb8bbf1",
        grantType: "password",
        username: userName,
        password,
      });

      if (res?.data) {
        setCookie("token", res.data.accessToken);
        setCookie("refresh-token", res.data.refreshToken);
        dispatch(setToast({ type: "success", message: "Đăng nhập thành công", show: true }));
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      dispatch(
        setToast({
          type: "error",
          message: error.response?.data?.message || "Đăng nhập thất bại",
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative grid grid-rows-9 py-3 sm:max-w-xl sm:mx-auto'>
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

              <span className='text-[16px] font-medium'>Đăng nhập bằng Google</span>
            </button>
            <button className='flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50'>
              <FacebookIcon
                sx={{
                  color: "#3b5998",
                  width: "25px",
                  height: "25px",
                }}
              />
              <span className='text-[16px] font-medium'>Đăng nhập bằng Facebook</span>
            </button>
          </div>

          <div className='flex items-center justify-center my-6'>
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
                id='outlined-basic'
                size='small'
                placeholder='Nhập tên đăng nhập của bạn'
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

          <div className='flex items-center justify-between mt-4 mb-6'>
            <div className='flex items-center'>
              <Checkbox
                size='small'
                sx={{
                  color: "#000000",
                  padding: "0px",
                  "&.Mui-checked": {
                    color: "#000000",
                  },
                }}
              />
              <div className='text-[14px] px-1 text-gray-600'>Nhớ mật khẩu</div>
            </div>
            <Link href={``} className='text-sm text-blue-600 hover:text-blue-800'>
              Quên mật khẩu?
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full py-2.5 px-4 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg font-medium transition-colors`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          <div className='text-center mt-6'>
            <span className='text-[16px] font-medium text-gray-600'>Chưa có tài khoản? </span>
            <Link
              href={`/sign-up`}
              className='text-blue-600 hover:text-blue-800 font-medium hover:font-bold'
            >
              Đăng ký ngay!
            </Link>
          </div>
        </div>
      </div>
      <div className='row-span-1'></div>
    </div>
  );
};
export default FormLoginBasic;
