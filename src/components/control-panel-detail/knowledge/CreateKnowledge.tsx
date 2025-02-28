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

type FileType = "TEXT" | "TABLE" | "IMAGE";
type SourceType = "local" | "online" | "notion" | "custom";

const CreateKnowledge = ({
  openCreateModal,
  setOpenCreateModal,
  selectedKnowledge,
}: CreateKnowledgeProps) => {
  const dispatch = useAppDispatch();
  const [knowledge, setKnowledge] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<FileType>("TEXT");
  const [selectedSource, setSelectedSource] = useState<SourceType | "">("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const getAcceptedFileTypes = (source: SourceType) => {
    switch (source) {
      case "local":
        return ".doc,.docx,.pdf,.txt";
      case "online":
        return ".html,.htm,.url";
      case "notion":
        return ".md,.mdx";
      case "custom":
        return "*.*";
      default:
        return "";
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      console.log("Selected source:", selectedSource);
    }
  };

  const handleSourceClick = (source: SourceType) => {
    setSelectedSource(source);
  };

  const renderSourceButton = (
    source: SourceType,
    icon: string,
    title: string,
    description: string
  ) => (
    <button
      type='button'
      onClick={() => handleSourceClick(source)}
      className={`p-2 rounded-lg border-2 flex flex-col items-center ${
        selectedSource === source ? "border-primary-600 bg-primary-50" : "border-gray-200"
      }`}
    >
      <span className='text-2xl'>{icon}</span>
      <span className='font-medium text-14-20'>{title}</span>
      <span className='text-12-18 text-gray-500  '>{description}</span>
    </button>
  );

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
              <div className='grid grid-cols-3 gap-4'>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedType("TEXT");
                    form.setValue("type", "TEXT");
                  }}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${
                    selectedType === "TEXT" ? "border-primary-600 bg-primary-50" : "border-gray-200"
                  }`}
                >
                  <span className='text-2xl'>📝</span>
                  <span>Text format</span>
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedType("TABLE");
                    form.setValue("type", "TABLE");
                  }}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${
                    selectedType === "TABLE"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200"
                  }`}
                >
                  <span className='text-2xl'>📊</span>
                  <span>Table format</span>
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setSelectedType("IMAGE");
                    form.setValue("type", "IMAGE");
                  }}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${
                    selectedType === "IMAGE"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200"
                  }`}
                >
                  <span className='text-2xl'>🖼️</span>
                  <span>Image format</span>
                </button>
              </div>

              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileUpload}
                className='hidden'
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
                placeholder='Nhập nội dung của knowledge'
                multiline
                rows={4}
                isRequired
              />

              <div className='grid grid-cols-2 gap-4'>
                {renderSourceButton("local", "📄", "Local documents", "Upload DOC, PDF, TXT files")}
                {renderSourceButton("online", "🌐", "Online data", "Upload HTML, URL files")}
                {renderSourceButton("notion", "📝", "Notion", "Upload Markdown files")}
                {renderSourceButton("custom", "📑", "Custom", "Upload any file type")}
              </div>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-600 transition-colors'>
                <input
                  type='file'
                  id='file-upload'
                  className='hidden'
                  accept={getAcceptedFileTypes(selectedSource as SourceType)}
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
                    {selectedSource ? (
                      <span className='text-primary-600 font-medium'>
                        Click để tải lên {getAcceptedFileTypes(selectedSource as SourceType)} files
                      </span>
                    ) : (
                      <span className='text-gray-400'>
                        Vui lòng chọn loại nguồn trước khi tải lên
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </BasicDialogContent>
          <BasicDialogActions>
            <BasicButton
              variant='outlined'
              type='button'
              color='primary'
              onClick={() => setOpenCreateModal(false)}
            >
              Cancel
            </BasicButton>
            <BasicButton type='submit' variant='contained' color='primary'>
              Create and Import
            </BasicButton>
          </BasicDialogActions>
        </FormProvider>
      </BasicDialog>
    </div>
  );
};

export default CreateKnowledge;
