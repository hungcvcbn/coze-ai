"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import LogoImage from "@/assets/icons/logo.png";
import Image from "next/image";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  chat,
  getAvailableModels,
  getChatExperience,
  loadConversation,
  requestUpload,
  uploadFile,
} from "@/helpers/api/chatbot";
import { useParams } from "next/navigation";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";
import { useRouter } from "next/navigation";
import ListPlatformPublish from "./platform/ListPlatformPublish";
import { IconButton, Tooltip, Select, MenuItem, FormControl } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { resetConversation } from "@/helpers/api/agent";
import { useAppSelector } from "@/redux/hooks";
import Grid from "@mui/material/Grid";
import { IconArrowDown } from "../common/IconCommon";
import { isEmpty } from "@/helpers/utils/common";
type Message = {
  sender: "user" | "system";
  text: string;
  suggestions?: string[];
  attachment?: {
    type: "file" | "image";
    url: string;
    name: string;
  };
};
interface ChatBoxProps {
  conversation: any;
  data: any;
}
const ChatBox = ({ conversation, data }: ChatBoxProps) => {
  const { triggerTime } = useAppSelector(state => state.common);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState("GPT-4o");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [availableModels, setAvailableModels] = useState<any[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getSuggestions = async () => {
    try {
      const res = await getChatExperience(data?.id);

      if (res && res.data && res.data.openingConversation) {
        setMessages([
          {
            sender: "system",
            text:
              res.data.openingConversation.openingText || "Xin chào! Tôi có thể giúp gì cho bạn?",
            suggestions: Array.isArray(res.data.openingConversation.openingQuestions)
              ? res.data.openingConversation.openingQuestions
              : [],
          },
        ]);
        return Array.isArray(res.data.openingConversation.openingQuestions)
          ? res.data.openingConversation.openingQuestions
          : [];
      }
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message || "Đã xảy ra lỗi khi tải dữ liệu",
          type: "error",
          show: true,
        })
      );
    }
  };

  const handleBotResponse = async (question: string, showUserMessage = true) => {
    if (isLoading) return;

    setIsLoading(true);
    setIsTyping(true);

    if (showUserMessage) {
      setMessages(prev => [...prev, { sender: "user", text: question } as Message]);
    }

    try {
      const params = {
        agentId: data?.id,
        question,
        conversationId: conversation ? conversation[0] : undefined,
        stream: true,
      };

      const response = await chat(params);
      setMessages(prev => [
        ...prev,
        {
          sender: "system",
          text: response.data.content,
        } as Message,
      ]);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: "error",
          show: true,
        })
      );
      setMessages(prev => [
        ...prev,
        {
          sender: "system",
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        } as Message,
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleChat = async () => {
    if (!input.trim()) return;
    const question = input.trim();
    setInput("");
    await handleBotResponse(question);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await requestUpload(5, {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });
      const res = await uploadFile(formData, uploadResponse.data.uploadToken);

      setMessages(prev => [...prev, { sender: "user", text: file.name } as Message]);
      await handleBotResponse(res.data.url, false);
    } catch (error) {
      dispatch(
        setToast({
          message: "Error handling file upload:",
          type: "error",
          show: true,
        })
      );
      setMessages(prev => [
        ...prev,
        {
          sender: "system",
          text: "Xin lỗi, đã có lỗi xảy ra khi xử lý tệp. Vui lòng thử lại sau.",
        } as Message,
      ]);
    } finally {
      if (event.target) event.target.value = "";
    }
  };

  const handleResetConversation = async () => {
    try {
      let params = {
        botId: data?.id,
      };
      const res = await resetConversation(params);

      if (res.data) {
        setMessages([{ sender: "system", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }]);
      }
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

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;

    setIsLoading(true);
    const userMessage = { sender: "user", text: suggestion };
    setMessages(prev =>
      prev.map((msg, index) =>
        index === prev.length - 1 ? { ...msg, suggestions: undefined } : msg
      )
    );
    setMessages(prev => [...prev, userMessage as Message]);

    setIsTyping(true);
    try {
      let params = {
        agentId: data?.id,
        question: suggestion,
        conversationId: conversation ? conversation[0] : undefined,
        stream: true,
      };
      const response = await chat(params);
      const botMessage = {
        sender: "system",
        text: response.data.content,
      } as Message;
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: "error",
          show: true,
        })
      );
      const errorMessage = {
        sender: "system",
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      } as Message;
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };
  const loadConversationAgent = async () => {
    try {
      let params = {
        botId: data?.id,
        conversationId: conversation ? conversation[0] : undefined,
      };
      const res = await loadConversation(params);

      if (res.data?.items && !isEmpty(res.data.items)) {
        const formattedMessages: Message[] = res.data.items.map((item: any) => ({
          sender: item.role === "user" ? "user" : "system",
          text: item.content,
        }));
        setMessages(formattedMessages);
      }
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
    if (!isEmpty(conversation) && data?.id) {
      loadConversationAgent();
    }
  }, [conversation, data?.id]);
  useEffect(() => {
    if (triggerTime && data?.id) {
      getSuggestions();
    }
  }, [triggerTime, data?.id]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);
  return (
    <div className='flex flex-col h-full relative'>
      <div className='h-auto min-h-[50px] p-3 flex items-center border-b rounded-t-lg border-gray-200 bg-white justify-between'>
        <div className='flex items-center gap-2'>
          <Image
            src={LogoImage}
            alt='Bot Avatar'
            width={40}
            height={40}
            className='rounded-full w-10 h-10 object-cover'
          />
          <div className='flex flex-col'>
            <span className='font-sans font-semibold text-neutral text-14-20'>
              {data?.name || "AI Assistant"}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Tooltip title='Reset conversation' placement='top'>
            <IconButton onClick={handleResetConversation} size='small'>
              <CleaningServicesIcon sx={{ color: "#6A5ACD", fontSize: "1.1rem" }} />
            </IconButton>
          </Tooltip>
          <BasicButton size='sm' onClick={() => setOpen(true)} variant='outlined'>
            Publish
          </BasicButton>
        </div>
      </div>
      <div
        className='flex-1 max-h-[calc(100vh-200px)] overflow-y-auto p-2 sm:p-4 [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full'
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "system" && (
              <div className='flex items-start flex-col max-w-[85%] sm:max-w-[75%]'>
                <div className='flex items-start'>
                  <Image
                    src={LogoImage}
                    alt='Bot Avatar'
                    width={40}
                    height={40}
                    className='rounded-full w-10 h-10 object-cover mr-2'
                  />
                  <div className='px-4 py-2 bg-white text-14-20 rounded-lg shadow-lg'>
                    <pre className='whitespace-pre-wrap font-sans font-normal text-neutral'>
                      {msg.text}
                    </pre>
                  </div>
                </div>
                {msg.suggestions && (
                  <div className='ml-12 mt-2 flex gap-2 flex-wrap'>
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className='text-start px-4 py-2 bg-white shadow-md hover:bg-gray-300 rounded-lg text-12-18 text-neutral font-sans font-normal transition duration-200'
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {msg.sender === "user" && (
              <div className='flex font-sans  items-start max-w-[85%] sm:max-w-[75%]'>
                <div className='px-4 py-2 bg-blue-100 text-14-20 text-neutral font-sans font-normal rounded-lg shadow-lg'>
                  {msg.text}
                  {msg.attachment && (
                    <div className='mt-2'>
                      {msg.attachment.type === "image" ? (
                        <img
                          src={msg.attachment.url}
                          alt={msg.attachment.name}
                          className='max-w-[200px] rounded-lg'
                        />
                      ) : (
                        <a
                          href={msg.attachment.url}
                          download={msg.attachment.name}
                          className='flex items-center gap-2 text-blue-600 hover:underline'
                        >
                          <AttachFileIcon sx={{ fontSize: "20px", color: "#6A5ACD" }} />
                          {msg.attachment.name}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <Image
                  src={AdminAvatar}
                  alt='User Avatar'
                  width={40}
                  height={40}
                  className='rounded-full w-10 h-10 object-cover ml-2'
                />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className='flex items-center gap-2 text-neutral font-sans font-normal text-12-18'>
            <Image
              src={LogoImage}
              alt='Typing Avatar'
              width={40}
              height={40}
              className='rounded-full mr-2'
            />
            <div className='flex gap-1'>
              <span className='w-1 h-1 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.3s]'></span>
              <span className='w-1 h-1 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.15s]'></span>
              <span className='w-1 h-1 rounded-full bg-gray-600 animate-bounce'></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='flex items-center rounded-b-lg gap-2 pt-2 border-t border-gray-200 p-2 bg-white sticky bottom-0 left-0 right-0'>
        <div className='flex-1'>
          <CustomTextField
            fullWidth
            multiline
            maxRows={7}
            size='small'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Vui lòng nhập câu hỏi...'
            onKeyPress={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
              }
            }}
            disabled={isLoading}
            inputRef={inputRef}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                padding: "4px 8px",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
                maxHeight: "150px",
                overflowY: "auto",
                padding: "8px 12px",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
              },
            }}
            InputProps={{
              endAdornment: (
                <div className='flex items-center gap-2'>
                  <AttachFileIcon
                    fontSize='small'
                    sx={{
                      color: isLoading ? "#A8A8A8" : "#6A5ACD",
                      cursor: isLoading ? "default" : "pointer",
                      "&:hover": { color: isLoading ? "#A8A8A8" : "#3E2A91" },
                    }}
                    onClick={() => !isLoading && fileInputRef.current?.click()}
                  />
                  <Send
                    fontSize='small'
                    sx={{
                      color: isLoading ? "#A8A8A8" : "#6A5ACD",
                      cursor: isLoading ? "default" : "pointer",
                      "&:hover": { color: isLoading ? "#A8A8A8" : "#3E2A91" },
                    }}
                    onClick={handleChat}
                  />
                </div>
              ),
            }}
          />
        </div>
        <input
          ref={fileInputRef}
          type='file'
          accept='.pdf,.doc,.docx'
          className='hidden'
          onChange={handleFileUpload}
          disabled={isLoading}
        />
      </div>
      <ListPlatformPublish open={open} setOpen={setOpen} />
    </div>
  );
};

export default ChatBox;
