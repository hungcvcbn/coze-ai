"use client";

import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import RHFTextField from "../hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import RHFSelect from "../hook-form/RHFSelect";
import { setToast, setTriggerTime } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import FormProvider from "../hook-form/FormProvider";
import { useEffect } from "react";
import BasicButton from "../common/BasicButton";
import { addAgent } from "@/helpers/api/agent";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
import { useRouter } from "next/navigation";
interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type BotType = {
  name: string;
  description?: string;
};

const CreateBotModal = ({ open, setOpen }: CreateBotModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const defaultValues: BotType = {
    name: "",
    description: "",
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
  });
  const form = useForm<BotType>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });


  const onSubmit = async (data: BotType) => {
    let params = {
      ...data,
    };
    try {
      const res = await addAgent(params);
      if (res?.data) {
        dispatch(setToast({ message: "Thành công", type: "success", show: true }));
        setOpen(false);
        dispatch(setTriggerTime(new Date().getTime()));
        router.push(`/control-panel/${res.data.id}/settings`);
      }
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: "error", show: true }));
    }
  };
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <BasicDialog
      open={open}
      onClose={() => setOpen(false)}
      title='Bắt đầu tạo Bot của bạn'
      showCloseIcon
    >
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            {/* <RHFSelect
              name='botType'
              options={[
                { value: "Coze-AI", label: "Bot Zenee AI" },
                { value: "GPTs", label: "Bot GPTs (Nâng cao)" },
              ]}
              label='Chọn loại bot'
            /> */}
            <RHFTextField name='name' label='Tên bot' placeholder='Nhập tên bot' isRequired />
            <RHFTextField
              name='description'
              label='Mô tả'
              placeholder='Nhập mô tả'
              multiline
              rows={4}
            />
          </div>
        </BasicDialogContent>
        <BasicDialogActions>
          <BasicButton
            variant='outlined'
            type='button'
            color='primary'
            onClick={() => setOpen(false)}
          >
            Đóng
          </BasicButton>
          <BasicButton type='submit' variant='contained' color='primary'>
            Tạo bot
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default CreateBotModal;
