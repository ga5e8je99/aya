"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AyaLogo from "../components/AyaLogo";
import OverviewTab from "./components/OverviewTab";
import ProfileTab from "./components/ProfileTab";
import ProjectsTab from "./components/ProjectsTab";
import ServicesTab from "./components/ServicesTab";
import SkillsTab from "./components/SkillsTab";
import CoDesignersTab from "./components/CoDesignersTab";
import AppointmentsTab from "./components/AppointmentsTab";
import MessagesTab from "./components/MessagesTab";
import SettingsTab from "./components/SettingsTab";

import {
  FiGrid,
  FiUser,
  FiFolder,
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiMail,
  FiSettings,
  FiExternalLink,
  FiMenu,
  FiX,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { FaCat, FaPaw } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch initial site data
  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/data", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      showToast("error", "Failed to connect to site database");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Generic Domain Saver
  const handleSaveDomain = async (domainKey, updatedValue) => {
    try {
      // Optimistic update
      setData((prev) => ({ ...prev, [domainKey]: updatedValue }));

      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [domainKey]: updatedValue })
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", `${domainKey.charAt(0).toUpperCase() + domainKey.slice(1)} updated successfully!`);
      } else {
        throw new Error(result.error || "Save failed");
      }
    } catch (err) {
      showToast("error", err.message || "Failed to persist changes");
      fetchData(true);
    }
  };

  // Appointment Handlers
  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      setData((prev) => ({
        ...prev,
        appointments: (prev.appointments || []).map((a) => (a.id === id ? { ...a, status } : a))
      }));
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", `Booking marked as ${status}`);
      }
    } catch (err) {
      showToast("error", "Failed to update booking");
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      setData((prev) => ({
        ...prev,
        appointments: (prev.appointments || []).filter((a) => a.id !== id)
      }));
      await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
      showToast("success", "Appointment deleted");
    } catch (err) {
      showToast("error", "Failed to delete booking");
    }
  };

  const handleAddAppointment = async (newBooking) => {
    try {
      setData((prev) => ({
        ...prev,
        appointments: [newBooking, ...(prev.appointments || [])]
      }));
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
      });
      showToast("success", "New discovery call booked!");
    } catch (err) {
      showToast("error", "Failed to add appointment");
    }
  };

  // Message Handlers
  const handleToggleMessageRead = async (id, read) => {
    try {
      setData((prev) => ({
        ...prev,
        messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, read } : m))
      }));
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      setData((prev) => ({
        ...prev,
        messages: (prev.messages || []).filter((m) => m.id !== id)
      }));
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      showToast("success", "Message removed");
    } catch (err) {
      showToast("error", "Failed to delete message");
    }
  };

  // Restore Entire Database
  const handleRestoreAll = async (fullJson) => {
    try {
      setData(fullJson);
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullJson)
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Full website backup restored successfully!");
      }
    } catch (err) {
      showToast("error", "Failed to restore backup");
    }
  };

  // Pending and unread counts for navigation badges
  const pendingAppointmentsCount = (data?.appointments || []).filter((a) => a.status === "Pending").length;
  const unreadMessagesCount = (data?.messages || []).filter((m) => !m.read).length;

  const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: FiGrid },
    { id: "profile", label: "Profile & Bio", icon: FiUser },
    { id: "projects", label: "Projects & Portfolio", icon: FiFolder, count: data?.projects?.length },
    { id: "services", label: "Services & Offerings", icon: FiBriefcase, count: data?.services?.length },
    { id: "skills", label: "Skills & Software", icon: FiAward, count: data?.skills?.length },
    { id: "codesigners", label: "Furry Co-Designers", icon: FaCat, count: data?.coDesigners?.length },
    {
      id: "appointments",
      label: "Discovery Calls",
      icon: FiCalendar,
      badge: pendingAppointmentsCount > 0 ? pendingAppointmentsCount : null,
      badgeColor: "bg-amber-500"
    },
    {
      id: "messages",
      label: "Client Inquiries",
      icon: FiMail,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
      badgeColor: "bg-pink-500"
    },
    { id: "settings", label: "Studio Settings", icon: FiSettings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8FA]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
          <FaPaw className="w-6 h-6 text-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-sm font-semibold text-gray-700">Loading Aya Adel Studio Dashboard...</p>
        <p className="text-xs text-pink-400 mt-1">Connecting to data/site-data.json</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8FA] flex">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg border text-sm font-medium ${
              toast.type === "success"
                ? "bg-white text-emerald-800 border-emerald-200"
                : "bg-white text-rose-800 border-rose-200"
            }`}
          >
            {toast.type === "success" ? (
              <FiCheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <FiAlertCircle className="w-5 h-5 text-rose-500" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-pink-100 bg-white/80 backdrop-blur-xl p-6 sticky top-0 h-screen z-20">
        <div>
          {/* Logo & Studio Header */}
          <div className="pb-6 border-b border-pink-100/80">
            <AyaLogo size={42} showText={true} isLink={false} />
            <div className="mt-3 px-1 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                Content Dashboard
              </span>
              <span className="text-[10px] text-gray-400 font-mono">v2.0 • Local DB</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/20"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${
                        item.badgeColor || "bg-pink-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : item.count !== undefined ? (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        isActive ? "bg-white/20 text-white" : "text-gray-400 bg-gray-100"
                      }`}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-pink-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50/70 transition-all border border-pink-100/60"
          >
            <span className="flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-pink-500" />
              View Live Website
            </span>
            <FiExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 w-full py-2 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FiRefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin text-pink-500" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Sync Database"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-pink-100 px-4 py-3 flex items-center justify-between">
          <AyaLogo size={36} showText={true} isLink={false} />
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 text-gray-500 hover:text-pink-600 rounded-xl"
              title="View Live Website"
            >
              <FiExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-pink-600 rounded-xl"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-pink-100 p-4 space-y-1 z-30">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content Container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === "overview" && (
            <OverviewTab
              data={data || {}}
              setActiveTab={setActiveTab}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            />
          )}

          {activeTab === "profile" && (
            <ProfileTab
              profile={data?.profile || {}}
              onSave={(updatedProfile) => handleSaveDomain("profile", updatedProfile)}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsTab
              projects={data?.projects || []}
              onSave={(updatedProjects) => handleSaveDomain("projects", updatedProjects)}
            />
          )}

          {activeTab === "services" && (
            <ServicesTab
              services={data?.services || []}
              onSave={(updatedServices) => handleSaveDomain("services", updatedServices)}
            />
          )}

          {activeTab === "skills" && (
            <SkillsTab
              skills={data?.skills || []}
              onSave={(updatedSkills) => handleSaveDomain("skills", updatedSkills)}
            />
          )}

          {activeTab === "codesigners" && (
            <CoDesignersTab
              coDesigners={data?.coDesigners || []}
              onSave={(updatedCoDesigners) => handleSaveDomain("coDesigners", updatedCoDesigners)}
            />
          )}

          {activeTab === "appointments" && (
            <AppointmentsTab
              appointments={data?.appointments || []}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onDelete={handleDeleteAppointment}
              onAdd={handleAddAppointment}
            />
          )}

          {activeTab === "messages" && (
            <MessagesTab
              messages={data?.messages || []}
              onToggleRead={handleToggleMessageRead}
              onDelete={handleDeleteMessage}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              settings={data?.settings || {}}
              fullData={data || {}}
              onSaveSettings={(updatedSettings) => handleSaveDomain("settings", updatedSettings)}
              onRestoreAll={handleRestoreAll}
            />
          )}
        </div>
      </main>
    </div>
  );
}
