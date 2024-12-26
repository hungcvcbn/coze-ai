"use client";

import BasicDialog from "../common/BasicDialog";
import BasicDialogContent from "../common/BasicDialogContent";
import BasicDialogActions from "../common/BasicDialogActions";
import { Button, TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface CreateBotModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateBotModal = ({ open, setOpen }: CreateBotModalProps) => {
  const [botType, setBotType] = useState("Mindmaid");
  const [botName, setBotName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [command, setCommand] = useState("");

  const handleBotTypeChange = (event: SelectChangeEvent<string>) => {
    setBotType(event.target.value as string);
  };

  return (
    <BasicDialog
      open={open}
      onClose={() => setOpen(false)}
      title='Bắt đầu tạo Bot của bạn'
      showCloseIcon
    >
      <BasicDialogContent>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <div className='text-[14px] font-semibold pt-2'>Chọn loại bot:</div>
            <Select
              value={botType}
              onChange={handleBotTypeChange}
              sx={{ fontSize: "14px" }}
              size='small'
            >
              <MenuItem sx={{ fontSize: "14px" }} value='Mindmaid'>
                Bot Mindmaid
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value='GPTs'>
                Bot GPTs (Nâng cao)
              </MenuItem>
            </Select>
          </div>
          <div className='flex flex-col'>
            <div className='text-[14px] font-semibold'>Tên bot:</div>
            <TextField
              sx={{ marginTop: 0 }}
              placeholder='Nhập tên bot'
              value={botName}
              onChange={e => setBotName(e.target.value)}
              fullWidth
              margin='normal'
            />
          </div>
          <div className='flex flex-col'>
            <div className='text-[14px] font-semibold'>API Key OpenAI:</div>
            <TextField
              // label='API Key OpenAI'
              sx={{ marginTop: 0 }}
              placeholder='Nhập API Key OpenAI'
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              fullWidth
              margin='normal'
              type='password'
            />
          </div>
          {botType === "Mindmaid" ? (
            <div className='flex flex-col'>
              <div className='text-[14px] font-semibold'>Lệnh điều khiển:</div>
              <TextField
                sx={{ marginTop: 0 }}
                // label='Lệnh điều khiển'
                placeholder='Nhập lệnh điều khiển'
                value={command}
                onChange={e => setCommand(e.target.value)}
                fullWidth
                margin='normal'
                multiline
                rows={4}
              />
            </div>
          ) : (
            <div className='flex flex-col'>
              <div className='text-[14px] font-semibold'>Mô tả:</div>
              <TextField
                // label='Mô tả'
                sx={{ marginTop: 0 }}
                placeholder='Nhập mô tả'
                value={command}
                onChange={e => setCommand(e.target.value)}
                fullWidth
                margin='normal'
                multiline
                rows={4}
              />
            </div>
          )}
        </div>
      </BasicDialogContent>
      <BasicDialogActions>
        <Button variant='outlined' color='primary' onClick={() => setOpen(false)}>
          Đóng
        </Button>
        <Button variant='contained' color='primary'>
          Tạo bot
        </Button>
      </BasicDialogActions>
    </BasicDialog>
  );
};

export default CreateBotModal;
