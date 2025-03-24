"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const features = [
    {
      title: "AI Chatbot Thông minh",
      description:
        "Xây dựng chatbot thông minh có khả năng hiểu và trả lời câu hỏi phức tạp với độ chính xác cao.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 17.5L3.5 13L5 11.5L8 14.5L19 3.5L20.5 5L8 17.5Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      title: "Tích hợp đa nền tảng",
      description: "Dễ dàng tích hợp với Website, Facebook, Telegram, Zalo và nhiều nền tảng khác.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      title: "Phân tích dữ liệu",
      description:
        "Theo dõi và phân tích tương tác người dùng để tối ưu hóa trải nghiệm và hiệu suất.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      title: "Tùy biến AI",
      description:
        "Đào tạo AI theo nhu cầu cụ thể của doanh nghiệp với dữ liệu và kiến thức chuyên ngành.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      title: "Đào tạo AI từ dữ liệu",
      description:
        "Huấn luyện AI Bot từ tài liệu doanh nghiệp, FAQ, và nguồn dữ liệu có sẵn của bạn.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM13 14H15V11H18V9H15V6H13V9H10V11H13V14Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      title: "Tự động hóa quy trình",
      description:
        "Tự động hóa các quy trình lặp đi lặp lại để giải phóng nguồn lực con người cho những việc quan trọng hơn.",
      icon: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.8 10.7L4.2 5L3 6.8L16.9 12.5L3 18.2L4.2 20L19.8 14.3C21.2 13.7 21.2 11.3 19.8 10.7Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
  ];
  return (
    <div
      className='py-16 bg-gradient-to-r from-primary-50 to-white px-4'
      ref={featuresRef}
      id='features'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <motion.h2
            className='text-32-32 font-bold text-center text-neutral mb-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tính năng nổi bật
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Zenee AI cung cấp đầy đủ công cụ để xây dựng và quản lý AI chatbot hiệu quả
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className='w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;
