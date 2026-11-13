"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowUpRight, FiLayers, FiEye, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";

export default function Portfolio() {
  const { projects } = useSiteData();
  const { dict, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const t = dict?.portfolio || {};

  const categories = [
    { key: "all", label: t.all || "All Works" },
    { key: "branding", label: t.branding || "Brand Identity" },
    { key: "packaging", label: t.packaging || "Packaging & Print" },
    { key: "social", label: t.social || "Social Media & Ads" },
    { key: "digital", label: t.digital || "UI/UX & Digital" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") return true;
    return (
      project.category?.toLowerCase() === selectedCategory ||
      project.technologies?.some((tech) =>
        tech.toLowerCase().includes(selectedCategory)
      )
    );
  });

  return (
    <section
      id="portfolio"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FDF2F8] transition-colors duration-500 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <HiSparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>{t.sectionBadge || "SELECTED WORKS"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Featured"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
              {t.sectionTitleHighlight || "Design Projects"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "A curated collection of brand identities, packaging suites, and digital campaigns crafted with care."}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-105"
                    : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-pink-200/90 shadow-md shadow-pink-500/5 hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-pink-50">
                  <Image
                    src={project.image || "/projectImage/lumina.webp"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full">
                      <FiEye />
                      <span>{t.viewProject || "View Case Study"}</span>
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-pink-700 border border-pink-200/80 shadow-xs">
                    {project.category?.toUpperCase() || "DESIGN"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>{project.client}</span>
                    <span>{project.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2d1b30] group-hover:text-pink-600 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full border border-pink-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-[11px] font-medium bg-pink-50 text-pink-600 px-2 py-1 rounded-full border border-pink-100">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/projects/${project.slug || project.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 text-pink-700 hover:text-white font-semibold text-xs transition-all duration-300 shadow-xs group-hover:shadow-md"
                >
                  <span>{t.viewProject || "View Full Case Study"}</span>
                  <FiArrowUpRight className="text-sm" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
