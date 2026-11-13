"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCalendar,
  FiArrowRight,
  FiArrowLeft,
  FiPackage,
  FiLayout,
  FiPenTool,
  FiShare2,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";
import { FaCat, FaPaw } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import Picker from "./Picker";
import { INITIAL_SERVICES } from "@/lib/siteData";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";

export default function Services() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { dict, language, isRTL } = useLanguage();
  const { services } = useSiteData();
  const activeServices = services && services.length > 0 ? services : INITIAL_SERVICES;
  const t = dict?.services || {};

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case "palette":
        return <FiPenTool className="text-xl" />;
      case "box":
        return <FiPackage className="text-xl" />;
      case "instagram":
        return <FiShare2 className="text-xl" />;
      case "book":
        return <FiBookOpen className="text-xl" />;
      case "layout":
        return <FiLayout className="text-xl" />;
      case "cat":
        return <FaCat className="text-xl text-amber-500" />;
      default:
        return <FiHeart className="text-xl" />;
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FAF5FF] transition-colors duration-500 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-purple-200 text-purple-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <HiSparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.sectionBadge || "WHAT I DO"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Tailored"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
              {t.sectionTitleHighlight || "Design Services"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "End-to-end creative solutions crafted to give your business a competitive aesthetic edge."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, index) => {
            const title = language === "ar" ? service.titleAr : service.title;
            const description = language === "ar" ? service.descriptionAr : service.description;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-purple-100/90 shadow-md shadow-purple-500/5 hover:border-pink-300 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200/80 flex items-center justify-center text-pink-600 mb-6 shadow-inner">
                    {getServiceIcon(service.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-[#2d1b30] mb-3 leading-snug">
                    {title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-4 border-t border-purple-100/80">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <FiCheckCircle className="text-pink-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Booking Button */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 text-pink-700 hover:text-white font-semibold text-xs transition-all duration-200 shadow-xs"
                  >
                    <span>{t.bookCall || "Book Consultation"}</span>
                    {isRTL ? <FiArrowLeft /> : <FiArrowRight />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl shadow-pink-500/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {language === "ar"
                ? "هل لديك فكرة أو علامة تجارية تود إطلاقها؟"
                : "Have a Custom Project in Mind?"}
            </h3>
            <p className="text-sm sm:text-base text-pink-100 leading-relaxed">
              {language === "ar"
                ? "احجز موعداً لمكالمة استكشافية سريعة مدتها 30 دقيقة لنناقش تفاصيل مشروعك وخطة التنفيذ."
                : "Schedule a friendly 30-minute discovery call to explore your brand goals and craft a bespoke proposal."}
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(true)}
                className="px-8 py-3.5 bg-white text-pink-700 hover:bg-pink-50 font-bold rounded-full text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>{t.bookCall || "Book Discovery Call"}</span>
                <FaPaw className="w-3.5 h-3.5 text-pink-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Picker Modal */}
      <Picker
        openProp={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
}
