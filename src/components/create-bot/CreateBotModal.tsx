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
      title='Start Creating Your Bot'
      showCloseIcon
    >
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            <RHFTextField name='name' label='Bot Name' placeholder='Enter bot name' isRequired />
            <RHFTextField
              name='description'
              label='Description'
              placeholder='Enter description'
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
            Close
          </BasicButton>
          <BasicButton type='submit' variant='contained' color='primary'>
            Create Bot
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default CreateBotModal;
