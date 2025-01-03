"use client";
import React, { useState } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import BasicButton from "../common/BasicButton";
const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    const botMessage = { sender: "bot", text: data.reply };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className='flex flex-col h-[calc(100vh-98px)]'>
      <div className='text-16-24 font-semibold text-neutral h-[60px] flex items-center px-2'>
        Dùng thử
      </div>
      <div className='flex-1 overflow-y-auto p-4 bg-white rounded-tr-lg border-l border-t border-r border-gray-200'>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded ${
                msg.sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center gap-2 p-4 bg-white border rounded-b-lg border-gray-200'>
        <div className='w-[90%]'>
          <CustomTextField
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Nhập câu hỏi...'
          />
        </div>
        <BasicButton onClick={handleSendMessage}>Gửi</BasicButton>
      </div>
    </div>
  );
};

export default ChatBox;
