"use client";

import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import RHFTextField from "../hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import FormProvider from "../hook-form/FormProvider";
import { useEffect } from "react";
import BasicButton from "../common/BasicButton";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
import { updateAgent } from "@/helpers/api/agent";
import { useParams } from "next/navigation";
// import RHFUploadImage from "../hook-form/RHFUploadImage";
interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  fetchData: Function;
}

type BotType = {
  name: string;
  // imageUrl?: string;
};

const EditCommandModal = ({ open, setOpen, data, fetchData }: CreateBotModalProps) => {
  const dispatch = useAppDispatch();
  const botId = useParams();
  const defaultValues: BotType = {
    name: "",
    // imageUrl: "",
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
    try {
      await updateAgent(botId?.id as string, data);
      dispatch(setToast({ message: "Thành công", type: "success", show: true }));
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (open && data) {
      form.reset({
        name: data?.name,
        // imageUrl: data?.imageUrl,
      });
    }
  }, [open]);

  return (
    <BasicDialog open={open} onClose={() => setOpen(false)} title='Bot Information' showCloseIcon>
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            <div className='text-14-20 font-medium text-neutral'>
              <span className='font-semibold'>Bot ID:</span> {data?.id}
            </div>
            <RHFTextField name='name' label='Bot Name' placeholder='Enter bot name' isRequired />
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
            Update
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default EditCommandModal;
