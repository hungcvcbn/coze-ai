"use client";
import { getProfile, login } from "@/helpers/api/system";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setProfile, setToast } from "@/redux/slices/common";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIconImage from "@/assets/icons/google.png";
import clsx from "clsx";
import { LOGIN_CLIENT_ID, REFRESH_TOKEN, TOKEN } from "@/helpers/constants";
import yup from "@/helpers/utils/yupConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "../hook-form/RHFTextField";
import ConnectGoogle from "../connect-google/ConnectGoogle";

type LoginFrom = {
  username: string;
  password: string;
};
const FormLoginBasic = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const defaultValues: LoginFrom = {
    username: "",
    password: "",
  };
  const schema = yup.object().shape({
    username: yup.string().required("Tên đăng nhập là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
  });
  const form = useForm<LoginFrom>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res?.data) {
        dispatch(setProfile(res.data));
        router.push("/control-panel");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (data: LoginFrom) => {
    try {
      setLoading(true);
      const res = await login({
        ...data,
        clientId: LOGIN_CLIENT_ID,
        grantType: "password",
      });

      if (res?.data) {
        setCookie(TOKEN, res.data.accessToken);
        setCookie(REFRESH_TOKEN, res.data.refreshToken);
        fetchProfile();
        dispatch(setToast({ type: "success", message: "Đăng nhập thành công", show: true }));
      }
    } catch (error: any) {
      dispatch(
        setToast({
          type: "error",
          message: error.message,
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-black'>
      <div className='relative grid grid-rows-7 py-3 sm:max-w-xl sm:mx-auto text-gray-700 w-full'>
        <div className='relative row-span-7 px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
          <div className='max-w-md mx-auto'>
            <div className='flex flex-col items-center mb-8'>
              <Image
                src='/logo.png'
                alt='Mindmaid.ai'
                width={80}
                height={80}
                className='rounded-lg'
              />
              <div className='text-28-36 font-semibold mt-2'>Coze AI</div>
            </div>

            <div className='flex flex-col gap-3 mb-6'>
              <ConnectGoogle />

              {/* <button className='flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50'>
                <Image src={GoogleIconImage} alt='Mindmaid.ai' width={25} height={25} />

                <span className='text-16-24 font-medium'>Đăng nhập bằng Google</span>
              </button> */}
              {/* <button className='flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50'>
                <FacebookIcon
                  sx={{
                    color: "#3b5998",
                    width: "25px",
                    height: "25px",
                  }}
                />
                <span className='text-16-24 font-medium'>Đăng nhập bằng Facebook</span>
              </button> */}
            </div>

            <div className='flex items-center justify-center my-4'>
              <div className='border-t flex-grow'></div>
              <span className='px-4 text-16-24 font-medium text-neutral'>Hoặc</span>
              <div className='border-t flex-grow'></div>
            </div>

            <FormProvider methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
              <div className='flex flex-col gap-3'>
                <RHFTextField
                  label='Tên đăng nhập'
                  name='username'
                  size='small'
                  isRequired
                  placeholder='Nhập tên đăng nhập của bạn'
                  variant='outlined'
                  fullWidth
                />

                <RHFTextField
                  label='Mật khẩu'
                  name='password'
                  size='small'
                  isRequired
                  placeholder='Nhập mật khẩu vào đây'
                  variant='outlined'
                  type={showPassword ? "text" : "password"}
                  fullWidth
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
                />
              </div>

              <div className='flex items-center justify-between mt-4 mb-6'>
                <div className='flex items-center'>
                  <Checkbox
                    size='small'
                    sx={{
                      color: "#000000",
                      padding: "0px",
                      "&.Mui-checked": {
                        color: "#6A5ACD",
                      },
                    }}
                  />
                  <div className='text-14-20 px-1 font-medium text-neutral'>
                    Đồng ý với các điều khoản và điều kiện
                  </div>
                </div>
                <Link
                  href={``}
                  className='text-14-20 font-medium text-blue-600 hover:text-blue-800'
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type='submit'
                className={clsx(
                  `w-full py-2.5 px-4 text-16-24 font-semibold`,
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:opacity-80",
                  `text-white rounded-lg font-medium transition-colors`
                )}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>

              <div className='text-center mt-6'>
                <span className='text-16-24 text-neutral'>Chưa có tài khoản? </span>
                <Link
                  href={`/sign-up`}
                  className='text-blue-600 hover:text-blue-800 text-16-24 font-medium hover:font-bold'
                >
                  Đăng ký ngay!
                </Link>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormLoginBasic;
