"use client";

import React, { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const {
    ref: featuresRefObserver,
    isIntersecting: isFeaturesIntersecting,
    animationKey,
  } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: false,
    repeatAnimation: true, // Cho phép animation lặp lại
  });
  const features = [
    {
      title: "AI Chatbot Intelligent",
      description:
        "Build a chatbot that understands and answers complex questions accurately, improving customer experience.",
      icon: "🤖",
    },
    {
      title: "Multi-platform integration",
      description:
        "Support Website, Facebook, Telegram, Zalo and many other channels, making it easy to reach customers.",
      icon: "🌐",
    },
    {
      title: "Data analysis",
      description:
        "Track user behavior and provide detailed reports to optimize AI performance.",
      icon: "📊",
    },
    {
      title: "Tùy biến AI",
      description:
        "Train AI according to business requirements, helping AI understand context and respond more accurately.",
      icon: "⚙️",
    },
    {
      title: "Train AI from data",
      description:
        "Train chatbot with internal documents, FAQs, and business data to ensure high accuracy.",
      icon: "📚",
    },
    {
      title: "Automate processes",
      description:
        "Free up staff from repetitive tasks, optimizing business operations.",
      icon: "🔄",
    },
  ];

  return (
    <div
      className="py-16 bg-gradient-to-b from-blue-50 to-white px-4"
      ref={featuresRef}
      id="features"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 mt-8">
          <div className="text-32-32 text-neutral font-bold animate-slide-in-up">
            Features Highlight
          </div>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 animate-slide-in-up">
            Zenee AI provides a comprehensive AI solution to help businesses
            automate, optimize performance, and improve customer experience.
          </div>
        </div>

        <div
          ref={featuresRefObserver}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={`${index}-${animationKey}`} // Sử dụng animationKey để trigger animation lại
              className={`feature-card bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-500 ${
                isFeaturesIntersecting
                  ? index % 2 === 0
                    ? "animate-fade-in-left"
                    : index % 2 === 1
                    ? "animate-fade-in-right"
                    : "animate-slide-in-up"
                  : "opacity-0 translate-x-10"
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="text-24-28 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
