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
import clsx from "clsx";
import { LOGIN_CLIENT_ID, REFRESH_TOKEN, TOKEN } from "@/helpers/constants";
import yup from "@/helpers/utils/yupConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "../hook-form/RHFTextField";
import ConnectGoogle from "../connect-google/ConnectGoogle";
import LogoZenee from "@/assets/icons/logo.png";
import BackgroundImage from "@/assets/images/background.png";
import { IconKey, IconEmail } from "../common/IconCommon";
import PersonIcon from "@mui/icons-material/Person";
import SignUpForm from "../sign-up/SignUp";
type LoginFrom = {
  username: string;
  password: string;
};
const FormLoginBasic = () => {
  const [activeTab, setActiveTab] = useState("signin");
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
    } catch (error: any) {
      dispatch(
        setToast({
          type: "error",
          message: error.message,
          show: true,
        })
      );
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
    <div
      className='min-h-screen w-full flex items-center justify-center bg-white text-neutral p-4 sm:p-6'
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white mx-auto rounded-lg shadow-lg p-4 sm:p-6'>
        <div className='flex flex-col items-center mb-4 sm:mb-6'>
          <div className='flex items-center gap-2 mb-3 sm:mb-4'>
            <Image
              src={LogoZenee}
              alt='Zenee AI'
              width={32}
              height={32}
              className='rounded-lg w-10 h-10 sm:w-12 sm:h-12'
            />
            <div className='text-24-32 font-bold'>Zenee AI</div>
          </div>

          <div className='flex w-full border-b mb-4 sm:mb-6' role='tablist'>
            <button
              role='tab'
              aria-selected={activeTab === "signin"}
              className={clsx(
                "flex-1 text-center py-2 text-12-18 sm:text-14-20 md:text-16-24 font-medium",
                activeTab === "signin"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-neutral"
              )}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              role='tab'
              aria-selected={activeTab === "signup"}
              className={clsx(
                "flex-1 text-center py-2 text-12-18 sm:text-14-20 md:text-16-24 font-medium",
                activeTab === "signup"
                  ? "border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-neutral"
              )}
              onClick={() => setActiveTab("signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        <FormProvider methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
          {activeTab === "signin" ? (
            <div>
              <div className='flex flex-col gap-3 sm:gap-4'>
                <RHFTextField
                  label='Username'
                  name='username'
                  size='medium'
                  placeholder='Enter username'
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconEmail />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        padding: "10px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "10px",
                    },
                  }}
                />

                <RHFTextField
                  label='Password'
                  name='password'
                  size='medium'
                  placeholder='**************'
                  variant='outlined'
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        padding: "10px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "10px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconKey />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#39B5E0", fontSize: "20px" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#39B5E0", fontSize: "20px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className='flex justify-start mt-2 mb-4 sm:mb-6'>
                <Link
                  href={``}
                  className='text-12-18 sm:text-14-20 md:text-16-24 font-medium text-primary hover:text-primary-700'
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                className={clsx(
                  `w-full py-2 sm:py-3 px-4 text-12-18 sm:text-14-20 md:text-16-24 font-medium`,
                  loading ? "bg-primary-300 cursor-not-allowed" : "bg-primary hover:bg-primary-700",
                  `text-white rounded-md transition-colors`
                )}
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign In"}
              </button>

              <div className='flex items-center justify-center my-3 sm:my-4'>
                <div className='border-t flex-grow'></div>
                <span className='px-3 sm:px-4 text-12-18 sm:text-14-20 md:text-16-24 font-medium text-gray-500'>
                  OR
                </span>
                <div className='border-t flex-grow'></div>
              </div>

              <div className='mt-3 sm:mt-4'>
                <ConnectGoogle />
              </div>
            </div>
          ) : (
            <div>
              <div className='flex flex-col gap-3 sm:gap-4 mb-4'>
                <RHFTextField
                  label='Email Address'
                  name='email'
                  disabled
                  size='medium'
                  placeholder='Enter valid email address'
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconEmail />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        padding: "10px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "10px",
                    },
                  }}
                />
                <RHFTextField
                  label='UserName'
                  name='username'
                  size='medium'
                  disabled
                  placeholder='Enter valid username'
                  variant='outlined'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PersonIcon sx={{ color: "#39B5E0", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        padding: "10px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "10px",
                    },
                  }}
                />
                <RHFTextField
                  label='Password'
                  name='password'
                  size='medium'
                  disabled
                  placeholder='**************'
                  variant='outlined'
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "10px",
                        padding: "10px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      paddingLeft: "10px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <IconKey />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#39B5E0", fontSize: "20px" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#39B5E0", fontSize: "20px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <button
                type='button'
                className={clsx(
                  `w-full py-2 sm:py-3 px-4 text-12-18 sm:text-14-20 md:text-16-24 font-medium`,
                  loading ? "bg-primary-300 cursor-not-allowed" : "bg-primary hover:bg-primary-700",
                  `text-white rounded-md transition-colors`
                )}
                disabled
              >
                {loading ? "Processing..." : "Create Account"}
              </button>
              <div className='pt-4 text-12-18 sm:text-14-20 md:text-16-24 text-gray-500'>
                By creating an account, you agree to our
                <Link href={``} className='text-primary hover:text-primary-700'>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={``} className='text-primary hover:text-primary-700'>
                  Privacy & Cookie Statement.
                </Link>
              </div>
              <div className='flex items-center justify-center my-3 sm:my-4'>
                <div className='border-t flex-grow'></div>
                <span className='px-3 sm:px-4 text-12-18 sm:text-14-20 md:text-16-24 font-medium text-gray-500'>
                  OR
                </span>
                <div className='border-t flex-grow'> </div>
              </div>

              <div className='mt-3 sm:mt-4'>
                <ConnectGoogle />
              </div>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  );
};
export default FormLoginBasic;
