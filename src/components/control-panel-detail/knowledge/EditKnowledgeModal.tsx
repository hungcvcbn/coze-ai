"use client";

import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import RHFSelect from "@/components/hook-form/RHFSelect";
import { setToast } from "@/redux/slices/common";
import { useAppDispatch } from "@/redux/hooks";
import FormProvider from "@/components/hook-form/FormProvider";
import { useEffect } from "react";
import BasicButton from "@/components/common/BasicButton";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/helpers/utils/yupConfig";
import { addKnowledge, updateKnowledge } from "@/helpers/api/knowledge";
interface EditKnowledgeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedKnowledge: any;
  fetchKnowledge: Function;
}

type BotType = {
  id?: string;
  type?: string;
  name: string;
  description?: string;
};

const EditKnowledgeModal = ({
  open,
  setOpen,
  selectedKnowledge,
  fetchKnowledge,
}: EditKnowledgeModalProps) => {
  const dispatch = useAppDispatch();
  const defaultValues: BotType = {
    type: "Text",
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
      if (selectedKnowledge.id) {
        await updateKnowledge(selectedKnowledge.id, params);
      } else {
        await addKnowledge(params);
      }
      dispatch(setToast({ message: "Thành công", type: "success", show: true }));
      setOpen(false);
      fetchKnowledge();
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: "error", show: true }));
    }
  };
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);
  useEffect(() => {
    if (selectedKnowledge) {
      form.reset({
        name: selectedKnowledge.label,
        description: selectedKnowledge.help,
        type: selectedKnowledge.type,
      });
    }
  }, [selectedKnowledge]);
  return (
    <BasicDialog
      open={open}
      onClose={() => setOpen(false)}
      title={`${selectedKnowledge.id ? "Chỉnh sửa" : "Tạo"} knowledge`}
      showCloseIcon
    >
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDialogContent>
          <div className='flex flex-col gap-2'>
            <RHFSelect
              name='type'
              options={[
                { value: "TEXT", label: "Text" },
                { value: "TABLE", label: "Table" },
                { value: "IMAGE", label: "Image" },
              ]}
              label='Chọn loại knowledge'
            />
            <RHFTextField
              name='name'
              label='Tên knowledge'
              placeholder='Nhập tên knowledge'
              isRequired
            />

            <RHFTextField
              name='description'
              label='Mô tả'
              placeholder='Nhập mô tả'
              multiline
              rows={4}
              isRequired
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
            {selectedKnowledge.id ? "Cập nhật" : "Tạo knowledge"}
          </BasicButton>
        </BasicDialogActions>
      </FormProvider>
    </BasicDialog>
  );
};

export default EditKnowledgeModal;
