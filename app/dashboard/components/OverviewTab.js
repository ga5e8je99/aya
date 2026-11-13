"use client";

import {
  FiFolder,
  FiBriefcase,
  FiCheckCircle,
  FiCalendar,
  FiMail,
  FiArrowUpRight,
  FiPlus,
  FiClock,
  FiPhone
} from "react-icons/fi";
import { FaCat, FaPaw, FaWhatsapp } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function OverviewTab({ data, setActiveTab, onUpdateAppointmentStatus }) {
  const { profile = {}, projects = [], services = [], skills = [], appointments = [], messages = [] } = data;

  const pendingAppointments = appointments.filter((a) => a.status === "Pending");
  const unreadMessages = messages.filter((m) => !m.read);
  const totalSkillsCount = Array.isArray(skills)
    ? (skills[0]?.items ? skills.reduce((acc, cat) => acc + (cat.items?.length || 0), 0) : skills.length)
    : 0;

  const statsCards = [
    {
      label: "Portfolio Projects",
      val: projects.length,
      sub: "Active Case Studies",
      icon: <FiFolder className="w-5 h-5 text-pink-600" />,
      bg: "bg-pink-50 border-pink-200/80",
      tab: "projects"
    },
    {
      label: "Design Services",
      val: services.length,
      sub: "Tailored Offerings",
      icon: <FiBriefcase className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50 border-purple-200/80",
      tab: "services"
    },
    {
      label: "Design Tools & Skills",
      val: totalSkillsCount,
      sub: `${skills.length} Categories`,
      icon: <HiSparkles className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200/80",
      tab: "skills"
    },
    {
      label: "Discovery Calls",
      val: appointments.length,
      sub: `${pendingAppointments.length} Pending Review`,
      icon: <FiCalendar className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-200/80",
      badge: pendingAppointments.length > 0 ? `${pendingAppointments.length} New` : null,
      tab: "appointments"
    },
    {
      label: "Client Messages",
      val: messages.length,
      sub: `${unreadMessages.length} Unread`,
      icon: <FiMail className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50 border-rose-200/80",
      badge: unreadMessages.length > 0 ? `${unreadMessages.length} Unread` : null,
      tab: "messages"
    },
    {
      label: "Furry Co-Designers",
      val: data.coDesigners?.length || 3,
      sub: "Milo, Oliver, Luna",
      icon: <FaCat className="w-5 h-5 text-orange-600" />,
      bg: "bg-orange-50 border-orange-200/80",
      tab: "codesigners"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-500/15 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <FaPaw className="w-3 h-3" />
            <span>Welcome back, {profile.name || "Aya Adel"}!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Studio Content Command Center
          </h1>
          <p className="text-sm text-pink-100 leading-relaxed">
            Manage your graphic design case studies, client booking requests, creative services, and bilingual studio story in real-time.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className="px-4 py-2.5 bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <FiPlus className="w-4 h-4" />
            <span>New Project</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold text-xs rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5"
          >
            <span>Live Website</span>
            <FiArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className={`p-5 rounded-2xl border ${card.bg} shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-start justify-between`}
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-gray-500">{card.label}</p>
                {card.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-3xl font-black text-[#2d1b30] mt-2">{card.val}</p>
              <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-xs group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Grid: Recent Appointments & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Discovery Calls / Appointments */}
        <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-pink-50 rounded-xl text-pink-600">
                <FiCalendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[#2d1b30]">Recent Discovery Calls</h2>
                <p className="text-xs text-gray-400">Bookings via calendar picker</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("appointments")}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline"
            >
              View All ({appointments.length}) →
            </button>
          </div>

          {appointments.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No bookings received yet.</p>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="font-bold text-[#2d1b30] truncate">{apt.name}</p>
                    <p className="text-gray-500 font-mono text-[11px]">
                      {apt.date || "Upcoming"} • {apt.time || "TBD"}
                    </p>
                    {apt.service && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-white border border-pink-200 text-[10px] text-pink-700 font-medium">
                        {apt.service}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        apt.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : apt.status === "Completed"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {apt.status || "Pending"}
                    </span>
                    {apt.phone && (
                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <FaWhatsapp className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white rounded-3xl p-6 border border-pink-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                <FiMail className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[#2d1b30]">Contact Form Inquiries</h2>
                <p className="text-xs text-gray-400">Inbound project requests</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("messages")}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline"
            >
              View All ({messages.length}) →
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    !msg.read ? "bg-rose-50/70 border-rose-200" : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#2d1b30] flex items-center gap-1.5">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                      <span>{msg.name}</span>
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {msg.email}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-xs line-clamp-1">
                    {msg.subject || "Project Inquiry"}
                  </p>
                  <p className="text-gray-500 text-[11px] line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
