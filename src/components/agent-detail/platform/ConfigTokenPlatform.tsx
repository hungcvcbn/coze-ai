"use client";
import React, { useEffect, useState } from "react";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import BasicButton from "@/components/common/BasicButton";
import { getAgentDetail, updateLivechatIntegration } from "@/helpers/api/agent";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/hook-form/FormProvider";
// import { TOKEN } from "@/helpers/constants";
// import { getCookie } from "cookies-next";
import * as yup from "yup";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux/hooks";
import { setToast } from "@/redux/slices/common";
import { Grid } from "@mui/material";
interface ConfigTokenPlatformProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
type ConfigTokenPlatformType = {
  accessToken: string;
  phoneNumberId: string;
};
const ConfigTokenPlatform = ({ open, setOpen }: ConfigTokenPlatformProps) => {
  const [dataDetail, setDataDetail] = useState<any>({});

  const { id } = useParams() as { id: string };
  // const token = getCookie(TOKEN);
  const dispatch = useAppDispatch();
  const defaultValues = {
    accessToken: "",
    phoneNumberId: "",
  };
  const schema = yup.object().shape({
    accessToken: yup.string().required("Bot token is required"),
    phoneNumberId: yup
      .string()
      .required("Phone number is required")
      .matches(/^(0\d{9})?$/, "Incorrect phone number format"),
  });

  const form = useForm<ConfigTokenPlatformType>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmit = async (data: ConfigTokenPlatformType) => {
    const payload = {
      accessToken: data.accessToken,
      phoneNumberId: data.phoneNumberId,
      botId: dataDetail?.id,
      name: dataDetail?.name,
    };
    try {
      await updateLivechatIntegration(payload);
      dispatch(setToast({ message: "Success", type: "success", show: true }));
      setOpen(false);
    } catch (error) {
      dispatch(setToast({ message: "Error", type: "error", show: true }));
    }
  };

  const fetchAgentDetail = async () => {
    const res = await getAgentDetail(id);
    setDataDetail(res.data);
  };
  useEffect(() => {
    fetchAgentDetail();
  }, []);
  console.log("dataDetail", dataDetail);

  return (
    <>
      <BasicDialog
        maxWidth='md'
        open={open}
        onClose={() => setOpen(false)}
        title='Configure Bot'
        showCloseIcon
      >
        <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <BasicDialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFTextField name='accessToken' label='Bot Token' isRequired />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name='phoneNumberId' label='Phone number' isRequired type='number' />
              </Grid>
            </Grid>
          </BasicDialogContent>
          <BasicDialogActions>
            <BasicButton variant='outlined' type='button' onClick={() => setOpen(false)}>
              Quay lại
            </BasicButton>
            <BasicButton variant='contained' type='submit'>
              Lưu
            </BasicButton>
          </BasicDialogActions>
        </FormProvider>
      </BasicDialog>
    </>
  );
};

export default ConfigTokenPlatform;
