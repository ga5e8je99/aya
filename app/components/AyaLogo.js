"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";

/**
 * لوجو آية عادل الجديد:
 * حرف الـ A مدمج ببراعة مع قطة مبتسمة تضحك بسعادة (Laughing Happy Cat Monogram)
 * عيون مغمضة ضاحكة ^ ^، فم مفتوح مبتسم مع لسان وردي، خدود متوردة، ومخالب صغيرة لطيفة على العارضة.
 */
export default function AyaLogo({ size = 44, showText = true, className = "", isLink = true }) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Vector Logo Emblem */}
      <motion.div
        whileHover={{ rotate: 8, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative shrink-0 rounded-full flex items-center justify-center shadow-md shadow-pink-500/20"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id="ayaRoseGoldGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <linearGradient id="ayaGlowBg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFF1F5" />
            </linearGradient>
          </defs>

          {/* Outer Badge */}
          <circle cx="60" cy="60" r="54" fill="url(#ayaGlowBg)" stroke="url(#ayaRoseGoldGrad)" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="48" fill="none" stroke="#FDA4AF" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

          {/* Golden Sparkles of Creativity */}
          <path d="M 24 30 Q 25.5 25 27 30 Q 32 31.5 27 33 Q 25.5 38 24 33 Q 19 31.5 24 30 Z" fill="#F59E0B" />
          <path d="M 99 44 Q 100.5 39 102 44 Q 107 45.5 102 47 Q 100.5 52 99 47 Q 94 45.5 99 44 Z" fill="#F59E0B" />

          {/* Cute Cat Ears */}
          <path d="M 38 42 L 31 19 C 33 17 38 18 42 22 L 51 34 Z" fill="url(#ayaRoseGoldGrad)" />
          <path d="M 82 42 L 89 19 C 87 17 82 18 78 22 L 69 34 Z" fill="url(#ayaRoseGoldGrad)" />
          {/* Inner Ears */}
          <path d="M 37 38 L 33 24 C 34 23 37 24 39 26 L 47 34 Z" fill="#FFE4E6" />
          <path d="M 83 38 L 87 24 C 86 23 83 24 81 26 L 73 34 Z" fill="#FFE4E6" />

          {/* Monogram A Arch (Cat Head & Body Legs) */}
          <path d="M 29 90 C 33 68 46 35 60 33 C 74 35 87 68 91 90" fill="none" stroke="url(#ayaRoseGoldGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Smiling Happy Crescent Eyes (^ ^ Laughing Eyes) */}
          <path d="M 42 54 Q 49 45 56 54" fill="none" stroke="#831843" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 41 52 L 37 49" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 64 54 Q 71 45 78 54" fill="none" stroke="#831843" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 79 52 L 83 49" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="38" cy="62" rx="6.5" ry="4" fill="#FB7185" opacity="0.65" />
          <ellipse cx="82" cy="62" rx="6.5" ry="4" fill="#FB7185" opacity="0.65" />
          <circle cx="37" cy="61" r="1.2" fill="#FFFFFF" />
          <circle cx="83" cy="61" r="1.2" fill="#FFFFFF" />

          {/* Playful Whiskers */}
          <path d="M 33 58 Q 23 57 17 59" fill="none" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 32 63 Q 23 65 18 68" fill="none" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 87 58 Q 97 57 103 59" fill="none" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 88 63 Q 97 65 102 68" fill="none" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />

          {/* Tiny Cute Pink Nose */}
          <path d="M 57 59 C 57 57.8 63 57.8 63 59 C 63 60.5 60.5 63 60 63.3 C 59.5 63 57 60.5 57 59 Z" fill="#E11D48" />

          {/* Cheerful Open Laughing Smile (بيضحك من قلبه) */}
          <path d="M 52 65 Q 56 68 60 66 Q 64 68 68 65" fill="none" stroke="#9F1239" strokeWidth="2.4" strokeLinecap="round" />
          {/* Mouth Cavity */}
          <path d="M 53 66 Q 60 79 67 66 Z" fill="#881337" />
          {/* Cute Pink Tongue */}
          <path d="M 55 71.5 Q 60 78.5 65 71.5 Q 60 73.5 55 71.5 Z" fill="#FB7185" />

          {/* 'A' Crossbar with Cute Paws */}
          <path d="M 37 78 Q 60 81 83 78" fill="none" stroke="url(#ayaRoseGoldGrad)" strokeWidth="5" strokeLinecap="round" />
          
          {/* Left Cute Paw */}
          <path d="M 44 78 C 44 73.5 51 73.5 51 78 Z" fill="#FFFFFF" stroke="#EC4899" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M 46.5 76 L 46.5 78 M 48.5 76 L 48.5 78" stroke="#FDA4AF" strokeWidth="1.3" strokeLinecap="round" />
          {/* Right Cute Paw */}
          <path d="M 69 78 C 69 73.5 76 73.5 76 78 Z" fill="#FFFFFF" stroke="#EC4899" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M 71.5 76 L 71.5 78 M 73.5 76 L 73.5 78" stroke="#FDA4AF" strokeWidth="1.3" strokeLinecap="round" />

          {/* Happy Graceful Swishing Tail */}
          <path d="M 91 90 C 99 87 106 76 102 62 C 99 55 93 55 92 61" fill="none" stroke="url(#ayaRoseGoldGrad)" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-[#2d1b30] group-hover:text-pink-600 transition-colors">
            Aya Adel
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-pink-600 font-semibold uppercase -mt-0.5 flex items-center gap-1">
            <span>Design Studio</span>
            <FaPaw className="w-2.5 h-2.5 text-pink-500" />
          </span>
        </div>
      )}
    </div>
  );

  if (!isLink) return content;

  return (
    <Link href="/#home">
      {content}
    </Link>
  );
}
