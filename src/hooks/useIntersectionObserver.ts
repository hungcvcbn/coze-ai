import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  repeatAnimation?: boolean; // Thêm option để lặp lại animation
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  repeatAnimation = false,
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key để trigger animation lại
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const isElementIntersecting = entry.isIntersecting;

      if (triggerOnce && !repeatAnimation) {
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
          setIsIntersecting(true);
          // Unobserve và disconnect sau khi đã trigger để tránh animation lặp lại
          if (observerRef.current && ref.current) {
            observerRef.current.unobserve(ref.current);
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      } else {
        setIsIntersecting(isElementIntersecting);

        // Nếu repeatAnimation = true và element vào view, trigger animation lại
        if (repeatAnimation && isElementIntersecting) {
          setAnimationKey((prev) => prev + 1);
        }
      }
    },
    [triggerOnce, hasIntersected, repeatAnimation]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Nếu đã trigger và triggerOnce = true và không repeat, không tạo observer mới
    if (triggerOnce && hasIntersected && !repeatAnimation) {
      return;
    }

    // Cleanup observer cũ nếu có
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [
    threshold,
    rootMargin,
    handleIntersection,
    triggerOnce,
    hasIntersected,
    repeatAnimation,
  ]);

  return {
    ref,
    isIntersecting:
      triggerOnce && !repeatAnimation ? hasIntersected : isIntersecting,
    animationKey, // Trả về key để trigger animation lại
  };
};
