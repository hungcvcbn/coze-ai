"use client";

import { motion } from "framer-motion";
import ZaloIcon from "@/assets/icons/zalo_icon.svg";
import FacebookIcon from "@/assets/icons/facebook_icon.svg";
import TelegramIcon from "@/assets/icons/telegram_icon.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp_icon.svg";
import Image from "next/image";

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
      icon: <Image src={FacebookIcon} alt='Facebook' width={50} height={50} />,
    },
    {
      name: "Telegram",
      description: "Bot Telegram thông minh hỗ trợ khách hàng 24/7",
      icon: <Image src={TelegramIcon} alt='Telegram' width={50} height={50} />,
    },
    {
      name: "Zalo",
      description: "Tích hợp Zenee AI vào OA Zalo để tương tác với người dùng Việt Nam",
      icon: <Image src={ZaloIcon} alt='Zalo' width={50} height={50} />,
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
      icon: <Image src={WhatsAppIcon} alt='WhatsApp' width={50} height={50} />,
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
    <div
      className='py-16 px-4 relative  bg-gradient-to-l from-slate-50 to-primary-50'
      id='platform-integration'
    >
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
                {platform?.icon}
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
