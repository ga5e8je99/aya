"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsSection from "./components/Skills";
import CatCoDesigners from "./components/CatCoDesigners";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import ExperienceEducation from "./components/ExperienceEducation";
import ContactSection from "./components/Contact";
import WelcomeAnimation from "./components/WelcomeAnimation";
import Wave from "./components/Wave";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#FFF8FA] min-h-screen text-[#2d1b30] selection:bg-pink-200 selection:text-pink-900">
      {/* Intro Welcome Animation */}
      <AnimatePresence mode="wait">
        {loading && (
          <WelcomeAnimation
            key="welcome-intro"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Aesthetic Custom Cursor */}
      <CustomCursor />

      <main className="relative z-10">
        <Navbar />

        {/* 1. Hero Section (#FFF5F8) */}
        <Hero />

        {/* Wave: Hero (#FFF5F8) -> About (#FFF0F5) */}
        <Wave
          fill="#FFF0F5"
          stroke="rgba(244, 114, 182, 0.5)"
          className="bg-[#FFF5F8]"
        />

        {/* 2. About Section (#FFF0F5) */}
        <About />

        {/* Wave: About (#FFF0F5) -> Skills (#FAF5FF) */}
        <Wave
          fill="#FAF5FF"
          stroke="rgba(192, 132, 252, 0.5)"
          flip
          className="bg-[#FFF0F5]"
        />

        {/* 3. Skills Section (#FAF5FF) */}
        <SkillsSection />

        {/* Wave: Skills (#FAF5FF) -> Cat Co-Designers (#FFF7ED) */}
        <Wave
          fill="#FFF7ED"
          stroke="rgba(251, 146, 60, 0.5)"
          className="bg-[#FAF5FF]"
        />

        {/* 4. Furry Co-Designers (Milo, Oliver, Luna) (#FFF7ED) */}
        <CatCoDesigners />

        {/* Wave: Co-Designers (#FFF7ED) -> Portfolio (#FDF2F8) */}
        <Wave
          fill="#FDF2F8"
          stroke="rgba(236, 72, 153, 0.5)"
          flip
          className="bg-[#FFF7ED]"
        />

        {/* 5. Portfolio Section (#FDF2F8) */}
        <Portfolio />

        {/* Wave: Portfolio (#FDF2F8) -> Services (#FAF5FF) */}
        <Wave
          fill="#FAF5FF"
          stroke="rgba(168, 85, 247, 0.5)"
          className="bg-[#FDF2F8]"
        />

        {/* 6. Services Section (#FAF5FF) */}
        <Services />

        {/* Wave: Services (#FAF5FF) -> Experience (#FFF7ED) */}
        <Wave
          fill="#FFF7ED"
          stroke="rgba(251, 146, 60, 0.5)"
          flip
          className="bg-[#FAF5FF]"
        />

        {/* 7. Experience & Education Section (#FFF7ED) */}
        <ExperienceEducation />

        {/* Wave: Experience (#FFF7ED) -> Contact (#FFF1F2) */}
        <Wave
          fill="#FFF1F2"
          stroke="rgba(244, 63, 94, 0.5)"
          className="bg-[#FFF7ED]"
        />

        {/* 8. Contact Section (#FFF1F2) */}
        <ContactSection />
      </main>
    </div>
  );
}
