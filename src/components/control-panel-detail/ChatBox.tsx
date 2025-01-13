"use client";
import React, { useState, useEffect, useRef } from "react";
import CustomTextField from "../hook-form/CustomTextField";
import BasicButton from "../common/BasicButton";
import LogoImage from "@/assets/icons/logo.png";
import Image from "next/image";
import AdminAvatar from "@/assets/icons/avatar_admin.png";
import { Send } from "@mui/icons-material";
import { chat } from "@/helpers/api/chatbot";
import { useParams } from "next/navigation";
const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fakeBotReply = (userMessage: string) => {
    const replies = {
      "xin chào": "Chào bạn! Rất vui được hỗ trợ bạn. Tôi là trợ lý AI, bạn có câu hỏi gì không?",
      "sản phẩm của bạn là gì?":
        "Chúng tôi cung cấp các giải pháp AI và chatbot thông minh cho doanh nghiệp. Sản phẩm của chúng tôi có thể tích hợp dễ dàng và tùy chỉnh theo nhu cầu của bạn. Bạn muốn tìm hiểu thêm về tính năng nào?",
      "giá cả":
        "Chúng tôi có nhiều gói dịch vụ khác nhau phù hợp với quy mô doanh nghiệp. Bạn có thể cho tôi biết thêm về nhu cầu sử dụng không?",
      "cảm ơn": "Rất vui được hỗ trợ bạn! Nếu bạn có thêm câu hỏi, đừng ngần ngại hỏi tôi nhé.",
      "liên hệ":
        "Bạn có thể liên hệ với chúng tôi qua email: coze.ai@gmail.com hoặc hotline: 0123456789",
      "tính năng":
        "Sản phẩm của chúng tôi có các tính năng chính như: chatbot tự động, xử lý ngôn ngữ tự nhiên, tích hợp API, phân tích dữ liệu, và nhiều tính năng khác.",
      demo: "Bạn có thể đăng ký dùng thử miễn phí trong 14 ngày để trải nghiệm đầy đủ tính năng của sản phẩm.",
      "hỗ trợ":
        "Chúng tôi cung cấp hỗ trợ kỹ thuật 24/7 và có đội ngũ chuyên gia sẵn sàng giải đáp mọi thắc mắc của bạn.",
      "ai là gì?":
        "AI (Trí tuệ nhân tạo) là công nghệ giúp máy tính thực hiện các tác vụ đòi hỏi trí thông minh của con người, chẳng hạn như học hỏi, lập luận, và giải quyết vấn đề.",
      "chatbot là gì?":
        "Chatbot là chương trình máy tính được thiết kế để mô phỏng hội thoại với con người, thường được sử dụng để hỗ trợ khách hàng hoặc cung cấp thông tin tự động.",
      "bạn có thể làm gì?":
        "Tôi có thể giúp bạn trả lời các câu hỏi, cung cấp thông tin về sản phẩm, và hỗ trợ bạn giải quyết các vấn đề liên quan đến dịch vụ của chúng tôi.",
      "ứng dụng của ai?":
        "AI có nhiều ứng dụng, bao gồm chăm sóc khách hàng, y tế, giáo dục, tài chính, sản xuất, và quản lý dữ liệu.",
      "lịch sử phát triển của ai":
        "Trí tuệ nhân tạo đã được phát triển từ những năm 1950. Qua nhiều thập kỷ, AI đã phát triển vượt bậc với sự ra đời của học sâu (Deep Learning) và các mô hình ngôn ngữ lớn như tôi.",
      "sản phẩm của bạn có bảo mật không?":
        "Chúng tôi ưu tiên bảo mật dữ liệu của khách hàng. Các giải pháp của chúng tôi được thiết kế với các tiêu chuẩn bảo mật cao nhất và luôn tuân thủ quy định pháp luật.",
      "làm sao để bắt đầu?":
        "Bạn chỉ cần đăng ký trên trang web của chúng tôi và chọn gói dịch vụ phù hợp. Nếu cần, chúng tôi có thể hỗ trợ bạn trong quá trình triển khai.",
      "mất bao lâu để triển khai?":
        "Thời gian triển khai thường mất từ 1 đến 5 ngày làm việc, tùy thuộc vào quy mô và yêu cầu của doanh nghiệp bạn.",
      "có hỗ trợ tùy chỉnh không?":
        "Chúng tôi cung cấp dịch vụ tùy chỉnh để đảm bảo sản phẩm phù hợp với nhu cầu cụ thể của bạn.",
      "công nghệ nào được sử dụng?":
        "Chúng tôi sử dụng các công nghệ tiên tiến như học sâu (Deep Learning), xử lý ngôn ngữ tự nhiên (NLP), và tích hợp API hiện đại.",
      "tôi cần những gì để bắt đầu?":
        "Bạn cần cung cấp thông tin về nhu cầu của doanh nghiệp và tài khoản đăng ký. Chúng tôi sẽ hỗ trợ bạn từng bước trong quá trình triển khai.",
    };

    return (
      replies[userMessage.toLowerCase().trim() as keyof typeof replies] ||
      "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể diễn đạt lại hoặc đặt câu hỏi khác không?"
    );
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { sender: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const botReply = fakeBotReply(input);
      const botMessage = { sender: "bot", text: botReply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // const handleChat = async () => {
  //   let params = {
  //     botId: id,
  //     question: input,
  //     conversationId: "",
  //     stream: true,
  //   };
  //   const response = await chat(params);
  //   console.log(response);
  // };

  return (
    <div className='flex flex-col h-[calc(100vh-98px)] border border-gray-200'>
      <div className='text-16-24 font-semibold text-neutral h-[60px] flex items-center px-2 border-b border-gray-200'>
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
                <div className='px-4 py-2 bg-blue-100 text-14-20 text-neutral rounded-lg shadow-md'>
                  {msg.text}
                </div>
              </div>
            )}
            {msg.sender === "user" && (
              <div className='flex items-start'>
                <div className='px-4 py-2 bg-green-100 text-14-20 text-neutral rounded-lg shadow-md'>
                  {msg.text}
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
      <div className='flex items-center gap-2 p-4 border-t border-gray-200'>
        <div className='flex-1'>
          <CustomTextField
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Mời bạn nhập câu hỏi...'
            onKeyPress={e => {
              if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                // handleChat();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`p-2 text-white rounded-full transition-colors ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <Send fontSize='small' />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
