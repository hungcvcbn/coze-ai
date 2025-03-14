"use client";
import React, { useState, useEffect, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SampleCommand from "./SampleCommand";
import { updateAgentSetup } from "@/helpers/api/agent";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";
import ConfirmDialog from "../hook-form/ConfirmDialog";
import { MenuItem, ListSubheader } from "@mui/material";
import { Select } from "@mui/material";
import { IconArrowDown } from "../common/IconCommon";
import { getAvailableModels } from "@/helpers/api/chatbot";

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
  const [model, setModel] = useState("gpt-4");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [availableModels, setAvailableModels] = useState<any>({});

  const handleChangeModel = (value: string | number) => {
    setModel(value as string);
  };

  useEffect(() => {
    if (data?.setup?.personaPrompt) {
      setPersonaPrompt(data.setup.personaPrompt);
      setModel(data.setup.model);
    }
  }, [data]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonaPrompt(e.target.value);
  };

  const fetchAvailableModels = async () => {
    try {
      const res = await getAvailableModels(data?.id);
      setAvailableModels(res.data);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: "error",
          show: true,
        })
      );
    }
  };

  useEffect(() => {
    if (data?.id) {
      fetchAvailableModels();
    }
  }, [data?.id]);

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

  const groupModelsByProvider = (models: any[]) => {
    return models.reduce((acc: { [key: string]: any[] }, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = [];
      }
      acc[model.provider].push(model);
      return acc;
    }, {});
  };

  return (
    <div className='flex flex-col gap-2 pt-2 bg-white text-neutral'>
      <div className='flex items-center gap-2 justify-between'>
        <div className='text-14-20 font-semibold'>Persona & Prompt</div>
        <div className='w-[200px]'>
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
              minWidth: "200px",
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
            {Object.entries(groupModelsByProvider(availableModels?.items || [])).map(
              ([provider, models]) => [
                <ListSubheader
                  key={provider}
                  sx={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    backgroundColor: "#F9FAFB",
                  }}
                >
                  {provider}
                </ListSubheader>,
                ...models.map((model: any) => (
                  <MenuItem
                    key={`${model.provider}-${model.code}`}
                    value={model.code}
                    sx={{ fontSize: "14px", pl: 3 }}
                  >
                    {model.code} ({model.releaseYear})
                  </MenuItem>
                )),
              ]
            )}
          </Select>
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
