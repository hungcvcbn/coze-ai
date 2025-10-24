import React, { useEffect } from "react";
import BackgroundHero from "@/assets/images/bg_hero.webp";
import Image from "next/image";
import HeroSectionRight1 from "@/assets/images/image_hero_right_1.png";
import HeroSectionRight2 from "@/assets/images/image_hero_right_2.png";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnimateWord } from "@/hooks/useAnimateWord";

const HeroSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
    triggerOnce: false,
  });

  // Initialize the magnetic hover effect
  const animateWord = useAnimateWord(".hero-text");

  useEffect(() => {
    // Re-initialize when component becomes visible
    if (isIntersecting) {
      animateWord.initializeSplitText();
    }
  }, [isIntersecting, animateWord]);

  return (
    <div
      ref={ref}
      className={`h-screen min-h-[1200px] w-full transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${BackgroundHero.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 grid grid-cols-2 ml-[100px] pt-[200px] h-full">
        <div className="flex flex-col items-start justify-start w-[787px]">
          <div
            className={`hero-text text-[60px] font-bold text-white transition-all duration-1000 ease-out ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Design inspirations,
            <p className="text-2xl font-bold text-[#8746EB]">meet Figma</p>
          </div>
          <p
            className={`hero-text text-20-28 transition-all duration-1000 ease-out ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Web to Figma is the most delightful way to save, organise, and
            import inspirations into Figma as pixel-perfect components.
            Screenshots, you're out!
          </p>
          <div
            className={`flex items-center justify-start pt-10 text-white transition-all duration-1000 ease-out ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <ul className="hero-text list-disc list-inside text-20-28 space-y-2">
              <li>2000+ components</li>
              <li>Unlimited collections</li>
              <li>Pixel-perfect capture</li>
              <li>Light and Dark themes</li>
              <li>Multiple viewport sizes </li>
            </ul>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <Image
            src={HeroSectionRight2}
            alt="Hero Section Image"
            width={535}
            height={754}
            className={`w-[350px] 2xl:w-[535px] 2xl:h-[754px] aspect-[535/754] -mr-10 -mb-10 transition-all duration-1000 ease-out ${
              isIntersecting
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-10"
            }`}
            style={{
              boxShadow:
                "0 -4px 40px 0px rgba(135, 70, 235, 0.4), 4px 0 40px 0px rgba(135, 70, 235, 0.4), 0px 0 40px 0px rgba(135, 70, 235, 0.4)",
              borderTopLeftRadius: "18px",
              borderBottomLeftRadius: "18px",
              transitionDelay: "0.8s",
            }}
          />
          <Image
            src={HeroSectionRight1}
            alt="Hero Section Image"
            width={544}
            height={940}
            className={`w-[450px] -mb-10 2xl:w-[544px] 2xl:h-[940px] aspect-[544/940] transition-all duration-1000 ease-out ${
              isIntersecting
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-10"
            }`}
            style={{
              transitionDelay: "1s",
              boxShadow:
                "0 -4px 40px 0px rgba(135, 70, 235, 0.4), 4px 0 40px 0px rgba(135, 70, 235, 0.4), 0px 0 40px 0px rgba(135, 70, 235, 0.4)",
              WebkitBorderTopLeftRadius: "18px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
