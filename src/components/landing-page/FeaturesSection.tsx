"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const features = [
    {
      title: "AI Chatbot Thông minh",
      description:
        "Xây dựng chatbot hiểu và trả lời câu hỏi phức tạp một cách chính xác, cải thiện trải nghiệm khách hàng.",
      icon: "🤖",
    },
    {
      title: "Tích hợp đa nền tảng",
      description:
        "Hỗ trợ Website, Facebook, Telegram, Zalo và nhiều kênh khác, giúp tiếp cận khách hàng dễ dàng.",
      icon: "🌐",
    },
    {
      title: "Phân tích dữ liệu",
      description:
        "Theo dõi hành vi người dùng và đưa ra báo cáo chi tiết để tối ưu hóa hiệu suất AI.",
      icon: "📊",
    },
    {
      title: "Tùy biến AI",
      description:
        "Đào tạo AI theo yêu cầu doanh nghiệp, giúp AI hiểu ngữ cảnh và phản hồi chính xác hơn.",
      icon: "⚙️",
    },
    {
      title: "Đào tạo AI từ dữ liệu",
      description:
        "Huấn luyện chatbot bằng tài liệu nội bộ, FAQ, và dữ liệu doanh nghiệp để đảm bảo độ chính xác cao.",
      icon: "📚",
    },
    {
      title: "Tự động hóa quy trình",
      description:
        "Giải phóng nhân sự khỏi các công việc lặp đi lặp lại, giúp tối ưu hóa vận hành doanh nghiệp.",
      icon: "🔄",
    },
  ];

  return (
    <div
      className='py-16 bg-gradient-to-b from-blue-50 to-white px-4'
      ref={featuresRef}
      id='features'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12'>
          <motion.h2
            className='text-32-32 text-neutral font-bold'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tính Năng Nổi Bật
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600 max-w-2xl mx-auto mt-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Zenee AI cung cấp giải pháp AI toàn diện giúp doanh nghiệp tự động hóa, tối ưu hiệu suất
            và nâng cao trải nghiệm khách hàng.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-500 transition-all duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-24-28 mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-gray-800'>{feature.title}</h3>
              <p className='text-gray-600 mt-2'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
