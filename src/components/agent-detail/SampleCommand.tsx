"use client";

import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import { useForm } from "react-hook-form";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import FormProvider from "../hook-form/FormProvider";
import { useEffect, useState } from "react";
import BasicButton from "../common/BasicButton";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
import SelectField from "../hook-form/SelectField";

interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type BotType = {
  name: string;
  imageUrl?: string;
};

const CreateBotModal = ({ open, setOpen }: CreateBotModalProps) => {
  const [value, setValue] = useState<string | number>(-1);
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

  const handleChange = (value: string | number) => {
    setValue(value);
  };
  const sampleCommands = [
    {
      label: "Lệnh điều khiển mẫu 1",
      value: "Lệnh 1",
      description:
        "Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone. Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng AddCircleOutlineIcon ",
    },
    {
      label: "Lệnh điều khiển mẫu 2",
      value: "Lệnh 2",
      description: "Điều khiển mẫu mới",
    },
    {
      label: "Lệnh điều khiển mẫu 3",
      value: "Lệnh 3",
      description: "Lệnh điều khiển mẫu 3",
    },
    {
      label: "Lệnh điều khiển mẫu 4",
      value: "Lệnh 4",
      description:
        "Nhân vật Bạn đang đảm nhận vai trò của một nhân viên chăm sóc khách hàng của Metfone. Nhiệm vụ của bạn là trả lời câu hỏi của khách hàng về sản phẩm, dịch vụ của công ty bằng AddCircleOutlineIcon ",
    },
    {
      label: "Lệnh điều khiển mẫu 5",
      value: "Lệnh 5",
      description: "Lệnh điều khiển mẫu 5",
    },
  ];
  return (
    <BasicDialog
      open={open}
      onClose={() => setOpen(false)}
      title='Lệnh điều khiển mẫu'
      showCloseIcon
    >
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='grid grid-cols-2 gap-2'>
            <div></div>

            <SelectField
              size='small'
              placeholder='Chọn lệnh điều khiển mẫu'
              options={sampleCommands}
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2 bg-gray-200 rounded-[8px] p-2 mt-2 h-[500px] overflow-y-auto'>
            {value && (
              <div className='text-14-20 text-neutral font-inter-500'>
                {sampleCommands.find(item => item.value === value)?.description}
              </div>
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
            Hủy bỏ
          </BasicButton>
          <BasicButton type='submit' variant='contained' color='primary'>
            Lưu
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default CreateBotModal;
