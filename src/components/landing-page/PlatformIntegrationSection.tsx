"use client";

import { motion } from "framer-motion";

export default function PlatformIntegrationSection() {
  const platforms = [
    {
      name: "Website",
      description: "Tích hợp Zenee AI vào website của bạn với chỉ vài dòng code",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 11.39 4.08 10.79 4.21 10.22L7 13V14C7 15.1 7.9 16 9 16V18.93C6.06 18.43 4 15.45 4 12ZM16.9 16.39C16.64 16.58 16.36 16.69 16 16.69C15.44 16.69 15 16.25 15 15.69C15 15.03 15.44 14.69 16 14.69C16.36 14.69 16.64 14.81 16.9 14.99C17.08 14.69 17.31 14.29 17.55 13.79C17.08 13.39 16.56 13.19 16 13.19C14.61 13.19 13.5 14.29 13.5 15.69C13.5 17.09 14.61 18.19 16 18.19C16.56 18.19 17.08 17.99 17.56 17.59C17.31 17.09 17.08 16.69 16.9 16.39ZM18.92 12L17.5 13.09V13.69C17.5 13.9 17.47 14.09 17.43 14.29L21.27 11.69C20.93 8.83 19.1 6.43 16.59 5.35L14 9.69L15 10.19C15.58 10.49 16 11.07 16 11.69V12.19L18.92 12ZM12 4C14.37 4 16.5 5.09 17.86 6.82L15.66 10.19H14C12.9 10.19 12 11.09 12 12.19V13.69C12 14.79 12.9 15.69 14 15.69V18.19H10V16C8.9 16 8 15.1 8 14V12H6L4.75 10.75C5.68 6.87 8.56 4 12 4Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      description: "Kết nối Zenee AI với Fanpage để tự động hóa trò chuyện với khách hàng",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "Telegram",
      description: "Bot Telegram thông minh hỗ trợ khách hàng 24/7",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.01 10.46 14.01 10.36 13.95 10.31C13.89 10.26 13.8 10.28 13.73 10.29C13.64 10.31 12.15 11.3 9.27 13.26C8.87 13.53 8.51 13.66 8.19 13.65C7.83 13.64 7.16 13.45 6.66 13.29C6.04 13.09 5.55 12.98 5.6 12.63C5.62 12.45 5.87 12.27 6.33 12.09C9.39 10.74 11.42 9.83 12.43 9.38C15.36 7.79 16.07 7.54 16.54 7.54C16.65 7.54 16.89 7.57 17.04 7.69C17.17 7.8 17.2 7.94 17.21 8.05C17.2 8.13 17.22 8.38 17.21 8.5C17.2 8.63 16.65 8.8 16.64 8.8Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "Zalo",
      description: "Tích hợp Zenee AI vào OA Zalo để tương tác với người dùng Việt Nam",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 15.38C16.4 15.64 16 15.64 15.76 15.38L14.63 14.24C14.58 14.19 14.5 14.17 14.42 14.2C13.57 14.45 12.66 14.58 11.75 14.58C9.11 14.58 6.75 13.25 6.75 11C6.75 8.76 9.11 7.42 11.75 7.42C14.39 7.42 16.75 8.76 16.75 11C16.75 11.91 16.33 12.75 15.58 13.36C15.51 13.42 15.49 13.52 15.54 13.6L16.64 14.72C16.88 14.96 16.88 15.38 16.64 15.62V15.38ZM12.75 12.08H9.75C9.34 12.08 9 11.74 9 11.33C9 10.92 9.34 10.58 9.75 10.58H12.75C13.16 10.58 13.5 10.92 13.5 11.33C13.5 11.74 13.16 12.08 12.75 12.08ZM14.25 9.58H9.75C9.34 9.58 9 9.24 9 8.83C9 8.42 9.34 8.08 9.75 8.08H14.25C14.66 8.08 15 8.42 15 8.83C15 9.24 14.66 9.58 14.25 9.58Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "Mobile Apps",
      description: "SDK cho iOS và Android giúp tích hợp AI vào ứng dụng di động",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      description: "Tự động hóa giao tiếp qua WhatsApp với khách hàng quốc tế",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.05 4.91C17.18 3.03 14.69 2 12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.8 7.37 7.49 3.68 12.04 3.68C14.23 3.68 16.27 4.53 17.85 6.11C19.42 7.68 20.28 9.73 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15ZM16.56 13.99C16.33 13.87 15.12 13.28 14.91 13.21C14.7 13.14 14.54 13.1 14.39 13.33C14.24 13.56 13.77 14.11 13.64 14.26C13.51 14.41 13.37 14.44 13.14 14.31C12.25 13.86 11.59 13.5 10.92 12.38C10.73 12.05 11.09 12.08 11.42 11.41C11.5 11.26 11.46 11.12 11.41 11C11.36 10.88 11 9.68 10.82 9.21C10.64 8.76 10.45 8.82 10.31 8.81C10.18 8.8 10.03 8.8 9.88 8.8C9.73 8.8 9.48 8.85 9.28 9.07C9.07 9.3 8.44 9.9 8.44 11.09C8.44 12.29 9.3 13.45 9.42 13.6C9.55 13.75 10.99 16 13.24 16.94C15.05 17.69 15.07 17.39 15.39 17.35C15.71 17.31 16.69 16.77 16.89 16.22C17.08 15.67 17.08 15.2 17.03 15.13C16.98 15.06 16.83 15.03 16.6 14.93L16.56 13.99Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "API",
      description: "API linh hoạt cho phép tích hợp Zenee AI vào bất kỳ hệ thống nào",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.9 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V8H20V18ZM6 15H8V17H6V15ZM6 11H8V13H6V11ZM10 15H18V17H10V15ZM10 11H18V13H10V11Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
    {
      name: "Email",
      description: "Tự động phản hồi email và phân loại nội dung với AI",
      icon: (
        <svg
          width='40'
          height='40'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z'
            fill='#36AFE3'
          />
        </svg>
      ),
    },
  ];
  return (
    <div className='py-16 px-4 relative  bg-gradient-to-l from-slate-50 to-primary-50'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-32-32 font-bold text-neutral mb-4'>Tích hợp đa nền tảng</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Triển khai Zenee AI trên mọi nền tảng mà khách hàng của bạn sử dụng
          </p>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className='bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center h-full border border-gray-100 hover:border-primary-100'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(to bottom right, white, #f0f9ff)",
              }}
            >
              <div className='w-16 h-16 flex items-center justify-center mb-4 bg-primary-50 rounded-full p-3'>
                {platform.icon}
              </div>
              <h3 className='text-lg font-medium text-center text-neutral-800 mb-2'>
                {platform.name}
              </h3>
              <p className='text-sm text-gray-600 text-center'>{platform.description}</p>
              <button className='mt-4 text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center'>
                Tìm hiểu thêm
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-1'
                >
                  <path
                    d='M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
