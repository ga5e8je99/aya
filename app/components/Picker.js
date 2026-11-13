"use client";

import * as React from "react";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiArrowLeft,
  FiHeart
} from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { FaPaw, FaPalette } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { useSiteData } from "@/lib/useSiteData";
import { useLanguage } from "@/lib/LanguageContext";

const PRESET_TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "07:00 PM",
  "08:30 PM"
];

export default function Picker({ openProp, onClose }) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const { profile, addAppointment } = useSiteData();
  const { dict, isRTL, language } = useLanguage();
  const t = dict?.picker || {};

  // Calendar State
  const [currentMonth, setCurrentMonth] = React.useState(dayjs());
  const [selectedDay, setSelectedDay] = React.useState(dayjs().add(1, "day"));
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState("02:30 PM");

  // Mobile step state (1: Pick date/time, 2: Enter info)
  const [mobileStep, setMobileStep] = React.useState(1);

  // Booking Form State
  const [clientData, setClientData] = React.useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    service: "Brand Identity & Logo Design"
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const isOpen = Boolean(openProp) || internalOpen;

  const handleOpen = () => {
    setInternalOpen(true);
    setMobileStep(1);
  };

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setMobileStep(1);
      setErrorMsg("");
      setClientData({
        name: "",
        phone: "",
        email: "",
        notes: "",
        service: "Brand Identity & Logo Design"
      });
    }, 300);
  };

  // Month Navigation
  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // Generate Calendar Days Grid
  const generateCalendarDays = () => {
    const startOfMonth = currentMonth.startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const startDayOfWeek = startOfMonth.day(); // 0 = Sunday

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(currentMonth.date(d));
    }
    return days;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const fullFormattedDate = `${selectedDay.format("dddd, MMMM D, YYYY")} at ${selectedTimeSlot}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientData.name || !clientData.phone) {
      setErrorMsg(isRTL ? "يرجى كتابة الاسم ورقم الهاتف / الواتساب" : "Please enter your name and phone number");
      return;
    }

    setErrorMsg("");

    addAppointment({
      ...clientData,
      date: selectedDay.format("YYYY-MM-DD"),
      time: selectedTimeSlot,
      formattedDisplay: fullFormattedDate
    });

    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const nameStr = clientData.name ? `\n• Name: ${clientData.name}` : "";
    const phoneStr = clientData.phone ? `\n• Phone: ${clientData.phone}` : "";
    const serviceStr = clientData.service ? `\n• Service: ${clientData.service}` : "";
    const notesStr = clientData.notes ? `\n• Notes: ${clientData.notes}` : "";

    const whatsappNum = (profile?.whatsapp || "201023456789").replace(/[^0-9]/g, "");
    const message = `Hello Aya! I would like to schedule a creative design discovery call:\n• Date: ${fullFormattedDate}${nameStr}${phoneStr}${serviceStr}${notesStr}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, "_blank");
  };

  const today = dayjs();

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 sm:bottom-6 right-6 z-30 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white p-4 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 group border-2 border-white cursor-pointer"
          aria-label="Open date and time picker"
          title="Schedule a Design Discovery Call"
        >
          <div className="relative">
            <FiCalendar className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-300 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-200 rounded-full" />
          </div>
        </button>
      )}

      {/* Modal Dialog */}
      <Dialog
        open={Boolean(isOpen)}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
            backgroundImage:
              "radial-gradient(at 0% 0%, rgba(244, 114, 182, 0.1) 0, transparent 60%)",
            color: "#2d1b30",
            borderRadius: "28px",
            border: "1px solid rgba(244, 114, 182, 0.35)",
            boxShadow: "0 25px 60px -15px rgba(236, 72, 153, 0.25)",
            overflow: "hidden",
            margin: { xs: "8px", sm: "16px" },
            maxHeight: "94vh"
          }
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100 bg-pink-50/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white border border-pink-200 text-pink-600 shadow-xs">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2d1b30] flex items-center gap-2">
                {t.title || "Schedule a Creative Discovery Call"}
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-100 text-pink-700 border border-pink-200">
                  {isRTL ? "مكالمة استشارية مجانية" : "Free 30-Min Call"}
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                {t.subtitle || "Pick an available date and time for a friendly project discussion with Aya Adel."}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-pink-100 border border-pink-200 text-gray-500 hover:text-pink-600 flex items-center justify-center transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isSubmitted ? (
            /* Success confirmation */
            <div className="py-12 px-4 text-center space-y-5 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto text-3xl shadow-inner animate-bounce">
                <HiSparkles className="w-10 h-10 text-pink-500" />
              </div>

              <h4 className="text-2xl font-bold text-[#2d1b30]">
                {t.successTitle || "Appointment Confirmed!"}
              </h4>

              <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200/80 text-xs text-gray-700 space-y-1.5 text-center">
                <p className="font-semibold text-pink-900">{fullFormattedDate}</p>
                <p className="flex items-center justify-center gap-1.5">
                  <FiUser className="text-pink-500" />
                  <span>{clientData.name} ({clientData.phone})</span>
                </p>
                {clientData.service && (
                  <p className="flex items-center justify-center gap-1.5">
                    <FaPalette className="text-pink-500" />
                    <span>{clientData.service}</span>
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {t.successDesc || "Aya will review your project details and send over the Google Meet link shortly."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <SiWhatsapp className="text-base" />
                  <span>{isRTL ? "تأكيد فوري عبر واتساب" : "Confirm via WhatsApp"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-6 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold text-xs transition-colors"
                >
                  {t.close || "Close"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Calendar & Time Slots */}
              <div className="lg:col-span-7 space-y-6">
                {/* Month Navigator */}
                <div className="flex items-center justify-between bg-pink-50/60 p-3 rounded-2xl border border-pink-100">
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={currentMonth.isSame(today, "month")}
                    className="p-2 rounded-xl bg-white text-gray-700 hover:bg-pink-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>

                  <h4 className="text-base font-bold text-[#2d1b30]">
                    {currentMonth.format("MMMM YYYY")}
                  </h4>

                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-2 rounded-xl bg-white text-gray-700 hover:bg-pink-100 transition-colors shadow-xs"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-pink-600 uppercase font-mono">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {generateCalendarDays().map((day, idx) => {
                    if (!day) {
                      return <div key={`empty-${idx}`} className="h-10 sm:h-12" />;
                    }

                    const isPast = day.isBefore(today, "day");
                    const isSelected = selectedDay && day.isSame(selectedDay, "day");
                    const isToday = day.isSame(today, "day");

                    return (
                      <button
                        key={day.format("YYYY-MM-DD")}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDay(day)}
                        className={`h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
                          isSelected
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105"
                            : isPast
                            ? "text-gray-300 cursor-not-allowed"
                            : "bg-pink-50/40 hover:bg-pink-100/70 text-gray-700 border border-pink-100/60"
                        }`}
                      >
                        <span>{day.date()}</span>
                        {isToday && !isSelected && (
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Preset Time Slots */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                    <FiClock className="text-pink-500" />
                    <span>{t.selectTime || "Select Time Slot (Cairo Time / GMT+2)"}</span>
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-pink-500 text-white shadow-sm shadow-pink-500/25"
                              : "bg-pink-50/50 hover:bg-pink-100 text-gray-700 border border-pink-100"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Client Information Form */}
              <div className="lg:col-span-5 bg-pink-50/40 p-6 rounded-3xl border border-pink-100 flex flex-col justify-between space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="bg-white p-3.5 rounded-2xl border border-pink-200/80">
                    <p className="text-[11px] font-mono text-gray-400 uppercase">Selected Slot:</p>
                    <p className="text-xs font-bold text-pink-700 mt-0.5 flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>{fullFormattedDate}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.name || "Your Full Name"} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={clientData.name}
                      onChange={handleInputChange}
                      placeholder={language === "ar" ? "اسمك الكريم" : "Aya or Business Name"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.phone || "Phone / WhatsApp Number"} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={clientData.phone}
                      onChange={handleInputChange}
                      placeholder="+20 10..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.email || "Email Address"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={clientData.email}
                      onChange={handleInputChange}
                      placeholder="client@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Design Service of Interest
                    </label>
                    <select
                      name="service"
                      value={clientData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                    >
                      <option value="Brand Identity & Logo Design">Brand Identity & Logo Design</option>
                      <option value="Packaging & Product Label Design">Packaging & Product Label Design</option>
                      <option value="Social Media & Ad Creatives">Social Media & Ad Creatives</option>
                      <option value="Editorial & Publication Layout">Editorial & Publication Layout</option>
                      <option value="UI/UX & Digital Visual Design">UI/UX & Digital Visual Design</option>
                      <option value="Custom Mascot & Illustration">Custom Mascot & Illustration (Cats!)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.notes || "Brief Project Notes"}
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={clientData.notes}
                      onChange={handleInputChange}
                      placeholder={language === "ar" ? "نبذة سريعة عن علامتك التجارية..." : "A quick sentence about your brand vision..."}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
                  )}

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{t.confirmBtn || "Confirm Discovery Call"}</span>
                      <FaPaw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <SiWhatsapp />
                      <span>{isRTL ? "أو حجز عبر واتساب فوراً" : "Or Book Instantly on WhatsApp"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}
