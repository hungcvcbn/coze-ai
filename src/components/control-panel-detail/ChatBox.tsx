"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import LogoImage from "@/assets/icons/logo.png";
import Image from "next/image";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import { chat } from "@/helpers/api/chatbot";
import { useParams } from "next/navigation";

type Message = {
  sender: "user" | "bot";
  text: string;
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
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChat = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { sender: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage as Message]);
    setInput("");

    setIsTyping(true);
    try {
      let params = {
        botId: botId?.id as string,
        question: input,
        conversationId: conversation?.conversations[0],
        stream: true,
      };
      const response = await chat(params);
      const botMessage = { sender: "bot", text: response.data.content } as Message;
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "file" | "image"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    const newMessage: Message = {
      sender: "user",
      text: "",
      attachment: {
        type,
        url,
        name: file.name,
      },
    };

    setMessages(prev => [...prev, newMessage]);

    setIsTyping(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const botMessage = {
        sender: "bot",
        text: "Xin lỗi, hiện tại chúng tôi chưa hỗ trợ xử lý tệp tin và hình ảnh. Vui lòng gửi câu hỏi bằng văn bản.",
      } as Message;
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className='flex flex-col h-[calc(100vh-98px)]'>
      <div className='text-14-20 bg-green-50 rounded-t-lg font-semibold text-primary h-[40px] p-3 flex items-center border-b border-gray-200'>
        Dùng thử
      </div>
      <div className='flex-1 overflow-y-auto p-4 bg-white'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className='flex items-start'>
                <Image
                  src={LogoImage}
                  alt='Bot Avatar'
                  width={40}
                  height={40}
                  className='rounded-full mr-2'
                />
                <div className='px-4 py-2 bg-info-50 text-14-20 text-neutral rounded-lg shadow-md'>
                  {msg.text}
                </div>
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
                // handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
        </div>
        <input
          type='file'
          id='file-upload'
          className='hidden'
          onChange={e => handleFileUpload(e, "file")}
          accept='.pdf,.doc,.docx,.txt'
        />
        <input
          type='file'
          id='image-upload'
          className='hidden'
          onChange={e => handleFileUpload(e, "image")}
          accept='image/*'
        />
        <label htmlFor='file-upload' className='cursor-pointer'>
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
        </label>
        <label htmlFor='image-upload' className='cursor-pointer'>
          <ImageIcon
            fontSize='small'
            sx={{
              color: "#6A5ACD",
              transition: "color 0.1s ease-in-out",
              "&:hover": {
                color: "#3E2A91",
              },
            }}
          />
        </label>

        <button
          onClick={handleChat}
          disabled={isLoading}
          // className={`p-2 text-white  transition-colors ${
          //   isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-700"
          // }`}
        >
          <Send fontSize='small' sx={{ color: "#6A5ACD", "&:hover": { color: "#3E2A91" } }} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
