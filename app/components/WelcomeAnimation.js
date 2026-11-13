"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import AyaLogo from "./AyaLogo";
import { HiSparkles } from "react-icons/hi2";

export default function WelcomeAnimation({ onComplete }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("aya_intro_seen") === "true"
    ) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("aya_intro_seen", "true");
      }
      if (onComplete) onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("aya_intro_seen", "true");
    }
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF8FA] via-[#FFF0F5] to-[#FDF2F8] text-[#2d1b30] px-4 select-none cursor-pointer"
      onClick={handleSkip}
    >
      {/* Decorative ambient glowing background circles */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Animated Aya Adel Logo Emblem */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-3"
        >
          <AyaLogo size={70} showText={false} isLink={false} />
        </motion.div>

        {/* Handwriting Cursive */}
        <div className="welcome-handwrite">Aya Adel</div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-xs sm:text-sm font-mono text-[#785b7f] tracking-[0.25em] uppercase mt-3 font-semibold flex items-center justify-center gap-1.5"
        >
          <span>Graphic Design <span className="text-pink-500">•</span> Brand Identity Studio</span>
          <HiSparkles className="text-pink-400 w-3.5 h-3.5" />
        </motion.p>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute bottom-8 px-5 py-2 text-xs font-mono font-semibold text-pink-700 hover:text-pink-900 bg-white/80 hover:bg-white border border-pink-200 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
}
