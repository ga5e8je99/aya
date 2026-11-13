"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiDownload, FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import AyaLogo from "./AyaLogo";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage, dict, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname?.startsWith("/projects") ? "portfolio" : "home"
  );

  useEffect(() => {
    if (pathname?.startsWith("/projects")) {
      setActiveSection("portfolio");
    }
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          if (pathname === "/") {
            const sections = [
              "home",
              "about",
              "skills",
              "co-designers",
              "portfolio",
              "services",
              "experience",
              "contact",
            ];
            const current = sections.find((section) => {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 140 && rect.bottom >= 140;
              }
              return false;
            });
            if (current) setActiveSection(current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: dict.nav.home, href: "/#home", section: "home" },
    { name: dict.nav.about, href: "/#about", section: "about" },
    { name: dict.nav.skills, href: "/#skills", section: "skills" },
    { name: dict.nav.coDesigners, href: "/#co-designers", section: "co-designers" },
    { name: dict.nav.portfolio, href: "/#portfolio", section: "portfolio" },
    { name: dict.nav.services, href: "/#services", section: "services" },
    { name: dict.nav.experience, href: "/#experience", section: "experience" },
    { name: dict.nav.contact, href: "/#contact", section: "contact" },
  ];

  const handleNavClick = (e, href, section) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/" && href.startsWith("/#")) {
      e.preventDefault();
      router.push(href);
      return;
    }

    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveSection(section);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-pink-200/70 shadow-sm shadow-pink-500/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Bespoke Aya Adel Logo */}
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, "/#home", "home")}
          >
            <AyaLogo size={42} showText={true} isLink={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-200/80 shadow-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <Link
                  key={link.section}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.section)}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-xs shadow-pink-500/25"
                      : "text-gray-700 hover:text-pink-600 hover:bg-pink-50/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all duration-200"
              title="Switch Language"
            >
              <FiGlobe className="text-sm" />
              <span>{dict.nav.langSwitch}</span>
            </button>

            {/* Download CV */}
            <a
              href="/Aya_Adel_Resume.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FiDownload className="text-sm" />
              <span>{dict.nav.downloadCv}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-xs font-semibold text-pink-700 bg-pink-50 border border-pink-200"
            >
              {language === "ar" ? "EN" : "عربي"}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50 border border-pink-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-pink-200 px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.section}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.section)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.section
                      ? "bg-pink-500 text-white"
                      : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-pink-100 flex gap-2">
              <a
                href="/Aya_Adel_Resume.pdf"
                download
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-500/20"
              >
                <FiDownload />
                <span>{dict.nav.downloadCv}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
