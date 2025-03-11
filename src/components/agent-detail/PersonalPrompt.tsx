"use client";
import React, { useState, useEffect, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SampleCommand from "./SampleCommand";
import { updateAgentSetup } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";
import ConfirmDialog from "../hook-form/ConfirmDialog";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import { IconArrowDown } from "../common/IconCommon";
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
  const [selectOpen, setSelectOpen] = useState(false);
  const [model, setModel] = useState("GPT-4o");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeModel = (value: string | number) => {
    setModel(value as string);
  };
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
      let dataUpdate = {
        personaPrompt,
        model,
      };
      try {
        await updateAgentSetup(data.id, dataUpdate);
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
    <div className='flex flex-col gap-2 pt-2 bg-white text-neutral'>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div className='text-14-20 font-semibold w-full'>Persona & Prompt</div>
          <div>
            <Select
              size='small'
              value={model}
              open={selectOpen}
              onOpen={() => setSelectOpen(true)}
              onClose={() => setSelectOpen(false)}
              onChange={e => handleChangeModel(e.target.value)}
              sx={{
                borderRadius: "8px",
                height: "30px",
                fontSize: "14px",
                paddingRight: "10px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                },
              }}
              IconComponent={() => (
                <button
                  style={{
                    transform: selectOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    padding: "0px",
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectOpen(!selectOpen);
                  }}
                >
                  <IconArrowDown width={16} height={16} />
                </button>
              )}
            >
              <MenuItem sx={{ fontSize: "14px" }} value='GPT-4o'>
                GPT-4o
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value='GPT-4o-mini'>
                GPT-4o-mini
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value='GPT-3.5-turbo'>
                GPT-3.5-turbo
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value='GEMINI'>
                GEMINI
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className='flex gap-4 justify-end pt-1'>
          {/* <div className='text-12-18 flex justify-center items-center font-semibold text-primary border border-primary rounded-[10px] px-2 py-1 cursor-pointer'>
            Tối ưu
          </div> */}
          {/* <button
            className='text-14-20 flex justify-center items-center font-semibold text-primary gap-1 px-2 py-1 cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <AddCircleOutlineIcon sx={{ fontSize: "20px" }} />
            Lệnh mẫu
          </button> */}
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
        rows={32}
      />
      <div className='flex justify-end gap-2'>
        <BasicButton
          size='sm'
          type='button'
          variant='outlined'
          color='primary'
          onClick={handleCancel}
        >
          Huỷ
        </BasicButton>
        <BasicButton
          size='sm'
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
