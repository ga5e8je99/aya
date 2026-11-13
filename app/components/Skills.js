"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiStar,
  FiPenTool,
  FiLayers,
  FiLayout,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { SiFigma } from "react-icons/si";
import { INITIAL_SKILLS } from "@/lib/siteData";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";

export default function SkillsSection() {
  const { dict, language } = useLanguage();
  const { skills } = useSiteData();
  const activeSkills = skills && skills.length > 0 ? skills : INITIAL_SKILLS;
  const t = dict?.skills || {};
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { key: "all", label: t.all || "All Skills", icon: <HiSparkles /> },
    { key: "tools", label: t.tools || "Creative Suite", icon: <FiPenTool /> },
    { key: "branding", label: t.branding || "Brand & Print", icon: <FiLayers /> },
    { key: "digital", label: t.digital || "Digital & UI", icon: <FiLayout /> },
  ];

  const filteredSkills = activeSkills.filter((skill) => {
    if (activeTab === "all") return true;
    return skill.category === activeTab;
  });

  const getSkillIcon = (name) => {
    if (name.includes("Illustrator")) return <span className="font-bold text-sm text-amber-600 font-mono">Ai</span>;
    if (name.includes("Photoshop")) return <span className="font-bold text-sm text-blue-600 font-mono">Ps</span>;
    if (name.includes("InDesign")) return <span className="font-bold text-sm text-fuchsia-600 font-mono">Id</span>;
    if (name.includes("Figma")) return <SiFigma className="text-purple-600 text-lg" />;
    if (name.includes("After Effects")) return <span className="font-bold text-sm text-indigo-600 font-mono">Ae</span>;
    if (name.includes("Packaging")) return <FiLayers className="text-rose-500 text-lg" />;
    if (name.includes("Typography")) return <FiPenTool className="text-pink-500 text-lg" />;
    return <FiStar className="text-pink-500 text-lg" />;
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FAF5FF] transition-colors duration-500 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-purple-200 text-purple-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <span>🎨</span>
            <span>{t.sectionBadge || "CREATIVE ARSENAL"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Tools &"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
              {t.sectionTitleHighlight || "Expertise"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "The specialized software, craft methodologies, and design disciplines I rely on every day to deliver world-class aesthetics."}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs ${activeTab === cat.key
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20 scale-105"
                  : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-purple-100"
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100/90 shadow-md shadow-purple-500/5 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl shadow-inner">
                      {getSkillIcon(skill.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2d1b30] text-base">
                        {skill.name}
                      </h3>
                      <p className="text-[11px] font-mono text-gray-500">
                        {skill.experience}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${skill.badgeColor}`}>
                    {skill.tier}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span>{t.level || "Proficiency"}</span>
                    <span className="text-pink-600 font-mono">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden border border-purple-100/60">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Highlight Tags */}
                <p className="text-xs text-gray-600 leading-relaxed bg-purple-50/40 p-3 rounded-xl border border-purple-100/50">
                  {skill.highlight}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-100/60 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1 text-pink-600 font-medium">
                  <FiCheckCircle />
                  <span>{language === "ar" ? "جاهز للإنتاج" : "Production Ready"}</span>
                </span>
                <span className="font-mono text-gray-400">#design</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
