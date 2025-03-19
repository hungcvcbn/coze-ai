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

const ChangePassword = () => {
  const { profile } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const schema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup.string().required(),
  });

  const form = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(setToast({ message: "Update profile successfully", type: "success", show: true }));
  };

  return (
    <div className='max-w-[600px] text-neutral'>
      <div className='space-y-4'>
        <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <RHFTextField name='oldPassword' label='Old password' />
            </Grid2>
            <Grid2 size={12}>
              <RHFTextField name='newPassword' label='New password' />
            </Grid2>
            <Grid2 size={12}>
              <RHFTextField name='confirmPassword' label='Confirm password' />
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

export default ChangePassword;
