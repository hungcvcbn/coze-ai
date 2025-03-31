"use client";
import React, { useState, useEffect, useRef } from "react";
import LogoImage from "@/assets/icons/logo.svg";
import { Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  chat,
  getChatExperience,
  loadConversation,
  requestUpload,
  uploadFile,
} from "@/helpers/api/chatbot";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { setToast } from "@/redux/slices/common";
import { useDispatch } from "react-redux";
import BasicButton from "../common/BasicButton";

import ListPlatformPublish from "./platform/ListPlatformPublish";
import { IconButton, TextField } from "@mui/material";
import { resetConversation } from "@/helpers/api/agent";
import { useAppSelector } from "@/redux/hooks";
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { triggerTime } = useAppSelector(state => state.common);
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
            text: res.data.openingConversation.openingText,
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
        botId: data?.id,
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
          text: "Sorry, an error occurred. Please try again later.",
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
          text: "Sorry, an error occurred when processing the file. Please try again later.",
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
        conversationId: conversation ? conversation[0] : undefined,
      };
      const res = await resetConversation(params);

      if (res.data) {
        setMessages([]);
        getSuggestions();
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
        botId: data?.id,
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
        text: "Sorry, an error occurred. Please try again later.",
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
    <div className='flex flex-col bg-white'>
      {/* Header */}
      <div className='h-14 flex items-center justify-between px-4 border-b'>
        <div className='flex items-center gap-2'>
          <img src={LogoImage?.src} alt='Chat Logo' className='w-8 h-8 rounded' />
          <span className='font-medium'>Chat demo</span>
        </div>
        <div className='flex items-center gap-2'>
          <BasicButton onClick={() => setOpen(true)} variant='outlined'>
            Publish
          </BasicButton>
          <IconButton size='small' onClick={handleResetConversation}>
            <CleaningServicesIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </div>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 md:min-h-[calc(100vh-16rem)] min-h-[400px] max-h-[400px] md:max-h-[calc(100vh-16rem)] overflow-y-auto hidden-scroll-bar px-4 py-2 bg-white'>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.text && (
              <div
                className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`inline-block text-14-20 font-normal max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-gray-200 text-neutral"
                      : "bg-white border text-neutral"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            )}
            {/* Thêm phần hiển thị suggestions */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className='flex flex-col gap-2 mb-4'>
                {msg.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className='px-3 py-1.5 text-14-20 text-start font-normal bg-white border border-gray-200 w-fit hover:bg-gray-200 rounded-xl text-gray-700 transition-colors'
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className='flex mb-2 justify-start'>
            <div className='inline-block bg-white border rounded-2xl px-4 py-2'>
              <div className='flex gap-1 items-center h-6'>
                <span className='w-1 h-1 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]'></span>
                <span className='w-1 h-1 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]'></span>
                <span className='w-1 h-1 rounded-full bg-gray-500 animate-bounce'></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='border-t p-3'>
        <div className='flex items-center gap-2 relative rounded-2xl border bg-white'>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Enter your question'
            disabled={isLoading}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
              }
            }}
            rows={input.split('\n').length || 1}
            className='w-full resize-none justify-center hidden-scroll-bar border-tl rounded-2xl items-center outline-none text-14-20 text-neutral py-3 px-2 max-h-[200px] min-h-[40px]'
            style={{
              overflow: "auto",
            }}
          />
          <div className='flex items-center'>
            <button
              className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              onClick={() => !isLoading && fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <AttachFileIcon
                fontSize='small'
                sx={{
                  color: isLoading ? "#A8A8A8" : "#39B5E0",
                  cursor: isLoading ? "default" : "pointer",
                  "@media (max-width: 600px)": {
                    fontSize: "14px",
                  },
                }}
              />
            </button>
            <button
              className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              onClick={handleChat}
              disabled={isLoading}
            >
              <Send
                fontSize='small'
                sx={{
                  color: isLoading ? "#A8A8A8" : "#39B5E0",
                  cursor: isLoading ? "default" : "pointer",
                  "@media (max-width: 600px)": {
                    fontSize: "14px",
                  },
                }}
              />
            </button>
          </div>
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
