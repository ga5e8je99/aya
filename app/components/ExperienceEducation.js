"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiDownload,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { HiSparkles, HiTrophy } from "react-icons/hi2";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExperienceEducation() {
  const { dict, language } = useLanguage();
  const t = dict?.experience || {};
  const [activeTab, setActiveTab] = useState("experience");

  const experienceData = language === "ar" ? [
    {
      role: "مصممة جرافيك وهويات أولى (Senior Brand Designer)",
      company: "وكالة كرييتف جلو (Creative Glow Studio)",
      period: "2022 – حتى الآن",
      location: "الإسماعيلية / عمل عن بُعد",
      description: "قيادة وتطوير الهويات البصرية للعلامات التجارية الفاخرة، والإشراف الفني على تصاميم التغليف، وتوجيه فريق المصممين المبتدئين.",
      achievements: [
        "إطلاق هويات بصرية لأكثر من 25 علامة تجارية في الخليج ومصر وأوروبا.",
        "تحقيق زيادة بنسبة 45% في مبيعات منتجات التجميل بفضل إعادة تصميم العبوات.",
        "تأسيس مكتبة قوالب ديجيتال وسوشيال ميديا متكاملة للعملاء."
      ]
    },
    {
      role: "مصممة تغليف ومطبوعات (Packaging & Print Specialist)",
      company: "أستوديو باستيل للتصميم (Studio Pastel)",
      period: "2020 – 2022",
      location: "الإسماعيلية / مصر",
      description: "تصميم قوالب العبوات، والعلب الكرتونية الفاخرة، والتحضير للطباعة الأوفست والديجيتال بدقة متناهية.",
      achievements: [
        "تصميم داي-لاين لأكثر من 40 منتج غذائي ومستحضر تجميلي.",
        "الإشراف المباشر على المطابع ومطابقة ألوان بانتون (Pantone matching).",
        "تقليل أخطاء الطباعة بنسبة 90% عبر فحص ملفات Pre-Press الدقيق."
      ]
    },
    {
      role: "مصممة بصرية ورسامة رقمية (Visual Designer & Illustrator)",
      company: "عمل حر (Freelance Global)",
      period: "2018 – 2020",
      location: "عالمي / منصات التصميم",
      description: "تنفيذ مشاريع رسم رقمي، تصميم بوسترات فنية، وتطوير هويات بصرية مبهجة لأصحاب المشاريع الصغيرة والناشئة.",
      achievements: [
        "رسم أكثر من 100 شخصية وماسكوت رقمي (خصوصاً القطط والحيوانات اللطيفة!).",
        "تقييم 5 نجوم على منصات العمل الحر العالمية مع رضا عملاء 100%."
      ]
    }
  ] : [
    {
      role: "Senior Graphic & Brand Designer",
      company: "Creative Glow Studio",
      period: "2022 – Present",
      location: "Ismailia / Remote Worldwide",
      description: "Leading creative direction for luxury lifestyle brands, directing packaging die-lines, and crafting end-to-end brand identity manuals.",
      achievements: [
        "Delivered full identity systems for 25+ boutique brands across Europe & MENA.",
        "Achieved a 45% increase in product sales through packaging redesigns.",
        "Developed modular brand systems and Figma component guidelines for client teams."
      ]
    },
    {
      role: "Packaging & Print Specialist",
      company: "Studio Pastel Design",
      period: "2020 – 2022",
      location: "Ismailia, Egypt",
      description: "Specialized in luxury packaging die-lines, foil stamping registrations, and flawless CMYK pre-press production files.",
      achievements: [
        "Engineered packaging die-lines for 40+ cosmetic and gourmet food products.",
        "Conducted press checks and Pantone color verification with premium print houses.",
        "Reduced pre-press rejection rate by 90% via standardized verification checklists."
      ]
    },
    {
      role: "Visual Designer & Digital Illustrator",
      company: "Freelance Creative",
      period: "2018 – 2020",
      location: "Global Clients",
      description: "Created bespoke digital illustrations, brand mascots (especially cute cats!), custom stickers, and vibrant social media visual packs.",
      achievements: [
        "Illustrated 100+ whimsical characters and mascots for international clients.",
        "Maintained a 100% 5-star client satisfaction rating on freelance platforms."
      ]
    }
  ];

  const educationData = language === "ar" ? [
    {
      degree: "بكالوريوس الفنون التطبيقية والتصميم البصري",
      institution: "جامعة حلوان – كلية الفنون التطبيقية",
      period: "2015 – 2020",
      location: "الإسماعيلية / مصر",
      description: "دراسة أكاديمية متعمقة في نظريات الألوان، الخط العربي واللاتيني، الطباعة اليدوية والصناعية، والتصميم الإعلاني بمرتبة الشرف.",
      badge: "مرتبة الشرف الأولى"
    }
  ] : [
    {
      degree: "B.A. in Applied Arts & Visual Communication",
      institution: "Faculty of Applied Arts, Helwan University",
      period: "2015 – 2020",
      location: "Ismailia, Egypt",
      description: "In-depth academic training in color theory, Arabic & Latin typography, industrial print reproduction, and advertising design with First Class Honors.",
      badge: "First Class Honors"
    }
  ];

  const certificationsData = language === "ar" ? [
    {
      title: "محترف أدوبي المعتمد (Adobe Certified Professional)",
      issuer: "Adobe Inc.",
      period: "2023",
      description: "شهادة اعتماد دولية في برنامجي Adobe Illustrator و Adobe InDesign."
    },
    {
      title: "دبلومة تناغم وأبحاث ألوان بانتون المتقدمة (Pantone Color Masterclass)",
      issuer: "Pantone Color Institute",
      period: "2022",
      description: "إتقان نظريات تناسق الألوان وسيكولوجية الألوان وتطبيقاتها في العلامات التجارية."
    },
    {
      title: "التايبوغرافي وتصميم الحروف العربية المعاصرة (Arabic Typography Workshop)",
      issuer: "Arabic Type Design Lab",
      period: "2021",
      description: "تصميم الخطوط الطباعية والشعارات اللفظية المتوازنة بصرياً."
    }
  ] : [
    {
      title: "Adobe Certified Professional (Illustrator & InDesign)",
      issuer: "Adobe Inc.",
      period: "2023",
      description: "Official credential in advanced vector illustration and publishing production."
    },
    {
      title: "Pantone Color Masterclass & Color Psychology",
      issuer: "Pantone Color Institute",
      period: "2022",
      description: "Advanced mastery in color harmonies, CMYK/spot conversions, and luxury brand psychology."
    },
    {
      title: "Contemporary Arabic & Latin Typography Intensive",
      issuer: "Arabic Type Design Lab",
      period: "2021",
      description: "Specialized study in bilingual type pairing, custom ligatures, and logotype lettering."
    }
  ];

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFF7ED] transition-colors duration-500 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <HiSparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.sectionBadge || "CREATIVE JOURNEY"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Experience &"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-pink-500 to-rose-500">
              {t.sectionTitleHighlight || "Education"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "My path from passionate illustrator to leading senior visual designer and studio founder."}
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            <button
              type="button"
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "experience"
                  ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-pink-500/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-pink-50 border border-amber-200"
              }`}
            >
              <FiBriefcase />
              <span>{t.tabExperience || "Work Experience"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-pink-500/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-pink-50 border border-amber-200"
              }`}
            >
              <FiBookOpen />
              <span>{t.tabEducation || "Education"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("certifications")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "certifications"
                  ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-pink-500/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-pink-50 border border-amber-200"
              }`}
            >
              <FiAward />
              <span>{t.tabCertifications || "Certifications"}</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          {activeTab === "experience" &&
            experienceData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-7 border border-amber-200/80 shadow-md shadow-amber-500/5 hover:border-pink-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-[#2d1b30]">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 w-fit">
                    {item.period}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-amber-700 mb-4">
                  <span>{item.company}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-amber-100">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-gray-600">
                      <FiCheckCircle className="text-pink-500 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

          {activeTab === "education" &&
            educationData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-7 border border-amber-200/80 shadow-md hover:border-pink-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-[#2d1b30]">
                    {item.degree}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 w-fit">
                    {item.period}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-amber-700 mb-4">
                  <span>{item.institution}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-amber-100 flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1.5">
                    <HiTrophy className="text-amber-600" />
                    <span>{item.badge}</span>
                  </span>
                </div>
              </motion.div>
            ))}

          {activeTab === "certifications" &&
            certificationsData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-amber-200/80 shadow-md hover:border-pink-300 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#2d1b30]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-700">
                    {item.issuer}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-pink-600 shrink-0 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-200">
                  {item.period}
                </span>
              </motion.div>
            ))}
        </div>

        {/* Download CV CTA Box */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 via-white to-amber-50 rounded-3xl p-8 border border-pink-200 shadow-lg text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#2d1b30]">
            {t.downloadCtaTitle || "Want to Review My Full Design CV?"}
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            {t.downloadCtaDesc ||
              "Download my complete resume with detailed client case studies, brand audits, and typography credentials."}
          </p>
          <a
            href="/Aya_Adel_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <FiDownload />
            <span>{t.downloadCtaBtn || "Download Resume (PDF)"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
