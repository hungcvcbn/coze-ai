"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import LogoImage from "@/assets/icons/logo.png";
import Image from "next/image";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { chat, requestUpload, uploadFile } from "@/helpers/api/chatbot";
import { useParams } from "next/navigation";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";
import { useRouter } from "next/navigation";
import ListPlatformPublish from "./platform/ListPlatformPublish";
import { IconButton, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { resetConversation } from "@/helpers/api/agent";
type Message = {
  sender: "user" | "bot";
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
}
const ChatBox = ({ conversation }: ChatBoxProps) => {
  console.log("conversation", conversation);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const botId = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Chào mừng bạn! Tôi là trợ lý AI chuyên về hỗ trợ học và ứng dụng công nghệ trí tuệ nhân tạo. Tôi có thể giúp bạn:\na. Hiểu cơ bản về cách AI hoạt động\nb. Thực hành xây dựng các mô hình học máy (Machine Learning)\nBạn quan tâm đến chủ đề nào trước?",
      suggestions: ["Làm thế nào để bắt đầu học AI?", "Tìm hiểu về AI trong nhận diện hình ảnh"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleBotResponse = async (question: string, showUserMessage = true) => {
    if (isLoading) return;

    setIsLoading(true);
    setIsTyping(true);

    if (showUserMessage) {
      setMessages(prev => [...prev, { sender: "user", text: question } as Message]);
    }

    try {
      const params = {
        agentId: botId?.id as string,
        question,
        conversationId: conversation ? conversation[0] : undefined,
        stream: true,
      };

      const response = await chat(params);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
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
          sender: "bot",
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
          sender: "bot",
          text: "Xin lỗi, đã có lỗi xảy ra khi xử lý tệp. Vui lòng thử lại sau.",
        } as Message,
      ]);
    } finally {
      if (event.target) event.target.value = "";
    }
  };

  const handleLoadConversation = async () => {
    try {
      let params = {
        botId: botId?.id as string,
      };
      await resetConversation(params);
      setMessages([{ sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }]);
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
        agentId: botId?.id as string,
        question: suggestion,
        conversationId: conversation ? conversation[0] : undefined,
        stream: true,
      };
      const response = await chat(params);
      const botMessage = {
        sender: "bot",
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
        sender: "bot",
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      } as Message;
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full '>
      <div className='h-[56px] p-3 flex items-center border-b shadow-md rounded-t-lg border-gray-200 bg-white justify-end'>
        <BasicButton onClick={() => setOpen(true)}>Publish</BasicButton>
        <Tooltip title='Chọn kết nối với nền tảng' placement='top'>
          <IconButton onClick={() => router.push(`/control-panel/${botId?.id}/settings/list`)}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div
        className='flex-1 max-h-[754px] overflow-y-auto p-4 ƯE [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full'
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className='flex items-start flex-col'>
                <div className='flex items-start'>
                  <Image
                    src={LogoImage}
                    alt='Bot Avatar'
                    width={40}
                    height={40}
                    className='rounded-full w-10 h-10 object-cover mr-2'
                  />
                  <div className='px-4 py-2 bg-white text-14-20 text-gray-800 rounded-lg shadow-lg'>
                    <pre className='whitespace-pre-wrap font-sans'>{msg.text}</pre>
                  </div>
                </div>
                {msg.suggestions && (
                  <div className='ml-12 mt-2 flex gap-2 flex-wrap'>
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className='px-4 py-2 bg-white shadow-md hover:bg-gray-300 rounded-lg text-12-18 text-gray-800 transition duration-200'
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
              <div className='flex items-start'>
                <div className='px-4 py-2 bg-blue-100 text-14-20 text-gray-800 rounded-lg shadow-lg'>
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
                          <AttachFileIcon fontSize='small' />
                          {msg.attachment.name}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <Image
                  src={AdminAvatar}
                  alt='User  Avatar'
                  width={40}
                  height={40}
                  className='rounded-full w-10 h-10 object-cover ml-2'
                />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className='flex items-center gap-2 text-gray-600 text-12-18'>
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
      <div className='flex items-center rounded-b-lg gap-2 pt-2 border-t border-gray-200 p-2 bg-white shadow-md'>
        <div className='cursor-pointer' onClick={handleLoadConversation}>
          <CleaningServicesIcon sx={{ color: "#6A5ACD", "&:hover": { color: "#3E2A91" } }} />
        </div>
        <div className='flex-1'>
          <CustomTextField
            fullWidth
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
            className='bg-gray-100 rounded-lg'
            inputRef={inputRef}
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
        <div
          className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          <AttachFileIcon
            fontSize='small'
            sx={{
              color: "#6A5ACD",
              transition: "color 0.1s ease-in-out",
              "&:hover": {
                color: "#3E2A91",
              },
            }}
          />
        </div>
        <button onClick={handleChat} disabled={isLoading}>
          <Send
            fontSize='small'
            sx={{
              color: isLoading ? "#A8A8A8" : "#6A5ACD",
              "&:hover": { color: isLoading ? "#A8A8A8" : "#3E2A91" },
            }}
          />
        </button>
      </div>
      <ListPlatformPublish open={open} setOpen={setOpen} />
    </div>
  );
};

export default ChatBox;
