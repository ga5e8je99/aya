"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { FiArrowDown, FiHeart } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaCat, FaPaw } from "react-icons/fa6";

export default function Hero() {
  const { profile } = useSiteData();
  const { dict, language } = useLanguage();
  const fullName = language === "ar" ? dict.hero.name : (profile.name || "Aya Adel");
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || fullName;
  const lastName = nameParts.slice(1).join(" ") || "";

  const designPills = [
    "Adobe Illustrator",
    "Photoshop",
    "Brand Identity",
    "Packaging Design",
    "Figma",
    "Typography",
    "Editorial Art",
    "Creative Studio",
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative bg-[#FFF5F8] transition-colors duration-500 overflow-hidden"
      id="home"
    >
      {/* Soft ambient background pastel glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-80 h-80 bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-7 animate-fade-in-up">
            <div className="space-y-4">
              {/* Top Greeting Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
                <p className="text-pink-600 font-mono text-xs tracking-wider font-semibold uppercase">
                  {dict.hero.greeting}
                </p>
              </div>

              {/* Main Name Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#2d1b30] leading-[1.15] tracking-tight">
                <span>{firstName}</span>{" "}
                {lastName && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
                    {lastName}
                  </span>
                )}
              </h1>

              {/* Role Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#614566]">
                {language === "ar" ? dict.hero.role : (profile.roleTitle || dict.hero.role)}
              </h2>
            </div>

            {/* Short Bio */}
            <p className="text-[#57445c] text-base sm:text-lg leading-relaxed max-w-xl">
              {language === "ar" ? dict.hero.shortBio : (profile.shortBio || dict.hero.shortBio)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#portfolio"
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/25 flex items-center gap-2 text-sm sm:text-base"
              >
                <span>{dict.hero.viewWork}</span>
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3.5 bg-white/90 hover:bg-white text-pink-700 font-semibold rounded-full border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-md hover:shadow-pink-500/10 text-sm sm:text-base"
              >
                <span>{dict.hero.contactMe}</span>
              </Link>
            </div>

            {/* Creative Disciplines & Tools Pills */}
            <div className="pt-6">
              <p className="text-pink-900/80 text-xs font-mono mb-3 tracking-wider font-semibold uppercase flex items-center gap-1.5">
                <HiSparkles className="text-pink-500" />
                <span>{language === "ar" ? "أبرز أدواتي ومهاراتي" : "CORE SPECIALTIES"}</span>
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {designPills.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[#4a344d] text-xs font-medium border border-pink-200/90 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50/60 transition-all duration-200 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-80 sm:w-96 sm:h-[430px] lg:w-[440px] lg:h-[490px]">
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/30 via-rose-300/30 to-amber-300/30 rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>

              {/* Main Card */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white/80 shadow-2xl shadow-pink-500/15 group bg-gradient-to-b from-white to-pink-50/50">
                <Image
                  src={profile.avatarImage || "/aya-adel.png"}
                  alt={`${fullName} - Senior Graphic Designer with Cats`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 440px"
                  priority
                />

                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent pointer-events-none"></div>

                {/* Little decorative cat sticker peeking at corner */}
                <div className="absolute -top-1 -right-1 w-14 h-14 bg-white/95 rounded-bl-3xl rounded-tr-[2.3rem] shadow-sm flex items-center justify-center text-xl border-l border-b border-pink-100">
                  <FaCat className="text-amber-500 animate-bounce" />
                </div>
              </div>

              {/* Floating Badge: Studio Status */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-pink-200 shadow-lg shadow-pink-500/10 flex items-center gap-2 animate-float-delayed">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[#2d1b30] text-xs sm:text-sm font-semibold">
                  {dict.hero.badge}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-8 border-t border-pink-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-pink-100">
            <p className="text-3xl sm:text-4xl font-extrabold text-pink-600">5+</p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {dict.hero.experienceYears}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-pink-100">
            <p className="text-3xl sm:text-4xl font-extrabold text-rose-500">60+</p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {dict.hero.projectsDone}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-pink-100">
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-500">100%</p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {dict.hero.clientSatisfaction}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-pink-100">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-500 flex items-center justify-center gap-1.5">
              <span>3</span>
              <FaPaw className="text-xl text-purple-400" />
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {language === "ar" ? "قطط مساعدة بالأستوديو" : "Furry Studio Cats"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
