"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUploadCloud,
  FiFileText,
  FiCheck
} from "react-icons/fi";
import { FaBehance, FaDribbble, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export default function ProfileTab({ profile = {}, onSave }) {
  const [formData, setFormData] = useState({ ...profile });
  const [uploading, setUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (network, value) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...(prev.socials || {}),
        [network]: value
      }
    }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      if (result.success && result.url) {
        handleChange(field, result.url);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ profile: formData });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2d1b30]">Studio Profile & Bio</h2>
          <p className="text-xs text-gray-500">
            Control Aya Adel&apos;s identity, bilingual bio copy, contact information, and studio statistics.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-500/20 transition-all flex items-center gap-2"
        >
          {savedSuccess ? <FiCheck className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
          <span>{savedSuccess ? "Saved Successfully!" : "Save Changes"}</span>
        </button>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Basic Details & Contact (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
              <FiUser />
              <span>Designer Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name (English)</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">الاسم الكامل (العربية)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.nameAr || ""}
                  onChange={(e) => handleChange("nameAr", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Professional Title (EN)</label>
                <input
                  type="text"
                  value={formData.roleTitle || ""}
                  onChange={(e) => handleChange("roleTitle", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">المسمى المهني (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.roleTitleAr || ""}
                  onChange={(e) => handleChange("roleTitleAr", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Core Focus</label>
                <input
                  type="text"
                  value={formData.subtitle || ""}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact & Location Card */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
              <FiMapPin />
              <span>Contact & Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Location (English)</label>
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">الموقع (العربية)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.locationAr || ""}
                  onChange={(e) => handleChange("locationAr", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="text"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Resume / CV Download URL</label>
                <input
                  type="text"
                  value={formData.resumeUrl || ""}
                  onChange={(e) => handleChange("resumeUrl", e.target.value)}
                  placeholder="/Aya_Adel_Resume.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
              <FiFileText />
              <span>Bio Stories (Bilingual)</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Short Bio (English)</label>
                <textarea
                  rows={2}
                  value={formData.shortBio || ""}
                  onChange={(e) => handleChange("shortBio", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">النبذة المختصرة (العربية)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={formData.shortBioAr || ""}
                  onChange={(e) => handleChange("shortBioAr", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Numbers, Socials & Images (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Key Metric Counters */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700">Studio Metric Counters</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Years Exp</label>
                <input
                  type="text"
                  value={formData.yearsExperience || ""}
                  onChange={(e) => handleChange("yearsExperience", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-center font-bold text-pink-600 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Projects Done</label>
                <input
                  type="text"
                  value={formData.projectsCompleted || ""}
                  onChange={(e) => handleChange("projectsCompleted", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-center font-bold text-rose-600 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Client Love</label>
                <input
                  type="text"
                  value={formData.clientsSatisfied || ""}
                  onChange={(e) => handleChange("clientsSatisfied", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-center font-bold text-amber-600 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Furry Cats</label>
                <input
                  type="text"
                  value={formData.catsCount || "3"}
                  onChange={(e) => handleChange("catsCount", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-center font-bold text-purple-600 focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
              <FiGlobe />
              <span>Design Portfolios & Socials</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-600"><FaBehance className="w-4 h-4" /></span>
                <input
                  type="url"
                  placeholder="https://behance.net/..."
                  value={formData.socials?.behance || ""}
                  onChange={(e) => handleSocialChange("behance", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-pink-50 text-pink-600"><FaDribbble className="w-4 h-4" /></span>
                <input
                  type="url"
                  placeholder="https://dribbble.com/..."
                  value={formData.socials?.dribbble || ""}
                  onChange={(e) => handleSocialChange("dribbble", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-rose-50 text-rose-600"><FaInstagram className="w-4 h-4" /></span>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={formData.socials?.instagram || ""}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-700"><FaLinkedin className="w-4 h-4" /></span>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.socials?.linkedin || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><FaWhatsapp className="w-4 h-4" /></span>
                <input
                  type="text"
                  placeholder="https://wa.me/..."
                  value={formData.socials?.whatsapp || ""}
                  onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Images Manager */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
              <FiUploadCloud />
              <span>Studio Visuals & Images</span>
            </h3>

            <div className="space-y-4">
              {/* Hero Image */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-pink-200 shrink-0">
                  <Image
                    src={formData.profileImage || "/aya-adel.png"}
                    alt="Aya Adel Hero"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2d1b30]">Hero Portrait Image</p>
                  <p className="text-[10px] text-gray-500 font-mono truncate">{formData.profileImage || "/aya-adel.png"}</p>
                  <label className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700 cursor-pointer">
                    <FiUploadCloud />
                    <span>Upload New</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "profileImage")}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              {/* About Playing Cat Image */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-pink-200 shrink-0">
                  <Image
                    src={formData.aboutImage || "/aya-playing-cat.png"}
                    alt="Aya Playing with Cat"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2d1b30]">About Section Card Image</p>
                  <p className="text-[10px] text-gray-500 font-mono truncate">{formData.aboutImage || "/aya-playing-cat.png"}</p>
                  <label className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700 cursor-pointer">
                    <FiUploadCloud />
                    <span>Upload New</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "aboutImage")}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

