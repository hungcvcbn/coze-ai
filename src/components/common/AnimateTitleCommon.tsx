"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimateTitleCommonProps {
  title: string;
  className?: string;
  wordClasses?: string[];
}

const AnimateTitleCommon = ({
  title,
  className,
  wordClasses,
}: AnimateTitleCommonProps) => {
  const words = title.split(" ");
  return (
    <div
      className={`font-bold text-24-32 sm:text-[60px] letter-spacing-[0.2px] flex flex-wrap gap-1 sm:gap-3  ${className} `}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClasses?.[i] || ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
          viewport={{ once: false }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimateTitleCommon;
