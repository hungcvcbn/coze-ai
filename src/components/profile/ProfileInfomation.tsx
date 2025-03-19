import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Grid2 } from "@mui/material";
import { IconUpload } from "../common/IconCommon";
import RHFTextField from "../hook-form/RHFTextField";
import RHFSelect from "../hook-form/RHFSelect";
import RHFDatePicker from "../hook-form/RHFDatePicker";
import FormProvider from "../hook-form/FormProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import BasicButton from "../common/BasicButton";

const ProfileInfomation = () => {
  const { profile } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
    createdAt: "",
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    sex: yup.string().required(),
    createdAt: yup.string().required(),
  });

  const form = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(setToast({ message: "Update profile successfully", type: "success", show: true }));
  };
  useEffect(() => {
    form.setValue("firstName", profile?.firstName);
    form.setValue("lastName", profile?.lastName);
    form.setValue("email", profile?.email);
    form.setValue("phone", profile?.phone);
    form.setValue("sex", profile?.sex);
    form.setValue(
      "createdAt",
      profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString() : ""
    );
  }, [profile]);
  return (
    <div className='max-w-[600px] text-neutral'>
      <div className='mb-6'>
        <p className='mb-2 text-12-16 md:text-16-24 font-medium text-[#000000]'>Avatar</p>
        <div className='flex items-center gap-2 md:gap-4'>
          <Avatar
            src={profile?.avatar}
            alt={`${profile?.firstName} ${profile?.lastName}`}
            sx={{
              width: 100,
              height: 100,
              "@media (max-width: 600px)": {
                width: 50,
                height: 50,
              },
            }}
          />
          <div className='flex flex-col gap-2'>
            <button className='md:w-[200px] text-10-12 md:text-14-20	 font-semibold flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 shadow-md'>
              <IconUpload /> Upload new image
            </button>
            <p className='text-10-12 md:text-12-16 font-medium text-gray-500'>
              At least 800x800 px recommended. JPG or PNG and GIF is allowed
            </p>
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <RHFTextField name='firstName' label='First name' />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField name='lastName' label='Last name' />
            </Grid2>
            <Grid2 size={12}>
              <RHFTextField name='email' label='Email' />
            </Grid2>
            <Grid2 size={12}>
              <RHFTextField name='phone' label='Phone number' />
            </Grid2>
            <Grid2 size={12}>
              <RHFSelect
                name='sex'
                label='Sex'
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                ]}
              />
            </Grid2>

            <Grid2 size={12}>
              <RHFDatePicker name='createdAt' label='Ngày tạo phiếu' />
            </Grid2>
          </Grid2>
          <div className='pt-4'>
            <BasicButton type='submit' disabled variant='contained'>
              Update
            </BasicButton>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileInfomation;
