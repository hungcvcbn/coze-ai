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
// import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIconImage from "@/assets/icons/google.png";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneRegistration, setIsPhoneRegistration] = useState(false);
  const [step, setStep] = useState(1);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleOtpSubmit = async () => {
    setStep(3);
  };
  const register = async () => {
    setStep(2);
  };

  const handleSubmit = async () => {
    if (step === 1) {
      if (isPhoneRegistration) {
        setStep(2);
      } else {
        dispatch(setToast({ type: "success", message: "Đăng ký thành công!", show: true }));
      }
    } else if (step === 3) {
      dispatch(setToast({ type: "success", message: "Đăng ký thành công!", show: true }));
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-black'>
      <div className='relative grid grid-rows-7 sm:max-w-xl sm:mx-auto text-gray-700 w-full'>
        <div className='relative row-span-7 px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
          <button
            className='cursor-pointer'
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                router.back();
              }
            }}
          >
            <ArrowBackIcon sx={{ color: "#000000", width: "32px", height: "32px" }} />
          </button>
          <div className='max-w-md mx-auto'>
            <div className='flex flex-col items-center mb-8'>
              <Image
                src='/logo.png'
                alt='Mindmaid.ai'
                width={80}
                height={80}
                className='rounded-[8px]'
              />
              <div className='text-[36px] font-semibold mt-2'>Coze AI</div>
            </div>
            <div className='flex flex-col gap-3 mb-6'>
              <button
                onClick={() => setIsPhoneRegistration(true)}
                className='flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                <Image src={GoogleIconImage} alt='Mindmaid.ai' width={25} height={25} />

                <span className='text-[16px] font-medium'>Đăng ký bằng Google</span>
              </button>
            </div>

            <div className='flex items-center justify-center my-2 mx-5'>
              <div className='border-t flex-grow'></div>
              <span className='px-4 text-[16px] font-medium text-gray-500'>Hoặc</span>
              <div className='border-t flex-grow'></div>
            </div>
            <div className='flex flex-col gap-4'>
              {step === 1 && (
                <div className='flex flex-col gap-2'>
                  <div>
                    <Typography variant='body2' color='initial' fontWeight={600}>
                      Họ và tên
                    </Typography>
                    <TextField
                      size='small'
                      placeholder='Nhập họ tên của bạn'
                      variant='outlined'
                      type='text'
                      fullWidth
                      value={userName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                      }
                      sx={{
                        backgroundColor: "#FFFFFF",
                        marginTop: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant='body2' color='initial' fontWeight={600}>
                      Số điện thoại
                    </Typography>
                    <TextField
                      size='small'
                      placeholder='Nhập số điện thoại của bạn'
                      variant='outlined'
                      type='text'
                      fullWidth
                      value={phoneNumber}
                      onChange={event => {
                        let { value } = event.target;
                        value = value.replace(/\D/g, "");
                        setPhoneNumber(value);
                      }}
                      sx={{
                        backgroundColor: "#FFFFFF",
                        marginTop: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <FormControl component='fieldset' fullWidth>
                  <Typography variant='body2' color='initial' fontWeight={600}>
                    Nhập OTP
                  </Typography>
                  <TextField
                    size='small'
                    placeholder='Nhập OTP'
                    variant='outlined'
                    type='text'
                    fullWidth
                    value={otp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      marginTop: "4px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </FormControl>
              )}
              {step === 3 && (
                <>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
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
                  <FormControl component='fieldset' fullWidth>
                    <Typography variant='body2' color='initial' fontWeight={600}>
                      Nhập lại mật khẩu
                    </Typography>
                    <TextField
                      size='small'
                      placeholder='Nhập lại mật khẩu'
                      variant='outlined'
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                      }
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
                </>
              )}
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
                <div className='text-14-20 px-1 pt-[2px] text-neutral'>
                  Tôi đồng ý với{" "}
                  <Link href='/terms' className='text-blue-700'>
                    điều khoản sử dụng
                  </Link>
                </div>
              </div>
            </div>

            <button
              className={clsx(
                `w-full py-2.5 px-4 text-white rounded-lg font-medium transition-colors`,
                loading ||
                  (step === 1 && (!userName || !phoneNumber)) ||
                  (step === 2 && !otp) ||
                  (step === 3 && (!password || !confirmPassword))
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-900 cursor-pointer"
              )}
              disabled={
                loading ||
                (step === 1 && (!userName || !phoneNumber)) ||
                (step === 2 && !otp) ||
                (step === 3 && (!password || !confirmPassword))
              }
              onClick={() => {
                if (step === 1) {
                  register();
                } else if (step === 2) {
                  handleOtpSubmit();
                } else if (step === 3) {
                  handleSubmit();
                }
              }}
            >
              {step === 1
                ? "Đăng ký"
                : step === 2
                ? "Xác nhận OTP"
                : step === 3
                ? "Đăng ký"
                : "Đăng ký"}
            </button>

            <div className='text-center mt-6'>
              <span className='text-[16px] font-medium text-gray-600'>Đã có tài khoản? </span>
              <Link
                href={`/login`}
                className='text-neutral-700 hover:text-neutral-800 font-medium hover:font-bold'
              >
                Đăng nhập ngay!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
