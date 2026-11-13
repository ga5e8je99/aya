"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import CustomCursor from "@/app/components/CustomCursor";
import { useLanguage } from "@/lib/LanguageContext";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiLayers,
  FiClock,
  FiShare2,
  FiCheck,
  FiPenTool,
  FiHeart
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { SiFigma } from "react-icons/si";
import { FaPalette, FaPaw } from "react-icons/fa6";

export default function ProjectDetailClient({ project, prevProject, nextProject }) {
  const [copied, setCopied] = useState(false);
  const { dict, isRTL, language } = useLanguage();
  const t = dict?.projectDetail || {};

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getTechIcon = (techName) => {
    const lower = String(techName).toLowerCase();
    if (lower.includes("figma")) return SiFigma;
    if (lower.includes("packaging")) return FiLayers;
    return FiPenTool;
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FFF8FA] text-[#2d1b30] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">{t.notFoundTitle || "Project Not Found"}</h1>
        <p className="text-gray-600 mb-8">{t.notFoundDesc || "The design project you are looking for does not exist."}</p>
        <Link
          href="/#portfolio"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          <FiArrowLeft className={isRTL ? "rotate-180" : ""} /> {t.backToProjects || "Back to Portfolio"}
        </Link>
      </div>
    );
  }

  const title = project.title;
  const tagline = project.tagline;
  const overview = project.overview || project.description;
  const problem = project.problem;
  const solution = project.solution;
  const role = project.role;
  const impact = project.impact;
  const features = project.features;

  return (
    <div className="min-h-screen bg-[#FFF8FA] text-[#2d1b30] transition-colors duration-500">
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-pink-100">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
          >
            {isRTL ? <FiArrowRight /> : <FiArrowLeft />}
            <span>{language === "ar" ? "العودة إلى معرض الأعمال" : "Back to All Projects"}</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 transition-colors shadow-xs"
          >
            {copied ? <FiCheck className="text-emerald-500" /> : <FiShare2 />}
            <span>{copied ? (language === "ar" ? "تم النسخ!" : "Link Copied!") : (language === "ar" ? "مشاركة الرابط" : "Share Case Study")}</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <FaPalette className="text-pink-500 w-3.5 h-3.5" />
            <span>{project.category || "BRAND DESIGN"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2d1b30] tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
            {tagline}
          </p>
        </div>

        {/* Project Showcase Banner */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border-2 border-pink-200 shadow-xl shadow-pink-500/10 mb-12 bg-pink-50">
          <Image
            src={project.image || "/projectImage/lumina.webp"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-pink-200/80 shadow-sm mb-12">
          <div>
            <p className="text-[11px] font-mono text-gray-400 uppercase">{language === "ar" ? "العميل" : "Client"}</p>
            <p className="text-sm font-bold text-[#2d1b30] mt-1">{project.client}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-gray-400 uppercase">{language === "ar" ? "المدة" : "Duration"}</p>
            <p className="text-sm font-bold text-[#2d1b30] mt-1">{project.duration}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-gray-400 uppercase">{language === "ar" ? "الدور الإبداعي" : "Role"}</p>
            <p className="text-sm font-bold text-[#2d1b30] mt-1">{language === "ar" ? "تصميم وتوجيه فني" : "Lead Designer"}</p>
          </div>
          <div>
            <p className="text-[11px] font-mono text-gray-400 uppercase">{language === "ar" ? "المساعدين" : "Co-Designers"}</p>
            <p className="text-sm font-bold text-pink-600 mt-1 flex items-center gap-1">
              <span>Milo, Oliver, Luna</span>
              <FaPaw className="text-pink-500 w-3 h-3" />
            </p>
          </div>
        </div>

        {/* Narrative & Case Study Content */}
        <div className="space-y-10">
          {/* Overview */}
          <div className="bg-white/80 p-8 rounded-3xl border border-pink-100 shadow-xs space-y-3">
            <h2 className="text-2xl font-bold text-[#2d1b30] flex items-center gap-2">
              <HiSparkles className="text-pink-500" />
              <span>{language === "ar" ? "نظرة عامة على المشروع" : "Project Overview"}</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">{overview}</p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50/50 p-7 rounded-3xl border border-rose-200/70 space-y-3">
              <h3 className="text-lg font-bold text-rose-900">
                {language === "ar" ? "التحدي التصميمي" : "The Creative Challenge"}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{problem}</p>
            </div>

            <div className="bg-pink-50/50 p-7 rounded-3xl border border-pink-200/70 space-y-3">
              <h3 className="text-lg font-bold text-pink-900">
                {language === "ar" ? "الحل البصري والاستراتيجي" : "The Visual Solution"}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{solution}</p>
            </div>
          </div>

          {/* Key Deliverables / Features */}
          {features && features.length > 0 && (
            <div className="bg-white/80 p-8 rounded-3xl border border-pink-100 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-[#2d1b30] flex items-center gap-2">
                <FiLayers className="text-pink-500" />
                <span>{language === "ar" ? "مخرجات ومحاور التصميم" : "Key Project Deliverables"}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100/70 space-y-1.5">
                    <h4 className="text-sm font-bold text-[#2d1b30] flex items-center gap-2">
                      <FiCheckCircle className="text-pink-500 shrink-0" />
                      <span>{feature.title}</span>
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed pl-6">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          {impact && (
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-3xl text-white shadow-xl shadow-pink-500/15 space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FiHeart />
                <span>{language === "ar" ? "الأثر والنتائج المحققة" : "Measurable Brand Impact"}</span>
              </h3>
              <p className="text-pink-50 leading-relaxed text-sm sm:text-base">{impact}</p>
            </div>
          )}

          {/* Tools Used */}
          <div className="p-6 bg-white rounded-3xl border border-pink-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase font-bold text-gray-500">
              {language === "ar" ? "البرامج والتقنيات المستخدمة:" : "Software & Disciplines:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-semibold"
                  >
                    <Icon className="text-sm" />
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-pink-200">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug || prevProject.id}`}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-800"
              >
                {isRTL ? <FiArrowRight /> : <FiArrowLeft />}
                <span>{prevProject.title}</span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug || nextProject.id}`}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-800"
              >
                <span>{nextProject.title}</span>
                {isRTL ? <FiArrowLeft /> : <FiArrowRight />}
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
}
