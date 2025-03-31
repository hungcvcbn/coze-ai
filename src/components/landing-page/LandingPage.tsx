"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoImage from "@/assets/icons/logo.svg";
import BasicButton from "@/components/common/BasicButton";
import SliderAnimation from "./SliderAnimation";
import FeaturesSection from "./FeaturesSection";
import ChatDemoSection from "./ChatDemoSection";
import PlatformIntegrationSection from "./PlatformIntegrationSection";
import AboutUs from "./AboutUs";
import FooterSection from "./FooterSection";
import ServicePrice from "./ServicePrice";
const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navBackgrounds = [
    "bg-gradient-to-r from-black-50 via-black-200 to-black-50",
    "bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50",
    "bg-gradient-to-r from-indigo-50 via-cyan-50 to-slate-50",
    "bg-gradient-to-r from-slate-50 via-zinc-50 to-gray-50",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sectionHeight = 800;
  const navBgIndex = Math.min(
    Math.floor(scrollPosition / sectionHeight),
    navBackgrounds.length - 1
  );

  return (
    <div className='min-h-screen bg-white text-neutral overflow-hidden'>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${navBackgrounds[navBgIndex]} shadow-2xl pb-4 backdrop-blur-md py-4 px-6 flex justify-between items-center transition-colors duration-700`}
      >
        <Link href='/' className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Image src={LogoImage} alt='Zenee AI Logo' width={40} height={40} />
            <span className='font-bold text-24-32 text-primary-400'>Zenee AI</span>
          </div>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='#features'
            className='text-primary-400 hover:text-primary-700 transition-colors'
          >
            Tính năng
          </Link>
          <Link
            href='#use-cases'
            className='text-primary-400 hover:text-primary-700 transition-colors'
          >
            Ứng dụng
          </Link>
          <Link
            href='#chat-demo'
            className='text-primary-400 hover:text-primary-700 transition-colors'
          >
            Chat box
          </Link>
          <Link
            href='#platform-integration'
            className='text-primary-400 hover:text-primary-700 transition-colors'
          >
            Nền tảng
          </Link>
          <Link
            href='#pricing'
            className='text-primary-400 hover:text-primary-700 transition-colors'
          >
            Bảng giá
          </Link>
          <Link href='/login'>
            <BasicButton variant='contained' color='primary'>
              Đăng nhập
            </BasicButton>
          </Link>
        </div>

        <button className='md:hidden'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 12H21M3 6H21M3 18H21'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <SliderAnimation />

      {/* Features Section */}
      <FeaturesSection />

      {/* Chat Demo Section */}
      <ChatDemoSection />

      {/* About Us Section */}
      <AboutUs />

      {/* Platform Integration Section */}
      <PlatformIntegrationSection />

      {/* Pricing Section */}
      <ServicePrice />

      {/* CTA Section */}
      <div className='py-20 bg-gradient-to-r from-primary-50 via-primary-100 to-white text-neutral'>
        <div className='container mx-auto px-6 text-center'>
          <motion.h2
            className='text-32-32 font-bold text-neutral mb-6'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Sẵn sàng nâng cao trải nghiệm khách hàng với AI?
          </motion.h2>
          <motion.p
            className='text-xl mb-10 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Đăng ký dùng thử miễn phí 14 ngày và khám phá sức mạnh của Zenee AI
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BasicButton
              variant='contained'
              className='bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-xl'
            >
              Bắt đầu ngay
            </BasicButton>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />

      {/* Thêm CSS cho animations */}
      <style jsx>{`
        .background-animate {
          background-size: 200%;
          animation: AnimateBackground 2s ease infinite;
        }
        @keyframes AnimateBackground {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Performance optimizations for animations */
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }

        .motion-safe {
          @media (prefers-reduced-motion: no-preference) {
            transition-property: transform, opacity;
            will-change: transform, opacity;
          }
        }

        /* Reduced motion preference support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Enhanced smooth animations */
        * {
          transition-property: background-color, border-color, color, fill, stroke;
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Improved focus styles for accessibility */
        :focus {
          outline: none;
        }

        :focus-visible {
          outline: 2px solid #29aae1;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
