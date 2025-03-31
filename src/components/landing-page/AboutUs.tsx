"use client";
import { useInView } from "react-intersection-observer";
import React from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { useEffect } from "react";
import { Avatar } from "@mui/material";

export default function AboutUs() {
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const howItWorksControls = useAnimation();
  const dragControls = useDragControls();

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
  const navigateTestimonial = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };
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
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 3500);
    }

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);
  useEffect(() => {
    if (howItWorksInView) {
      howItWorksControls.start("visible");
    }
  }, [howItWorksInView, howItWorksControls]);
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };
  return (
    <section
      className='py-10 px-4 bg-gradient-to-l from-primary-50 via-primary-100 to-white'
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
              className='p-2 rounded-full bg-primary-50 text-primary transform-gpu'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              style={{ willChange: "transform" }}
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
              className='p-2 rounded-full bg-primary-50 text-primary transform-gpu'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              style={{ willChange: "transform" }}
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
  );
}
