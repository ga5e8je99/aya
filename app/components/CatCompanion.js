"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { FaCat, FaPaw } from "react-icons/fa6";
import { FiX, FiChevronDown } from "react-icons/fi";

/**
 * الرفيق الأليف في ركن الشاشة (الجهة المعاكسة لأيقونة الحجز)
 * يقدم تفاعلات صوتية خفيفة، عبارات ترحيبية، ولمسة مرحة لبورتفوليو آية عادل
 */
export default function CatCompanion() {
  const { language } = useLanguage();
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [purrCount, setPurrCount] = useState(0);

  const dialogue = language === "ar" ? [
    "ميااو! أهلاً بك في بورتفوليو آية عادل بالإسماعيلية",
    "تأكدت بنفسي من تناسق ألوان هذا التصميم!",
    "آية تصمم أجمل الهويات البصرية والتغليف على الإطلاق!",
    "أنا وزملائي القطط نراقب دقة كل بكسل هنا!",
    "كل 30 ثانية تتجول قطتنا الشيرازي في الشاشة لتتفقد الأستوديو!",
    "مايلو، أوليفر، ولونا يرسلون لك أرق التحيات!"
  ] : [
    "Meow! Welcome to Aya Adel's design haven in Ismailia!",
    "I personally inspected the Pantone colors on this page!",
    "Aya's brand identities are completely purr-fect!",
    "My feline friends and I supervise every single pixel!",
    "Every 30 seconds our Persian cat takes a stroll across the studio!",
    "Milo, Oliver & Luna send their warmest cuddles!"
  ];

  // صوت مواء لطيف ومميز عند النقر
  const playCuteMeow = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.32);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.33);
    } catch {
      // Audio autoplay blocked or unavailable
    }
  };

  // فقاعة ترحيبية بعد قليل من التحميل
  useEffect(() => {
    const greetingTimer = setTimeout(() => {
      setShowBubble(true);
    }, 3500);
    return () => clearTimeout(greetingTimer);
  }, []);

  const handleCatClick = () => {
    playCuteMeow();
    setPurrCount((prev) => prev + 1);
    setBubbleIndex((prev) => (prev + 1) % dialogue.length);
    setShowBubble(true);
  };

  return (
    <>
      {/* تموضع القط في الركن الأيسر السفلي (عكس اتجاه الكاليندر تماماً في الركن الأيمن) */}
      <div
        className="fixed bottom-4 left-4 sm:left-6 z-40 flex flex-col items-start select-none"
      >
        {/* فقاعة الحديث التفاعلية */}
        <AnimatePresence>
          {showBubble && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="relative mb-2 max-w-[240px] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-pink-500/10 border border-pink-200 text-xs text-gray-800 font-medium"
            >
              <button
                type="button"
                onClick={() => setShowBubble(false)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center text-[10px] hover:bg-pink-200 transition-colors shadow-xs"
                title="إغلاق"
              >
                <FiX className="w-2.5 h-2.5" />
              </button>
              <p className="leading-relaxed text-pink-950 pr-2">
                {dialogue[bubbleIndex]}
              </p>
              {/* ذيل الفقاعة موجه للقطة */}
              <div
                className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r border-b border-pink-200 transform rotate-45"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* مجسم القط التفاعلي */}
        {!isMinimized ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCatClick}
            className="group relative cursor-pointer flex flex-col items-center"
          >
            {/* أزرار مصغرة للتحكم عند التمرير */}
            <div className="absolute -top-7 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-pink-200 shadow-md">
              <span className="text-[10px] font-semibold text-pink-600 whitespace-nowrap flex items-center gap-1">
                {purrCount > 0 ? (
                  <>
                    <FaPaw className="w-2.5 h-2.5 text-pink-500" />
                    <span>× {purrCount}</span>
                  </>
                ) : (
                  <span>{language === "ar" ? "اضغطني!" : "Pet me!"}</span>
                )}
              </span>
              <span className="text-gray-300">•</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                title="تصغير القطة"
                className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center"
              >
                <FiChevronDown className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* بطاقة القط الأنيقة المتناسقة مع هوية الموقع */}
            <div className="relative bg-gradient-to-b from-pink-50 to-rose-100/90 hover:from-pink-100 hover:to-rose-200 p-2.5 rounded-full border-2 border-pink-300 shadow-lg shadow-pink-500/20 transition-all duration-300">
              {/* أيقونة القطة المتناسقة */}
              <svg
                width="46"
                height="46"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:rotate-3 transition-transform"
              >
                {/* Cat Ears */}
                <polygon points="20,40 32,12 48,32" fill="#F97316" />
                <polygon points="25,36 33,18 43,30" fill="#FDA4AF" />
                <polygon points="80,40 68,12 52,32" fill="#F97316" />
                <polygon points="75,36 67,18 57,30" fill="#FDA4AF" />

                {/* Cat Head */}
                <ellipse cx="50" cy="52" rx="35" ry="30" fill="#FDBA74" />
                
                {/* Cheeks / muzzle */}
                <circle cx="42" cy="62" r="10" fill="#FFF1F2" />
                <circle cx="58" cy="62" r="10" fill="#FFF1F2" />

                {/* Eyes */}
                <ellipse cx="37" cy="46" rx="5" ry="7" fill="#1E293B" />
                <ellipse cx="63" cy="46" rx="5" ry="7" fill="#1E293B" />
                <circle cx="39" cy="44" r="2" fill="#FFFFFF" />
                <circle cx="65" cy="44" r="2" fill="#FFFFFF" />

                {/* Nose & Mouth */}
                <polygon points="50,56 46,52 54,52" fill="#F43F5E" />
                <path d="M 46,58 Q 50,62 50,60 Q 50,62 54,58" stroke="#E11D48" strokeWidth="1.8" fill="none" />

                {/* Whiskers */}
                <line x1="22" y1="58" x2="36" y2="59" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="64" x2="35" y2="63" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="78" y1="58" x2="64" y2="59" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="80" y1="64" x2="65" y2="63" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

                {/* Blush marks */}
                <ellipse cx="28" cy="54" rx="4" ry="2" fill="#FB7185" opacity="0.6" />
                <ellipse cx="72" cy="54" rx="4" ry="2" fill="#FB7185" opacity="0.6" />
              </svg>

              {/* بادج المخلب الفيكتور */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm animate-pulse">
                <FaPaw className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-pink-600 mt-1 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
              <span>{language === "ar" ? "انقرني" : "Pet me"}</span>
              <FaCat className="w-2.5 h-2.5 text-pink-500" />
            </span>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-300 shadow-md text-xs font-semibold text-pink-600 hover:bg-pink-50 transition-all"
          >
            <FaCat className="w-3 h-3 text-pink-500" />
            <span>{language === "ar" ? "إظهار القطة" : "Show Cat"}</span>
          </motion.button>
        )}
      </div>
    </>
  );
}
