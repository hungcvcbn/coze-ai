"use client";

import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import RHFTextField from "../hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import RHFSelect from "../hook-form/RHFSelect";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import FormProvider from "../hook-form/FormProvider";
import { useEffect } from "react";
import BasicButton from "../common/BasicButton";
import { addAgent } from "@/helpers/api/control";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type BotType = {
  botType?: string;
  botName: string;
  command: string;
  description: string;
};

const CreateBotModal = ({ open, setOpen }: CreateBotModalProps) => {
  const dispatch = useAppDispatch();
  const defaultValues: BotType = {
    botType: "Coze-AI",
    botName: "",
    command: "",
    description: "",
  };
  const schema = yup.object().shape({
    botName: yup.string().required(),
    command: yup.string().required(),
    description: yup.string().required(),
  });
  const form = useForm<BotType>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch, handleSubmit } = form;
  const botType = watch("botType");

  const onSubmit = async (data: BotType) => {
    try {
      console.log('data', data)
      await addAgent({ name: data.botName, description: data.description });
      dispatch(setToast({ message: "Thành công", type: "success", show: true }));
      setOpen(false);
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
      <FormProvider methods={form} onSubmit={handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            <RHFSelect
              name='botType'
              options={[
                { value: "Coze-AI", label: "Bot Coze AI" },
                { value: "GPTs", label: "Bot GPTs (Nâng cao)" },
              ]}
              label='Chọn loại bot'
            />
            <RHFTextField name='botName' label='Tên bot' placeholder='Nhập tên bot' isRequired />

            {botType === "Mindmaid" ? (
              <RHFTextField
                name='command'
                label='Lệnh điều khiển'
                placeholder='Nhập lệnh điều khiển'
                multiline
                rows={4}
                isRequired
              />
            ) : (
              <RHFTextField
                name='description'
                label='Mô tả'
                placeholder='Nhập mô tả'
                multiline
                rows={4}
                isRequired
              />
            )}
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
