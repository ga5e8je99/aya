"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FURRY_CO_DESIGNERS } from "@/lib/siteData";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";
import { FiHeart, FiAward, FiEye, FiX } from "react-icons/fi";
import { FaCat, FaPaw, FaCamera } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function CatCoDesigners() {
  const { dict, language } = useLanguage();
  const { coDesigners } = useSiteData();
  const activeCats = coDesigners && coDesigners.length > 0 ? coDesigners : FURRY_CO_DESIGNERS;
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const t = dict?.coDesigners || {};

  return (
    <section
      id="co-designers"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#FAF5FF] via-[#FFF7ED] to-[#FFF7ED] transition-colors duration-500 overflow-hidden"
    >
      {/* Decorative blurred pastel glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <FaPaw className="text-pink-500 w-3.5 h-3.5" />
            <span>{t.sectionBadge || "STUDIO CAT COMPANIONS"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Meet My"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
              {t.sectionTitleHighlight || "Furry Co-Designers"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "The real creative directors behind every brand identity! Meet the three adorable rescue cats who supervise every pixel from my desk."}
          </p>

          {/* Button to view Aya's photo with her cats */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSelectedPhoto(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-pink-700 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FaCamera className="text-pink-500" />
              <span>{t.viewOriginalPhoto || "See Aya with Milo, Oliver & Luna"}</span>
            </button>
          </div>
        </div>

        {/* 3 Cat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeCats.map((cat, index) => {
            const catName = language === "ar" ? cat.nameAr : cat.name;
            const catRole = language === "ar" ? cat.roleAr : cat.role;
            const catQuirk = language === "ar" ? cat.quirkAr : cat.quirk;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveCat(cat)}
                className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-7 border ${cat.border} shadow-lg shadow-pink-500/5 hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-300 flex flex-col justify-between cursor-pointer group`}
              >
                {/* Floating Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-100 to-amber-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {cat.iconName === "FaCat" ? (
                      <FaCat className="text-amber-500" />
                    ) : cat.iconName === "FaPaw" ? (
                      <FaPaw className="text-pink-500" />
                    ) : (
                      <HiSparkles className="text-purple-500" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200/80">
                    {cat.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-[#2d1b30] group-hover:text-pink-600 transition-colors">
                      {catName}
                    </h3>
                    <span className="text-xs font-mono text-gray-500">
                      ({cat.breed})
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-pink-600">
                    {catRole}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed italic bg-pink-50/50 p-3 rounded-xl border border-pink-100/60">
                    &ldquo;{catQuirk}&rdquo;
                  </p>
                </div>

                {/* Footer Stat */}
                <div className="pt-4 border-t border-pink-100 flex items-center justify-between text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <FiAward className="text-sm" />
                    <span>{cat.funStat}</span>
                  </span>
                  <span className="text-pink-400 group-hover:translate-x-1 transition-transform">
                    <FaPaw className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Studio Note Banner */}
        <div className="mt-14 max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-pink-200/80 text-center shadow-sm">
          <p className="text-sm font-medium text-pink-900 flex items-center justify-center gap-2">
            <HiSparkles className="text-amber-400 w-4 h-4 shrink-0" />
            <span>
              {language === "ar"
                ? "دراسة لطيفة: وجود القطط في الأستوديو يضاعف تدفق الأفكار الإبداعية ويضمن تصميم هويات بروح مبهجة!"
                : "Fun fact: Having cats in the studio doubles the creative flow and guarantees joyful, heartwarming brand identities!"}
            </span>
            <FaPaw className="text-pink-400 w-3.5 h-3.5 shrink-0" />
          </p>
        </div>
      </div>

      {/* Lightbox / Modal to view Aya's Photo with Cats */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-pink-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              {/* Image */}
              <div className="relative w-full h-96 sm:h-[450px]">
                <Image
                  src="/aya-original.jpg"
                  alt="Aya Adel with her three cats"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <div className="p-6 bg-gradient-to-t from-pink-50 to-white">
                <h4 className="text-xl font-bold text-[#2d1b30] flex items-center gap-2">
                  <span>Aya Adel</span>
                  <span className="text-pink-500 inline-flex items-center gap-1">
                    <span>& Milo, Oliver & Luna</span>
                    <FaPaw className="w-3.5 h-3.5 text-pink-500" />
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {language === "ar"
                    ? "آية عادل محاطة بقططها الثلاث: مايلو المشمشي على ذراعها، أوليفر النائم بسلام في حجرها، ولونا المبتسمة على كتفها."
                    : "Aya Adel surrounded by her three cats: curious Milo on her arm, peaceful Oliver sleeping in her lap, and smiling Luna resting on her shoulder."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

