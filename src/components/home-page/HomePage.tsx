"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BasicButton from "@/components/common/BasicButton";
import { useAppSelector } from "@/redux/hooks";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HomeBackground from "@/assets/images/background.png";
import HomeNextground from "@/assets/images/homepage2.jpg";
import HomeNextground2 from "@/assets/images/homepage1.jpg";
import { Avatar } from "@mui/material";
import LayoutFooter from "@/components/layout/LayoutFooter";
import HomeLogo1 from "@/assets/icons/logo.svg";
import HomeLogo2 from "@/assets/icons/logo.svg";
import HomeLogo3 from "@/assets/icons/logo.svg";
import Link from "next/link";

const HomePage = () => {
  const router = useRouter();
  const { profile } = useAppSelector(state => state.common);

  const handleGetStarted = () => {
    if (profile) {
      router.push("/control-panel");
    } else {
      router.push("/login");
    }
  };

  const featureControls = useAnimation();
  const howItWorksControls = useAnimation();
  const ctaControls = useAnimation();

  const [featureRef, featureInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (featureInView) {
      featureControls.start("visible");
    }
    if (howItWorksInView) {
      howItWorksControls.start("visible");
    }
    if (ctaInView) {
      ctaControls.start("visible");
    }
  }, [
    featureInView,
    howItWorksInView,
    ctaInView,
    featureControls,
    howItWorksControls,
    ctaControls,
  ]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonHover = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    focus: {
      scale: 1.03,
      boxShadow: "0px 0px 0px 3px rgba(41, 170, 225, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  const cardHover = {
    initial: { y: 0 },
    hover: {
      y: -10,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    focus: {
      y: -5,
      boxShadow: "0px 5px 15px rgba(41, 170, 225, 0.2)",
      outline: "2px solid #29AAE1",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const testimonials = [
    {
      id: 1,
      text: "Zenee AI has completely transformed our customer service operations. Before implementing it, our support team was overwhelmed with repetitive inquiries, leading to long response times and frustrated customers. Now, our AI agent seamlessly handles over 70% of incoming questions, providing instant and accurate responses. This has not only saved us countless hours but also allowed our human agents to focus on complex issues, improving overall customer satisfaction.",
      author: "Sarah Johnson",
      position: "Customer Success Manager",
      company: "TechCorp",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 2,
      text: "I was initially skeptical about integrating AI into our operations, fearing it would be too complicated and require extensive training. However, I was pleasantly surprised by how easy it was to set up and train our custom AI agent. Within a few weeks, it became an essential part of our team and inquiries with remarkable efficiency. The automation has significantly improved our workflow, and given our employees more time to focus on innovation and strategic projects.",
      author: "Michael Chen",
      position: "Operations Director",
      company: "InnovateLabs",
      avatar: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg",
    },
    {
      id: 3,
      text: "The level of customization offered by Zenee AI is truly incredible. We were able to design an AI agent that perfectly matches our brand voice, tone, and industry-specific knowledge base. It now engages with our customers in a way that feels natural and personalized, making interactions seamless and effective. The positive feedback from our users has been overwhelming, and our engagement metrics have significantly improved since integrating this technology.",
      author: "Elena Rodriguez",
      position: "Marketing Lead",
      company: "BrandGenius",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const dragControls = useDragControls();

  const navigateTestimonial = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 3500);
    }

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const handleSliderInteraction = () => {
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const handleDragEnd = (e: any, info: any) => {
    handleSliderInteraction();
    if (info.offset.x > 100) {
      navigateTestimonial("prev");
    } else if (info.offset.x < -100) {
      navigateTestimonial("next");
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderAutoPlay, setSliderAutoPlay] = useState(true);
  const heroSlides = [
    {
      id: 1,
      logo: HomeLogo1.src,
      background: HomeBackground.src,
      title:
        "Empower Your Business with <span class='text-primary inline-block text-40-40'>AI-Powered Automation</span>",
      description:
        "Unlock the full potential of AI-driven automation to streamline operations, enhance customer interactions, and drive business growth. With Zenee AI, you can easily build, train, and deploy custom AI agents that seamlessly integrate with your workflows.",
      primaryButton: {
        text: "Get Started",
        href: "/control-panel",
      },
      secondaryButton: {
        text: "Explore Bot Store",
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
        "Revolutionize Customer Experience with <span class='text-secondary inline-block text-40-40'>Zenee AI Assistants</span>",
      description:
        "Deliver fast, personalized, and efficient customer support by leveraging AI-powered chat and voice assistants. Automate routine inquiries and provide instant, accurate responses—24/7.",
      primaryButton: {
        text: "Create Assistant",
        href: "/create-assistant",
      },
      secondaryButton: {
        text: "See Examples",
        href: "/examples",
      },
      style: {
        titleColor: "text-neutral-800",
        descriptionColor: "text-neutral-600",
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
        "Accelerate Growth with <span class='text-emerald-600 inline-block text-40-40'>AI-Driven Business Solutions</span>",
      description:
        "Stay ahead of the competition by deploying AI agents that work around the clock to engage with customers, manage workflows, and optimize efficiency. Reduce costs while maximizing productivity.",
      primaryButton: {
        text: "Schedule Demo",
        href: "/schedule-demo",
      },
      secondaryButton: {
        text: "",
        href: "/pricing",
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

  return (
    <div>
      <div className='min-h-screen bg-white overflow-hidden'>
        <section
          className='py-16 md:py-24 px-4 relative transition-all duration-1000 ease-in-out'
          style={{ backgroundImage: `url(${heroSlides[currentSlide].background})` }}
        >
          <div
            className={`absolute inset-0 ${heroSlides[currentSlide].style.overlayColor} z-0`}
          ></div>
          <div className='max-w-7xl mx-auto relative z-10'>
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 flex gap-2'>
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
                initial={{ opacity: 0, x: currentSlide === 1 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentSlide === 1 ? -50 : 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <BasicButton variant={currentSlide === 2 ? "text" : "outlined"} size='lg'>
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
                className={`md:w-1/2 flex ${
                  currentSlide === 2 ? "justify-start" : "justify-center"
                }`}
                initial={{ opacity: 0, x: currentSlide === 1 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
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
                    transition={{ delay: 0.1, duration: 1.2, ease: "easeInOut" }}
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
                      className='absolute -left-10 -top-10 w-24 h-24 rounded-full bg-emerald-200 z-[-2]'
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

        {/* Features Section */}
        <section className='py-16 bg-gradient-to-r from-primary-50 to-whitepx-4' ref={featureRef}>
          <div className='max-w-7xl mx-auto'>
            <motion.h2
              className='text-32-32 font-bold text-center text-neutral mb-12'
              variants={fadeIn}
              initial='hidden'
              animate={featureControls}
            >
              Why Choose Zenee AI?
            </motion.h2>
            <motion.div
              className='grid grid-cols-1 md:grid-cols-3 gap-8'
              variants={staggerContainer}
              initial='hidden'
              animate={featureControls}
            >
              <motion.div
                className='bg-white p-6 rounded-lg shadow-md transform-gpu'
                variants={{
                  ...staggerItem,
                  hover: cardHover.hover,
                }}
                whileHover='hover'
              >
                <div className='w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4'>
                  <motion.svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#29AAE1'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  >
                    <path d='M12 2L2 7l10 5 10-5-10-5z'></path>
                    <path d='M2 17l10 5 10-5'></path>
                    <path d='M2 12l10 5 10-5'></path>
                  </motion.svg>
                </div>
                <h3 className='text-xl font-semibold text-neutral mb-2'>Easy to Train</h3>
                <p className='text-gray-600'>
                  No coding required. Train your AI agents with simple conversations and document
                  uploads.
                </p>
              </motion.div>

              <motion.div
                className='bg-white p-6 rounded-lg shadow-md transform-gpu'
                variants={{
                  ...staggerItem,
                  hover: cardHover.hover,
                }}
                whileHover='hover'
              >
                <div className='w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4'>
                  <motion.svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#29AAE1'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  >
                    <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
                    <line x1='3' y1='9' x2='21' y2='9'></line>
                    <line x1='9' y1='21' x2='9' y2='9'></line>
                  </motion.svg>
                </div>
                <h3 className='text-xl font-semibold text-neutral mb-2'>Highly Customizable</h3>
                <p className='text-gray-600'>
                  Tailor your AI agents with custom prompts, knowledge bases, and conversation
                  styles.
                </p>
              </motion.div>

              <motion.div
                className='bg-white p-6 rounded-lg shadow-md transform-gpu'
                variants={{
                  ...staggerItem,
                  hover: cardHover.hover,
                }}
                whileHover='hover'
              >
                <div className='w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4'>
                  <motion.svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#29AAE1'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                  </motion.svg>
                </div>
                <h3 className='text-xl font-semibold text-neutral mb-2'>Multi-Platform</h3>
                <p className='text-gray-600'>
                  Deploy your AI agents across multiple platforms including web, mobile, and popular
                  messaging apps.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className='py-16 px-4 relative  bg-gradient-to-l from-slate-50 to-white'
          ref={howItWorksRef}
        >
          <div className='absolute inset-0 z-0 opacity-5'>
            <div className='absolute w-80 h-80 rounded-full bg-primary-200 bottom-40 left-20 blur-3xl animate-blob animation-delay-4000'></div>
          </div>
          <div className='max-w-7xl mx-auto relative z-10'>
            <motion.h2
              className='text-32-32 font-bold text-center text-neutral mb-12'
              variants={fadeIn}
              initial='hidden'
              animate={howItWorksControls}
            >
              How Zenee AI Works
            </motion.h2>
            <motion.div
              className='grid grid-cols-1 md:grid-cols-4 gap-8'
              variants={staggerContainer}
              initial='hidden'
              animate={howItWorksControls}
            >
              {[1, 2, 3, 4].map((num, index) => (
                <motion.div key={num} className='text-center' variants={staggerItem} custom={index}>
                  <motion.div
                    className='w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4'
                    whileHover={{ scale: 1.1, backgroundColor: "#e0f7ff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.span
                      className='text-2xl font-bold text-primary'
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                    >
                      {num}
                    </motion.span>
                  </motion.div>
                  <h3 className='text-xl font-semibold text-neutral mb-2'>
                    {index === 0 && "Create"}
                    {index === 1 && "Train"}
                    {index === 2 && "Test"}
                    {index === 3 && "Deploy"}
                  </h3>
                  <p className='text-gray-600'>
                    {index === 0 && "Set up your AI agent with a name and basic configuration"}
                    {index === 1 && "Upload documents and customize prompts to train your AI"}
                    {index === 2 && "Interact with your AI agent to refine its responses"}
                    {index === 3 && "Publish your AI agent to make it available to users"}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className='mt-16 h-2 bg-gray-100 rounded-full relative max-w-4xl mx-auto'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div
                className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-primary-200 to-primary rounded-full'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>

        <section
          className='py-10 px-4 bg-gradient-to-b from-primary-50 to-white'
          ref={howItWorksRef}
        >
          <div className='max-w-7xl mx-auto'>
            <motion.h2
              className='text-32-32 font-bold text-center text-neutral mb-12'
              variants={fadeIn}
              initial='hidden'
              animate={howItWorksControls}
            >
              What Our Users Say
            </motion.h2>

            <motion.div
              className='relative max-w-4xl mx-auto overflow-hidden '
              variants={fadeIn}
              initial='hidden'
              animate={howItWorksControls}
            >
              <motion.div
                className='relative h-[320px]'
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                dragControls={dragControls}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
                style={{ cursor: "grab" }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className='absolute top-0 left-0 w-full bg-gray-50 p-8 rounded-xl shadow-md'
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: currentTestimonial === index ? 1 : 0,
                      x: currentTestimonial === index ? 0 : 100,
                      display: currentTestimonial === index ? "block" : "none",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className='object-cover w-[100px] h-[100px]'
                      />

                      <div className='flex-grow'>
                        <p className='text-lg text-neutral italic mb-4'>"{testimonial.text}"</p>
                        <div>
                          <h4 className='font-semibold text-neutral'>{testimonial.author}</h4>
                          <p className='text-sm text-gray-600'>
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className='flex justify-between'>
                <motion.button
                  onClick={() => {
                    navigateTestimonial("prev");
                    handleSliderInteraction();
                  }}
                  className='p-2 rounded-full bg-primary-50 text-primary'
                  whileHover={{ scale: 1.1, backgroundColor: "#e0f7ff" }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(41, 170, 225, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M15 18l-6-6 6-6' />
                  </svg>
                </motion.button>

                <div className='flex gap-2 pt-4'>
                  {testimonials.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        currentTestimonial === idx ? "bg-primary" : "bg-gray-300"
                      }`}
                      onClick={() => {
                        setCurrentTestimonial(idx);
                        handleSliderInteraction();
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(41, 170, 225, 0.3)" }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => {
                    navigateTestimonial("next");
                    handleSliderInteraction();
                  }}
                  className='p-2 rounded-full bg-primary-50 text-primary'
                  whileHover={{ scale: 1.1, backgroundColor: "#e0f7ff" }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(41, 170, 225, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M9 18l6-6-6-6' />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Enhanced animations */}
        <section className='py-16 bg-primary-50 px-4 relative overflow-hidden' ref={ctaRef}>
          <motion.div
            className='absolute -right-40 -bottom-40 w-96 h-96 rounded-full bg-primary opacity-10'
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className='absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-300 opacity-10'
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          <motion.div
            className='max-w-4xl mx-auto text-center relative z-10'
            variants={fadeIn}
            initial='hidden'
            animate={ctaControls}
          >
            <motion.h2
              className='text-32-32 font-bold text-neutral mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={ctaControls ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Ready to Build Your Own AI Agent?
            </motion.h2>
            <motion.p
              className='text-lg text-gray-600 mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={ctaControls ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join thousands of users who are already creating powerful AI agents with Zenee AI.
            </motion.p>
            <motion.div
              className='flex justify-center mx-auto w-[240px] rounded-2xl p-3 text-neutral bg-primary-200'
              variants={buttonHover}
              initial='initial'
              whileHover='hover'
              whileFocus='focus'
              whileTap='tap'
              animate={ctaControls ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <BasicButton
                variant='contained'
                size='lg'
                onClick={handleGetStarted}
                className='transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              >
                Get Started for Free
              </BasicButton>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}

        <LayoutFooter />
      </div>
      <style jsx global>{`
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

        /* Enhanced smooth animations */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity,
            box-shadow, transform;
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

export default HomePage;
