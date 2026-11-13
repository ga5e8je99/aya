"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Picker from "./Picker";
import AyaLogo from "./AyaLogo";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiFileText,
  FiCheckCircle,
  FiCalendar,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { FaWhatsapp, FaBehance, FaDribbble } from "react-icons/fa6";
import { HiEnvelope, HiChatBubbleLeftRight, HiSparkles } from "react-icons/hi2";

export default function ContactSection() {
  const { profile, addMessage } = useSiteData();
  const { dict, isRTL, language } = useLanguage();
  const t = dict?.contact || {};

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FFF1F2] transition-colors duration-500 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <HiEnvelope className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.sectionBadge || "GET IN TOUCH"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1b30] tracking-tight">
            <span>{t.sectionTitle || "Let's Create"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
              {t.sectionTitleHighlight || "Something Beautiful"}
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t.sectionSubtitle ||
              "Have a new brand to launch, packaging to redesign, or just want to talk aesthetics? Reach out!"}
          </p>

          {/* Quick Schedule Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-rose-50 border-2 border-rose-200 text-rose-700 font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FiCalendar className="text-rose-500" />
              <span>{t.scheduleMeeting || "Book a 1-on-1 Discovery Call"}</span>
            </button>
          </div>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 border border-rose-200/80 shadow-md space-y-5">
              <div className="pb-3 border-b border-rose-100">
                <AyaLogo size={46} showText={true} isLink={false} />
              </div>
              <h3 className="text-xl font-bold text-[#2d1b30]">
                {language === "ar" ? "معلومات التواصل المباشر" : "Direct Contact Details"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === "ar"
                  ? "أرحب دائماً بالرسائل والاستفسارات سواء عبر البريد الإلكتروني أو محادثة سريعة على الواتساب."
                  : "I'm always excited to hear about new creative ventures, collaborations, and design ideas."}
              </p>

              {/* Contact items */}
              <div className="space-y-3 pt-2">
                {/* Email */}
                <div
                  onClick={() => handleCopy(profile.email || "aya.adel.creatives@gmail.com", "email")}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-rose-50/60 hover:bg-rose-100/60 transition-colors cursor-pointer border border-rose-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-xs">
                    <FiMail />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-gray-500 uppercase">{t.emailDirect || "Email"}</p>
                    <p className="text-xs font-bold text-[#2d1b30] truncate">
                      {profile.email || "aya.adel.creatives@gmail.com"}
                    </p>
                  </div>
                  {copiedKey === "email" && (
                    <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                  )}
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${(profile.whatsapp || "201023456789").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors border border-emerald-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs">
                    <FaWhatsapp className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-gray-500 uppercase">{t.directChat || "WhatsApp"}</p>
                    <p className="text-xs font-bold text-[#2d1b30] truncate">
                      {profile.phone || "+20 102 345 6789"}
                    </p>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span>Chat</span>
                    <HiChatBubbleLeftRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-rose-50/60 border border-rose-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-xs">
                    <FiMapPin />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-gray-500 uppercase">Studio</p>
                    <p className="text-xs font-bold text-[#2d1b30]">
                      {t.officeLocation || "Ismailia, Egypt / Worldwide Remote"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-rose-100">
                <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                  {language === "ar" ? "قنوات التصميم الإبداعي:" : "CREATIVE PORTFOLIOS:"}
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xs"
                    title="Behance"
                  >
                    <FaBehance />
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-xs"
                    title="Dribbble"
                  >
                    <FaDribbble />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xs"
                    title="Instagram"
                  >
                    <FiInstagram />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                    title="LinkedIn"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-rose-200/90 shadow-xl shadow-rose-500/10">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto text-2xl">
                    <HiSparkles className="w-8 h-8 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d1b30]">
                    {t.successTitle || "Message Received with Love!"}
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    {t.successDesc ||
                      "Thank you for reaching out! Aya will review your inquiry and get back to you within 24 hours."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-pink-500 text-white font-semibold text-xs hover:bg-pink-600 transition-colors"
                  >
                    {language === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[#2d1b30] mb-2">
                    {language === "ar" ? "أرسل رسالة مباشرة إلى آية" : "Send Aya a Direct Message"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {t.nameLabel || "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === "ar" ? "اسمك الكريم" : "Your full name"}
                        className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200/80 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {t.emailLabel || "Email Address"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200/80 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t.subjectLabel || "Project Type / Subject"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={language === "ar" ? "مثال: تصميم هوية بصرية لعلامة تجارية" : "e.g. Brand Identity & Packaging Design"}
                      className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200/80 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t.messageLabel || "Your Message"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === "ar" ? "أخبريني بتفاصيل وأهداف مشروعك..." : "Tell me about your brand, timeline, and goals..."}
                      className="w-full px-4 py-3 rounded-2xl bg-rose-50/50 border border-rose-200/80 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <FiSend />
                    <span>{isSubmitting ? (t.sending || "Sending...") : (t.sendBtn || "Send Message")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Picker
        openProp={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </section>
  );
}
