import React, { forwardRef } from "react";
// import { getUrlFile, validateImageFile } from "@/utils/uploadFile";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { FieldError } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  value: string | null;
  onChange: Function;
  size: "small" | "medium";
  uploadFolder: string;
  error?: FieldError;
};

const UploadImage = forwardRef<HTMLInputElement, Props>(
  ({ value, size, uploadFolder, onChange, error }, ref) => {
    const dispatch = useDispatch();

    // const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //   e.preventDefault();
    //   const requestFile = e?.target?.files?.[0] || null;
    //   try {
    //     // validateImageFile(requestFile);
    //     // const url = await getUrlFile(requestFile, uploadFolder);
    //     onChange(url);
    //   } catch (error: any) {
    //     dispatch(
    //       setToast({
    //         message: error?.message,
    //         type: "error",
    //         show: true,
    //       })
    //     );
    //   }
    // };

    const handleClear = () => {
      onChange("");
    };

    return (
      <div
        className={clsx(
          {
            "w-[172px] h-[172px]": size === "medium",
            "w-[80px] h-[80px]": size === "small",
            "border border-dashed cursor-pointer": !value,
            "border-danger bg-danger-50": !!error,
          },
          "relative flex items-center justify-center rounded-md "
        )}
      >
        {value ? (
          <>
            <img
              src={value}
              alt=''
              width={120}
              height={120}
              className={clsx(
                {
                  "w-[172px] h-[172px]": size === "medium",
                  "w-[80px] h-[80px]": size === "small",
                },
                "rounded-md object-scale-down"
              )}
            />
            <button
              className={clsx(
                { "p-[7px]": size === "medium", "p-[3px]": size === "small" },
                "absolute top-1 right-1 bg-neutral rounded-full p-[7px]"
              )}
              onClick={handleClear}
            >
              <CloseIcon width={13} height={13} />
            </button>
          </>
        ) : (
          <>
            <input
              ref={ref}
              type='file'
              // onChange={handleUploadImage}
              accept='image/*'
              className='opacity-0 absolute inset-0'
            />
            <p className='text-primary'>Thêm ảnh</p>
          </>
        )}
      </div>
    );
  }
);

export default UploadImage;
