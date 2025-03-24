"use client";

import React from "react";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.svg";
export default function FooterSection() {
  return (
    <footer className='bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 text-white py-12'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <Image src={LogoImage} alt='Zenee AI Logo' width={40} height={40} />
              <span className='font-bold text-xl'>Zenee AI</span>
            </div>
            <p className='text-gray-400 mb-4'>
              Nền tảng AI thông minh giúp doanh nghiệp tự động hóa và nâng cao trải nghiệm khách
              hàng
            </p>
            <div className='flex gap-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184A4.92 4.92 0 0011.9 8.035a13.98 13.98 0 01-10.134-5.147 4.92 4.92 0 001.522 6.574A4.911 4.911 0 01.96 9.019v.062a4.923 4.923 0 003.946 4.827 4.924 4.924 0 01-2.224.085 4.92 4.92 0 004.6 3.42 9.875 9.875 0 01-7.29 2.038A13.979 13.979 0 007.546 21.5C16.523 21.5 21.39 13.97 21.39 7.355c0-.214-.005-.428-.015-.642A9.935 9.935 0 0024 4.59z' />
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <svg width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className='font-bold text-lg mb-4'>Sản phẩm</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Chatbot AI
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Khả năng tích hợp
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Phân tích dữ liệu
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Tùy biến AI
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold text-lg mb-4'>Công ty</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Đối tác
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold text-lg mb-4'>Hỗ trợ</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Liên hệ
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Tài liệu API
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400'>© 2023 Zenee AI. Tất cả các quyền được bảo lưu.</p>
          <div className='mt-4 md:mt-0'>
            <ul className='flex gap-6'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Điều khoản
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Bảo mật
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Cookie
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
