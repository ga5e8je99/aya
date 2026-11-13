"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart,
  FiAward,
  FiCheckCircle,
  FiEye,
  FiFeather,
  FiLayers,
  FiPenTool,
  FiMapPin,
  FiMail,
  FiBookOpen,
  FiImage,
  FiVideo,
} from "react-icons/fi";
import { SiFigma } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { FaCat, FaPaw } from "react-icons/fa6";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutMe() {
  const { profile } = useSiteData();
  const { dict, language } = useLanguage();
  const t = dict?.about || {};

  const designPillars = language === "ar" ? [
    {
      title: "هويات بصرية استراتيجية وتماسك فني",
      description: "بناء أنظمة بصرية متكاملة وشعارات فريدة ترتبط عاطفياً مع الجمهور وتعزز القيمة السوقية للعلامة التجارية.",
      icon: <FiPenTool className="text-pink-500" />,
      tag: "الهوية البصرية"
    },
    {
      title: "تغليف فاخر، داي-لاين وهندسة طباعية",
      description: "تصميم عبوات تأسر الأعين على أرفف المتاجر مع عناية دقيقة بملفات الطباعة CMYK والبصمات اللامعة.",
      icon: <FiLayers className="text-rose-500" />,
      tag: "التغليف والطباعة"
    },
    {
      title: "تصاميم رقمية وسوشيال ميديا فائقة الجاذبية",
      description: "محتوى بصري مخصص لمنصات التواصل يجبر المستخدم على التوقف والتفاعل، بأسلوب أنيق ومبتكر.",
      icon: <FiFeather className="text-purple-500" />,
      tag: "الإبداع الرقمي"
    }
  ] : [
    {
      title: "Strategic Brand Identity & Storytelling",
      description: "Architecting holistic brand systems and timeless logos that resonate emotionally and scale across every touchpoint.",
      icon: <FiPenTool className="text-pink-500" />,
      tag: "Brand Identity"
    },
    {
      title: "Tactile Luxury Packaging & Pre-Press",
      description: "Crafting shelf-stopping packaging, box die-lines, and print-ready finishes that turn products into coveted collectibles.",
      icon: <FiLayers className="text-rose-500" />,
      tag: "Packaging & Print"
    },
    {
      title: "Thumb-Stopping Digital & Social Creatives",
      description: "Designing high-engagement Instagram carousels, marketing visual suites, and dynamic UI elements in Figma.",
      icon: <FiFeather className="text-purple-500" />,
      tag: "Digital & Social"
    }
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFF0F5] transition-colors duration-500 overflow-hidden"
    >
      {/* Ambient background pastel accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <HiSparkles className="w-4 h-4 text-pink-500" />
            <span>{t.sectionBadge || "ABOUT AYA"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Designing with"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
              {t.sectionTitleHighlight || "Heart & Vision"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "Blending strategic thinking with delicate aesthetic sensibilities to create visual identities that truly stand out."}
          </p>
        </div>

        {/* 3 Design Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {designPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-7 border border-pink-200/80 shadow-md shadow-pink-500/5 hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200/70 flex items-center justify-center text-xl shadow-inner">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#2d1b30] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-pink-100 flex items-center gap-1.5 text-xs font-semibold text-pink-600">
                <FiCheckCircle />
                <span>{language === "ar" ? "معايير تصميمية رفيعة" : "High Craft Standard"}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bio Story & Personal Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story / Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-pink-500/10 bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 group">
              <Image
                src="/aya-playing-cat.png"
                alt="Aya Adel playing with cat in Ismailia studio"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent pointer-events-none"></div>

              {/* Floating Label */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-pink-200 shadow-lg text-center">
                <p className="text-xs font-mono uppercase tracking-wider text-pink-600 font-semibold flex items-center justify-center gap-1.5">
                  <span>{language === "ar" ? "أستوديو آية عادل • الإسماعيلية" : "Aya Adel Studio • Ismailia"}</span>
                  <HiSparkles className="w-3.5 h-3.5 text-pink-500" />
                </p>
                <p className="text-sm font-bold text-[#2d1b30] mt-0.5 flex items-center justify-center gap-1.5">
                  <span>{language === "ar" ? "بيئة العمل المليئة بالشغف ورفقة القطط" : "Where Branding & Furry Inspiration Meet"}</span>
                  <FaPaw className="w-3.5 h-3.5 text-pink-500" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>{t.bio1}</p>
              <p>{t.bio2}</p>
              <p>{t.bio3}</p>
            </div>

            {/* Quick Details Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <div className="bg-white/80 p-3.5 rounded-2xl border border-pink-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-gray-400 uppercase">{t.location || "Location"}</p>
                  <p className="text-xs font-bold text-[#2d1b30]">{t.locationVal || "Ismailia, Egypt / Global"}</p>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-2xl border border-pink-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <FiBookOpen />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-gray-400 uppercase">{t.degree || "Education"}</p>
                  <p className="text-xs font-bold text-[#2d1b30]">{t.degreeVal || "B.A. Applied Arts"}</p>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-2xl border border-pink-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <FiMail />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-gray-400 uppercase">{t.email || "Email"}</p>
                  <p className="text-xs font-bold text-[#2d1b30]">{profile.email || "aya.adel.creatives@gmail.com"}</p>
                </div>
              </div>

              <div className="bg-white/80 p-3.5 rounded-2xl border border-pink-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <FiAward />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-gray-400 uppercase">{t.status || "Status"}</p>
                  <p className="text-xs font-bold text-[#2d1b30]">{t.statusVal || "Accepting Projects"}</p>
                </div>
              </div>
            </div>

            {/* Creative Tools Icon Row */}
            <div className="pt-4 border-t border-pink-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-pink-700 font-semibold uppercase">
                  {language === "ar" ? "برامج التصميم:" : "Primary Tools:"}
                </span>
                <div className="flex items-center gap-2 font-mono font-bold text-xs">
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-700 border border-amber-300 rounded-lg hover:scale-105 transition-transform" title="Adobe Illustrator">Ai</span>
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-700 border border-blue-300 rounded-lg hover:scale-105 transition-transform" title="Adobe Photoshop">Ps</span>
                  <span className="px-2.5 py-1 bg-fuchsia-500/10 text-fuchsia-700 border border-fuchsia-300 rounded-lg hover:scale-105 transition-transform" title="Adobe InDesign">Id</span>
                  <span className="p-1.5 bg-purple-500/10 text-purple-700 border border-purple-300 rounded-lg hover:scale-105 transition-transform flex items-center" title="Figma">
                    <SiFigma className="text-sm" />
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-700 border border-indigo-300 rounded-lg hover:scale-105 transition-transform" title="After Effects">Ae</span>
                </div>
              </div>

              <Link
                href="#contact"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-semibold hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-500/20 transition-all duration-200"
              >
                {t.hireMe || "Start a Project"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
