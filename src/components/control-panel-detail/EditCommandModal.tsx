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
import { addAgent } from "@/helpers/api/control";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
import RHFUploadImage from "../hook-form/RHFUploadImage";
interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type BotType = {
  name: string;
  imageUrl?: string;
};

const CreateBotModal = ({ open, setOpen }: CreateBotModalProps) => {
  const dispatch = useAppDispatch();
  const defaultValues: BotType = {
    name: "",
    imageUrl: "",
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    imageUrl: yup.string(),
  });
  const form = useForm<BotType>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: BotType) => {
    dispatch(setToast({ message: "Thành công", type: "success", show: true }));
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <BasicDialog open={open} onClose={() => setOpen(false)} title='Thông tin Bot' showCloseIcon>
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            <div className='text-14-20 font-semibold text-neutral'>Bot ID: abc</div>
            <RHFTextField name='name' label='Tên bot' placeholder='Nhập tên bot' isRequired />
            <div className='flex flex-col gap-2'>
              <div className='text-14-20 font-semibold text-neutral'>Ảnh đại diện:</div>
              <RHFUploadImage name='imageUrl' uploadFolder='avatar' />
            </div>
          </div>
        </BasicDialogContent>

        <BasicDialogActions>
          <BasicButton
            variant='outlined'
            type='button'
            color='primary'
            onClick={() => setOpen(false)}
          >
            Hủy bỏ
          </BasicButton>
          <BasicButton type='submit' variant='contained' color='primary'>
            Cập nhật
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default CreateBotModal;
