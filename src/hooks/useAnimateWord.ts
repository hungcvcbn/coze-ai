import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useEffect, useCallback } from "react";

export const useAnimateWord = (targetSelector: string = "p") => {
  const splitTextRef = useRef<SplitText | null>(null);

  const initializeSplitText = useCallback(() => {
    if (splitTextRef.current) {
      splitTextRef.current.revert();
    }

    const elements = document.querySelectorAll(targetSelector);
    if (elements.length > 0) {
      splitTextRef.current = SplitText.create(elements, {
        type: "chars",
        charsClass: "char",
      });
    }
  }, [targetSelector]);

  const handleMouseMove = useCallback((e: Event) => {
    const mouseEvent = e as MouseEvent;
    if (!splitTextRef.current) return;

    splitTextRef.current.chars.forEach((char, index) => {
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseEvent.clientX - cx;
      const dy = mouseEvent.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hiệu ứng lực hút từ tính - nhân vật di chuyển về phía con trỏ
      const attractionRadius = 80;
      const attractionStrength = 0.2;

      if (dist < attractionRadius) {
        const attraction = (attractionRadius - dist) / attractionRadius;
        const moveX = -dx * attraction * attractionStrength;
        const moveY = -dy * attraction * attractionStrength;

        // Màu sắc hiệu ứng lực hút từ tính
        const hue = (index * 40 + mouseEvent.clientX * 0.2) % 360;
        const saturation = 70 + attraction * 30;
        const lightness = 50 + attraction * 20;

        gsap.to(char, {
          duration: 0.8,
          x: moveX,
          y: moveY,
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          textShadow: `0 0 ${
            attraction * 15
          }px hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        // Đặt qlại vị trí ban đầu
        gsap.to(char, {
          duration: 0.5,
          x: 0,
          y: 0,
          color: "",
          textShadow: "",
          scale: 1, // Đặt quy mô về 1 để tránh zoom
          ease: "power2.out",
          overwrite: true,
        });
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (splitTextRef.current) {
      // Đặt tất cả các nhân vật về trạng thái ban đầu
      gsap.to(splitTextRef.current.chars, {
        duration: 0.8,
        x: 0,
        y: 0,
        color: "",
        textShadow: "",
        scale: 1, // Đặt quy mô về 1 để tránh zoom
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, []);

  useEffect(() => {
    // Khởi tạo văn bản sau khi component mount
    const timer = setTimeout(initializeSplitText, 100);

    return () => {
      clearTimeout(timer);
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, [initializeSplitText]);

  useEffect(() => {
    const elements = document.querySelectorAll(targetSelector);

    elements.forEach((element) => {
      element.addEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, [targetSelector, handleMouseLeave, handleMouseMove]);

  return {
    initializeSplitText,
  };
};
