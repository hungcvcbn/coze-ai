"use client";
import React, { useState, useEffect, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SampleCommand from "./SampleCommand";
import { updateAgentSetup } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";
import ConfirmDialog from "../hook-form/ConfirmDialog";
interface IControlCommand {
  data: any;
  fetchAgentDetail: Function;
}
const ControlCommand = ({ data, fetchAgentDetail }: IControlCommand) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const defaultPrompt = data?.setup?.personaPrompt || "";
  const [personaPrompt, setPersonaPrompt] = useState<string>(defaultPrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (data?.setup?.personaPrompt) {
      setPersonaPrompt(data.setup.personaPrompt);
    }
  }, [data]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonaPrompt(e.target.value);
  };

  const handleUpdatePrompt = async (isConfirm?: boolean) => {
    if (isConfirm) {
      try {
        await updateAgentSetup(data.id, { personaPrompt });
        dispatch(
          setToast({
            message: "Cập nhật thành công",
            type: "success",
            show: true,
          })
        );
        fetchAgentDetail();
        setOpenConfirm(false);
      } catch (error: any) {
        dispatch(
          setToast({
            message: error.message,
            type: "error",
            show: true,
          })
        );
      }
    } else {
      setOpenConfirm(false);
    }
  };

  const handleCancel = () => {
    setPersonaPrompt(defaultPrompt);
  };

  return (
    <div className='flex flex-col gap-2 pt-4 bg-white text-neutral border-x border-b border-gray-200 p-4'>
      <div className='flex gap-2 justify-between items-center'>
        <div className='text-14-20 font-semibold'>Persona & Prompt</div>
        <div className='flex gap-4 justify-end pt-1'>
          <div className='text-14-20 flex justify-center items-center font-semibold text-primary border border-primary rounded-[10px] px-2 py-1 cursor-pointer'>
            Tối ưu
          </div>
          <button
            className='text-14-20 flex justify-center items-center font-semibold text-primary gap-1 px-2 py-1 cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlineIcon />
            Lệnh mẫu
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className='text-14-20 text-gray-500 w-full p-2 border border-gray-200 rounded resize-none
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full'
        value={personaPrompt}
        onChange={handleTextareaChange}
        rows={30}
      />
      <div className='flex justify-end gap-2'>
        <BasicButton type='submit' variant='outlined' color='primary' onClick={handleCancel}>
          Huỷ
        </BasicButton>
        <BasicButton
          type='submit'
          variant='contained'
          color='primary'
          onClick={() => setOpenConfirm(true)}
        >
          Cập nhật
        </BasicButton>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleUpdatePrompt}
        title='Xác nhận'
        subTitle='Bạn có muốn cập nhật thông tin này?'
      />
      <SampleCommand open={open} setOpen={setOpen} />
    </div>
  );
};

export default ControlCommand;
