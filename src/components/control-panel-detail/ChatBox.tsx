"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import LogoImage from "@/assets/icons/logo.png";
import Image from "next/image";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { chat, requestUpload, resetConversation, uploadFile } from "@/helpers/api/chatbot";
import { useParams } from "next/navigation";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
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
  console.log(conversation);
  const botId = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Chào mừng bạn! Tôi là trợ lý AI chuyên về hỗ trợ học và ứng dụng công nghệ trí tuệ nhân tạo. Tôi có thể giúp bạn:\na. Hiểu cơ bản về cách AI hoạt động\nb. Thực hành xây dựng các mô hình học máy (Machine Learning)\nc. Ứng dụng AI trong phân tích dữ liệu và tự động hóa\nd. Khám phá những xu hướng AI mới nhất\nBạn quan tâm đến chủ đề nào trước?",
      suggestions: [
        "Làm thế nào để bắt đầu học AI?",
        "Cách xử lý dữ liệu trước khi huấn luyện mô hình",
        "Giải thích đơn giản về mạng nơ-ron nhân tạo",
        "Tìm hiểu về AI trong nhận diện hình ảnh",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBotResponse = async (question: string, showUserMessage = true) => {
    if (isLoading) return;

    setIsLoading(true);
    setIsTyping(true);

    if (showUserMessage) {
      setMessages(prev => [...prev, { sender: "user", text: question } as Message]);
    }

    try {
      const params = {
        botId: botId?.id as string,
        question,
        conversationId: conversation?.conversations[0] || conversation?.conversationId,
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
    } catch (error) {
      console.error("Error:", error);
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
      console.error("Error handling file upload:", error);
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
        conversationId: conversation?.conversations[0],
      };
      await resetConversation(params);
      setMessages([{ sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }]);
    } catch (error) {
      console.error("Error resetting conversation:", error);
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
        botId: botId?.id as string,
        question: suggestion,
        conversationId: conversation?.conversations[0] || conversation?.conversationId,
        stream: true,
      };
      const response = await chat(params);
      const botMessage = {
        sender: "bot",
        text: response.data.content,
      } as Message;
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
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
    <div className='flex flex-col h-[calc(100vh-98px)]'>
      <div className='text-16-24 rounded-t-lg font-semibold text-primary h-[40px] p-3 flex items-center border-b border-gray-200'>
        Dùng thử
      </div>
      <div className='flex-1 overflow-y-auto p-4 bg-white'>
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
                    className='rounded-full mr-2'
                  />
                  <div className='px-4 py-2 bg-info-50 text-14-20 text-neutral rounded-lg shadow-md'>
                    <pre className='whitespace-pre-wrap font-sans'>{msg.text}</pre>
                  </div>
                </div>
                {msg.suggestions && (
                  <div className='ml-12 mt-2 flex gap-2 flex-wrap'>
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-14-20 text-neutral'
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
                <div className='px-4 py-2 bg-gray-50 text-14-20 text-neutral rounded-lg shadow-md'>
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
                          className='flex items-center gap-2 text-blue-500 hover:underline'
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
                  alt='User Avatar'
                  width={40}
                  height={40}
                  className='rounded-full ml-2'
                />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className='flex items-center gap-2 text-neutral text-12-18'>
            <Image
              src={LogoImage}
              alt='Typing Avatar'
              width={40}
              height={40}
              className='rounded-full mr-2'
            />
            <div className='flex gap-1'>
              <span className='w-1 h-1 rounded-full bg-neutral animate-bounce [animation-delay:-0.3s]'></span>
              <span className='w-1 h-1 rounded-full bg-neutral animate-bounce [animation-delay:-0.15s]'></span>
              <span className='w-1 h-1 rounded-full bg-neutral animate-bounce'></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='flex items-center gap-2 pt-2 border-t border-gray-200 p-2'>
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
          />
        </div>
        <input
          ref={fileInputRef}
          type='file'
          accept='.pdf,.doc,.docx'
          className='hidden'
          onChange={handleFileUpload}
        />

        <div className='cursor-pointer' onClick={() => fileInputRef.current?.click()}>
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
          <Send fontSize='small' sx={{ color: "#6A5ACD", "&:hover": { color: "#3E2A91" } }} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
