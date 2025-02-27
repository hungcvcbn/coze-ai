import React, { useEffect, useState } from "react";
import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import BasicDialogActions from "@/components/common/BasicDialogActions";
import BasicButton from "@/components/common/BasicButton";
import { CloudUpload } from "@mui/icons-material";

import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import FormProvider from "@/components/hook-form/FormProvider";
import { setToast } from "@/redux/slices/common";
import { addKnowledge, getKnowledge } from "@/helpers/api/knowledge";
import { useForm } from "react-hook-form";
import yup from "@/helpers/utils/yupConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateKnowledge } from "@/helpers/api/knowledge";
import { useAppDispatch } from "@/redux/hooks";
interface CreateKnowledgeProps {
  openCreateModal: boolean;
  setOpenCreateModal: (open: boolean) => void;
  selectedKnowledge: any;
}
type BotType = {
  id?: string;
  type?: string;
  name: string;
  description?: string;
};

const CreateKnowledge = ({
  openCreateModal,
  setOpenCreateModal,
  selectedKnowledge,
}: CreateKnowledgeProps) => {
  const dispatch = useAppDispatch();
  const [knowledge, setKnowledge] = useState<any>([]);

  const defaultValues: BotType = {
    type: "TEXT",
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
  const fetchKnowledge = async () => {
    try {
      const res = await getKnowledge();
      setKnowledge(res?.data);
    } catch (error: any) {
      dispatch(setToast({ type: "error", message: error?.message, show: true }));
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);
  const onSubmit = async (data: BotType) => {
    let params = {
      ...data,
    };

    try {
      if (selectedKnowledge?.id) {
        await updateKnowledge(selectedKnowledge?.id, params);
      } else {
        await addKnowledge(params);
      }
      dispatch(setToast({ message: "Thành công", type: "success", show: true }));
      setOpenCreateModal(false);
      fetchKnowledge();
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: "error", show: true }));
    }
  };
  useEffect(() => {
    if (openCreateModal) {
      form.reset();
    }
  }, [openCreateModal]);
  useEffect(() => {
    if (selectedKnowledge) {
      form.reset({
        name: selectedKnowledge.name,
        description: selectedKnowledge.description,
        type: selectedKnowledge.type,
      });
    }
  }, [selectedKnowledge]);
  return (
    <div>
      {" "}
      <BasicDialog
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title={selectedKnowledge?.id ? "Edit Knowledge" : "Create Knowledge"}
        showCloseIcon
        maxWidth='sm'
        fullWidth
      >
        <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <BasicDialogContent>
            <div className='flex flex-col gap-4'>
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
              {selectedKnowledge && (
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-600 transition-colors'>
                  <input
                    type='file'
                    id='file-upload'
                    className='hidden'
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log("Selected file:", file);
                      }
                    }}
                  />
                  <label
                    htmlFor='file-upload'
                    className='cursor-pointer flex flex-col items-center gap-2'
                  >
                    <CloudUpload className='text-gray-400 text-4xl' />
                    <div className='text-gray-600'>
                      <span className='text-primary-600 font-medium'>Click để tải lên file</span>
                    </div>
                    <p className='text-sm text-gray-500'>
                      Hỗ trợ tải lên một file. PDF, DOCX, TXT lên đến 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          </BasicDialogContent>
          <BasicDialogActions>
            <BasicButton
              variant='outlined'
              type='button'
              color='primary'
              onClick={() => setOpenCreateModal(false)}
            >
              Đóng
            </BasicButton>
            <BasicButton type='submit' variant='contained' color='primary'>
              {selectedKnowledge?.id ? "Cập nhật" : "Tạo knowledge"}
            </BasicButton>
          </BasicDialogActions>
        </FormProvider>
      </BasicDialog>
    </div>
  );
};

export default CreateKnowledge;
