"use client";

import { motion } from "framer-motion";
import HomeBackground from "@/assets/images/background.png";
import HomeNextground from "@/assets/images/homepage1.jpg";
import HomeNextground2 from "@/assets/images/homepage2.jpg";
import HomeLogo1 from "@/assets/icons/logo.svg";
import HomeLogo2 from "@/assets/icons/logo.svg";
import HomeLogo3 from "@/assets/icons/logo.svg";
import BasicButton from "@/components/common/BasicButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
const SliderAnimation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderAutoPlay, setSliderAutoPlay] = useState(true);
  const heroSlides = [
    {
      id: 1,
      logo: HomeLogo1.src,
      background: HomeBackground.src,
      title:
        "Nâng Cao Hiệu Suất Doanh Nghiệp với <span class='text-primary inline-block text-40-40'>Tự Động Hóa AI</span>",
      description:
        "Tận dụng sức mạnh của AI để tối ưu hóa quy trình, nâng cao trải nghiệm khách hàng và thúc đẩy tăng trưởng. Zenee AI giúp bạn dễ dàng xây dựng, huấn luyện và triển khai trợ lý AI tùy chỉnh, tích hợp liền mạch vào hệ thống của bạn.",
      primaryButton: {
        text: "Bắt Đầu Ngay",
        href: "/control-panel",
      },
      secondaryButton: {
        text: "Khám Phá Bot Store",
        href: "/bot-store",
      },
      style: {
        titleColor: "text-white",
        descriptionColor: "text-white",
        logoBackground: "bg-primary-50",
        overlayColor: "bg-black/30",
        buttonStyle: "bg-primary hover:bg-primary-600",
      },
    },
    {
      id: 2,
      logo: HomeLogo2.src,
      background: HomeNextground.src,
      title:
        "Cách Mạng Hóa Trải Nghiệm Khách Hàng với <span class='text-[#76cfc8] inline-block text-40-40 pt-4'>Trợ Lý Ảo Zenee AI</span>",
      description:
        "Cung cấp hỗ trợ khách hàng nhanh chóng, cá nhân hóa và hiệu quả với trợ lý AI thông minh. Tự động xử lý các yêu cầu thường gặp, phản hồi chính xác 24/7, nâng cao sự hài lòng của khách hàng.",
      primaryButton: {
        text: "Tạo Trợ Lý Ngay",
        href: "/create-assistant",
      },
      secondaryButton: {
        text: "Xem Ứng Dụng",
        href: "/examples",
      },
      style: {
        titleColor: "text-white",
        descriptionColor: "text-white",
        logoBackground: "bg-gradient-to-r from-purple-100 to-indigo-100",
        overlayColor: "bg-white/5",
        buttonStyle:
          "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
      },
    },
    {
      id: 3,
      logo: HomeLogo3.src,
      background: HomeNextground2.src,
      title:
        "Tăng Trưởng Bền Vững với <span class='text-emerald-600 inline-block text-40-40'>Giải Pháp AI Doanh Nghiệp</span>",
      description:
        "Dẫn đầu xu hướng với trợ lý AI hoạt động 24/7, giúp doanh nghiệp tương tác với khách hàng, quản lý quy trình và tối ưu hóa hiệu suất. Cắt giảm chi phí, nâng cao năng suất một cách hiệu quả.",
      primaryButton: {
        text: "Đăng Ký Demo",
        href: "/schedule-demo",
      },
      secondaryButton: {
        text: "Xem Bảng Giá",
        href: "#pricing",
      },
      style: {
        titleColor: "text-white",
        descriptionColor: "text-white",
        logoBackground: "bg-gradient-to-br from-emerald-50 to-teal-100",
        overlayColor: "bg-teal-50/10",
        buttonStyle: "bg-white text-black hover:bg-white/80",
      },
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetSliderAutoPlay();
  };

  const resetSliderAutoPlay = () => {
    setSliderAutoPlay(false);
    setTimeout(() => setSliderAutoPlay(true), 8000);
  };

  useEffect(() => {
    let sliderInterval: NodeJS.Timeout;

    if (sliderAutoPlay) {
      sliderInterval = setInterval(() => {
        setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => clearInterval(sliderInterval);
  }, [sliderAutoPlay, heroSlides.length]);
  const buttonHover = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    focus: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.97 },
  };
  return (
    <section
      className='flex items-center justify-center px-4 relative transition-all duration-1000 ease-in-out'
      style={{
        backgroundImage: `url(${heroSlides[currentSlide].background})`,
        height: "100vh",
      }}
    >
      <div className={`absolute inset-0 ${heroSlides[currentSlide].style.overlayColor} z-0`}></div>
      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='absolute -bottom-[250px] left-1/2 transform -translate-x-1/2 z-20 flex gap-2'>
          {heroSlides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === idx ? "bg-white" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <div
          className={`flex flex-col ${
            currentSlide === 1
              ? "md:flex-row-reverse"
              : currentSlide === 2
              ? "md:items-end md:flex-row"
              : "md:flex-row"
          } items-center`}
        >
          <motion.div
            className={`md:w-1/2 mb-10 md:mb-0 ${
              currentSlide === 1 ? "md:pl-8" : currentSlide === 2 ? "md:pr-8" : ""
            }`}
            key={`slide-content-${currentSlide}`}
            initial={{ opacity: 0, x: currentSlide === 1 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentSlide === 1 ? -30 : 30 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                heroSlides[currentSlide].style.titleColor
              } mb-6 ${currentSlide === 2 ? "text-right" : ""}`}
              dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title }}
            ></h1>
            <motion.p
              className={`text-lg ${heroSlides[currentSlide].style.descriptionColor} mb-8 ${
                currentSlide === 2 ? "text-right" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>
            <motion.div
              className={`flex flex-col sm:flex-row gap-4 ${
                currentSlide === 2 ? "justify-end" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover='hover' variants={buttonHover}>
                <Link
                  href={heroSlides[currentSlide].primaryButton.href || "#"}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BasicButton variant='contained' size='lg'>
                    {heroSlides[currentSlide].primaryButton.text}
                  </BasicButton>
                </Link>
              </motion.div>
              <motion.div whileHover='hover' variants={buttonHover}>
                {heroSlides[currentSlide].secondaryButton.text && (
                  <Link
                    href={heroSlides[currentSlide].secondaryButton.href || "#"}
                    rel='noopener noreferrer'
                  >
                    <BasicButton variant={"outlined"} size='lg'>
                      <div
                        className={`flex items-center gap-2 ${
                          currentSlide === 0
                            ? "text-[#76cfc8]"
                            : currentSlide === 1
                            ? "text-green-200"
                            : "text-[#76cfc8]"
                        }`}
                      >
                        {heroSlides[currentSlide].secondaryButton.text}
                      </div>
                    </BasicButton>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className={`md:w-1/2 flex ${currentSlide === 2 ? "justify-start" : "justify-center"}`}
            initial={{ opacity: 0, x: currentSlide === 1 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className={`relative w-full max-w-md h-[400px] ${
                currentSlide === 1
                  ? "transform -rotate-3"
                  : currentSlide === 2
                  ? "transform rotate-3"
                  : ""
              }`}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Image
                  src={heroSlides[currentSlide].logo}
                  alt='Zenee AI'
                  fill
                  className={`object-contain ${
                    currentSlide === 1
                      ? "drop-shadow-xl"
                      : currentSlide === 2
                      ? "drop-shadow-md"
                      : ""
                  }`}
                />
              </motion.div>
              <motion.div
                className={`absolute inset-0 z-[-1] ${heroSlides[currentSlide].style.logoBackground} rounded-full`}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  ...(currentSlide === 1
                    ? { rotate: [-5, 5, 0] }
                    : currentSlide === 2
                    ? { rotate: [5, -5, 0] }
                    : {}),
                }}
                transition={{ delay: 0.1, duration: 1.5, ease: "easeInOut" }}
              />

              {currentSlide === 1 && (
                <motion.div
                  className='absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-purple-200 z-[-2]'
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              )}
              {currentSlide === 2 && (
                <motion.div
                  className='absolute -left-10 -top-10 w-24 h-24 rounded-full bg-emerald-100 z-[-2]'
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SliderAnimation;
