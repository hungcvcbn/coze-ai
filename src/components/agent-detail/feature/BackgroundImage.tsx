import BasicDialog from "@/components/common/BasicDialog";
import BasicDialogContent from "@/components/common/BasicDialogContent";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { setToast } from "@/redux/slices/common";
import { uploadFile } from "@/helpers/api/chatbot";
import { useAppDispatch } from "@/redux/hooks";
import BasicButton from "@/components/common/BasicButton";

interface IBackgroundImage {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BackgroundImage = ({ open, setOpen }: IBackgroundImage) => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadFile(formData);
    } catch (error) {
      dispatch(
        setToast({
          message: "Error handling file upload:",
          type: "error",
          show: true,
        })
      );
    } finally {
      if (event.target) event.target.value = "";
    }
  };
  return (
    <BasicDialog showCloseIcon open={open} onClose={() => setOpen(false)} title='Background Image'>
      <BasicDialogContent>
        <div
          className='flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-[300px]'
          onClick={() => ref.current?.click()}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: "#6A5ACD" }} />
          <div className='text-center'>
            <p className='mb-1 text-14-20 font-sans font-medium text-gray-500'>
              Click to upload or drag and drop the image here
            </p>
            <p className='text-14-20 font-sans font-normal text-gray-500'>
              Supports uploading images in PNG, JPG, and JPEG formats
            </p>
          </div>
          <BasicButton
            variant='outlined'
            className='mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
          >
            Upload Image
          </BasicButton>
        </div>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={ref}
          onChange={handleFileUpload}
        />
      </BasicDialogContent>
    </BasicDialog>
  );
};

export default BackgroundImage;
