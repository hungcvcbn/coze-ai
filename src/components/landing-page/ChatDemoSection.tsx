"use client";

import { motion } from "framer-motion";

export default function ChatDemoSection() {
  const chatFeatures = [
    {
      title: "Hiểu ngôn ngữ tự nhiên",
      description:
        "Chatbot có khả năng hiểu và xử lý ngôn ngữ tự nhiên của người dùng, mang lại trải nghiệm giao tiếp tự nhiên hơn.",
    },
    {
      title: "Học hỏi liên tục",
      description:
        "Chatbot liên tục học hỏi từ các tương tác trước đó để cải thiện khả năng trả lời và đề xuất.",
    },
    {
      title: "Tùy chỉnh thương hiệu",
      description: "Tùy chỉnh giao diện chatbot theo phong cách thương hiệu của doanh nghiệp.",
    },
    {
      title: "Hỗ trợ đa ngôn ngữ",
      description:
        "Chatbot hỗ trợ nhiều ngôn ngữ khác nhau, giúp doanh nghiệp tiếp cận khách hàng toàn cầu.",
    },
  ];
  return (
    <div className='py-16 bg-gradient-to-l from-primary-50 to-white px-4' id='chat-demo'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-32-32 font-bold text-neutral mb-6'>
              Trải nghiệm Chatbot AI Thông minh
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Zenee AI cung cấp giải pháp chatbot mạnh mẽ với khả năng hiểu ngôn ngữ tự nhiên, tích
              hợp đa nền tảng và tùy chỉnh theo nhu cầu của doanh nghiệp.
            </p>
            <ul className='space-y-4'>
              {chatFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  className='flex items-start gap-3'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className='mt-1 text-primary'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z'
                        fill='currentColor'
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-medium'>{feature.title}</h4>
                    <p className='text-gray-600'>{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className='rounded-xl shadow-2xl overflow-hidden border border-gray-200'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className='bg-primary p-4 flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-white opacity-50'></div>
              <div className='w-2 h-2 rounded-full bg-white opacity-70'></div>
              <div className='w-2 h-2 rounded-full bg-white'></div>
              <div className='ml-2 text-white font-medium'>Zenee AI Chat</div>
            </div>
            <div className='h-96 bg-gray-50 p-3 overflow-y-auto'>
              <div className='flex gap-3 mb-4'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold'>
                  Z
                </div>
                <div className='bg-white p-3 rounded-lg shadow max-w-xs'>
                  <p className='text-gray-800'>
                    Xin chào! Tôi là Zenee AI, tôi có thể giúp gì cho bạn hôm nay?
                  </p>
                </div>
              </div>
              <div className='flex gap-3 justify-end mb-3'>
                <div className='bg-primary-50 p-3 rounded-lg shadow max-w-xs'>
                  <p className='text-gray-800'>Tôi muốn biết thêm về các tính năng của Zenee AI</p>
                </div>
                <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold'>
                  U
                </div>
              </div>
              <div className='flex gap-3 mb-4'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold'>
                  Z
                </div>
                <div className='bg-white p-3 rounded-lg shadow max-w-sm'>
                  <p className='text-gray-800'>
                    Zenee AI cung cấp nhiều tính năng như tạo chatbot thông minh, tích hợp đa nền
                    tảng và tùy chỉnh theo nhu cầu. Bạn quan tâm đến tính năng nào cụ thể?
                  </p>
                </div>
              </div>
            </div>
            <div className='p-4 border-t flex items-center gap-2'>
              <input
                type='text'
                placeholder='Nhập câu hỏi của bạn...'
                readOnly
                className='flex-1 rounded-full focus-none px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary'
              />
              <button className='p-2 rounded-full bg-primary text-white'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z' fill='currentColor' />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
