"use client";

import { motion } from "framer-motion";
import React from "react";

export default function ServicePrice() {
  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "499k",
      description: "Lý tưởng cho doanh nghiệp nhỏ và cá nhân",
      features: [
        "1 AI Bot",
        "1,000 tin nhắn/tháng",
        "Tích hợp Website",
        "Hỗ trợ email",
        "1GB lưu trữ tài liệu",
        "Thời gian phản hồi: 24h",
        "Hỗ trợ cơ bản qua chat",
        "Quản lý hội thoại cơ bản",
        "Truy cập giao diện quản lý",
      ],

      buttonText: "Bắt đầu miễn phí",
      popular: false,
    },
    {
      name: "Premium",
      price: "1.499k",
      description: "Giải pháp hiệu quả cho các doanh nghiệp vừa và nhỏ",
      features: [
        "5 AI Bot",
        "10,000 tin nhắn/tháng",
        "Tích hợp đa nền tảng",
        "Phân tích dữ liệu",
        "10GB lưu trữ tài liệu",
        "Hỗ trợ ưu tiên",
        "API tùy chỉnh",
      ],
      buttonText: "Bắt đầu dùng thử",
      popular: true,
    },
    {
      name: "Platinum",
      price: "Liên hệ",
      description: "Dành cho doanh nghiệp lớn với nhu cầu tùy biến cao",
      features: [
        "Không giới hạn AI Bot",
        "Tin nhắn không giới hạn",
        "Tích hợp toàn diện",
        "Phân tích dữ liệu nâng cao",
        "Lưu trữ không giới hạn",
        "Hỗ trợ 24/7",
        "Đào tạo & thiết lập",
        "SLA đảm bảo",
      ],
      buttonText: "Liên hệ với chúng tôi",
      popular: false,
    },
  ];
  return (
    <div className='py-20 bg-white' id='pricing'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-32-32 font-bold text-neutral mb-4'>Bảng giá dịch vụ</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Lựa chọn gói dịch vụ phù hợp với nhu cầu của doanh nghiệp
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden border ${
                plan.popular ? "border-primary" : "border-gray-200"
              } ${plan.popular ? "bg-primary-50" : "bg-white"} relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <>
                  <div className='absolute top-2 left-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 text-yellow-300'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 1L9 9H2L7 14.5L5 22L12 17.5L19 22L17 14.5L22 9H15L12 1Z' />
                    </svg>
                  </div>
                  <div className='bg-primary text-white text-center py-2 font-medium flex items-center justify-center gap-2'>
                    Phổ biến nhất
                  </div>
                  <div className='absolute top-2 right-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 text-yellow-300'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 1L9 9H2L7 14.5L5 22L12 17.5L19 22L17 14.5L22 9H15L12 1Z' />
                    </svg>
                  </div>
                </>
              )}
              <div className='p-4'>
                <h3 className='text-20-28 text-primary font-bold mb-4'>{plan.name}</h3>
                <div className='mb-6'>
                  <span className='text-4xl font-bold'>{plan.price}</span>
                  {plan.price !== "Liên hệ" && <span className='text-gray-600'>/tháng</span>}
                </div>
                <p className='text-gray-600 mb-6'>{plan.description}</p>
                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <svg
                        className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <span className='text-gray-600'>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className='py-3 bg-primary-400 text-white rounded-full px-6 '>
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
