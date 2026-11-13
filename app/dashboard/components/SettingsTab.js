"use client";

import { useState } from "react";
import {
  FiSettings,
  FiSave,
  FiCheck,
  FiDownload,
  FiUploadCloud,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiGlobe,
  FiAlertCircle
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function SettingsTab({ settings = {}, fullData = {}, onSaveSettings, onRestoreAll }) {
  const [formData, setFormData] = useState({
    siteName: settings.siteName || "Aya Adel Studio",
    tagline: settings.tagline || "Graphic & Brand Identity Designer",
    announcement: settings.announcement || "Open for New Design Projects & Retainers",
    showAnnouncement: settings.showAnnouncement !== false,
    themeColor: settings.themeColor || "blush"
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveSettings) {
      onSaveSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Download complete JSON backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `aya-adel-studio-backup-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Restore JSON backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.profile && !parsed.projects) {
          throw new Error("Invalid backup format: missing core studio domains.");
        }
        if (confirm("Are you sure you want to restore this backup? It will replace current site data.")) {
          if (onRestoreAll) {
            await onRestoreAll(parsed);
            setRestoreStatus({ success: true, message: "Backup successfully restored!" });
            setTimeout(() => setRestoreStatus(null), 4000);
          }
        }
      } catch (err) {
        setRestoreStatus({ success: false, message: err.message || "Failed to parse backup JSON file." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              <FiSettings className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Studio & Site Settings</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Global studio branding, announcement bar, and JSON data backup & restore.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1 font-medium animate-pulse">
            <FiCheck className="w-3.5 h-3.5" /> Settings saved
          </span>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Branding */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-pink-100/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <FiGlobe className="w-4 h-4 text-pink-500" />
            Brand & Header Title
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Studio Brand Name
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Official Tagline / Subtitle
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400"
              />
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-pink-100/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-pink-500" />
              Announcement Bar
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showAnnouncement}
                onChange={(e) => handleChange("showAnnouncement", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              <span className="ml-2 text-xs font-medium text-gray-600">
                {formData.showAnnouncement ? "Active" : "Hidden"}
              </span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Banner Message Text
            </label>
            <input
              type="text"
              value={formData.announcement}
              onChange={(e) => handleChange("announcement", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400"
              placeholder="e.g. Open for New Design Projects & Retainers"
            />
          </div>
        </div>

        {/* Theme Accent */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-pink-100/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <FiSliders className="w-4 h-4 text-pink-500" />
            Studio Accent Theme
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "blush", name: "Blush Rose", color: "from-pink-500 to-rose-400" },
              { id: "champagne", name: "Champagne Warm", color: "from-amber-400 to-orange-400" },
              { id: "lavender", name: "Lavender Dream", color: "from-purple-500 to-pink-400" },
              { id: "sage", name: "Sage Serene", color: "from-teal-400 to-emerald-400" }
            ].map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleChange("themeColor", theme.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  formData.themeColor === theme.id
                    ? "border-pink-500 bg-pink-50/70 shadow-sm font-bold"
                    : "border-gray-200 hover:border-pink-200 bg-white"
                }`}
              >
                <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.color} block mb-2 shadow-xs`} />
                <span className="text-xs text-gray-800 block">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium px-6 py-2.5 rounded-2xl shadow-sm hover:shadow transition-all text-sm"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Studio Settings</span>
          </button>
        </div>
      </form>

      {/* Backup & Restore Section */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-pink-100/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <FiShield className="w-4 h-4 text-pink-500" />
          Data Backup & Disaster Recovery
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          All website content, projects, appointments, and messages are persisted in{" "}
          <code className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded text-[11px] font-mono">
            data/site-data.json
          </code>
          . You can export a snapshot backup anytime or import one to restore data.
        </p>

        {restoreStatus && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
              restoreStatus.success
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {restoreStatus.success ? (
              <FiCheck className="w-4 h-4" />
            ) : (
              <FiAlertCircle className="w-4 h-4" />
            )}
            <span>{restoreStatus.message}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportBackup}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 text-pink-700 text-xs font-semibold transition-all shadow-xs"
          >
            <FiDownload className="w-4 h-4 text-pink-500" />
            <span>Download Full Backup (JSON)</span>
          </button>

          {/* Import JSON */}
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/30 text-gray-700 text-xs font-semibold transition-all cursor-pointer shadow-xs">
            <FiUploadCloud className="w-4 h-4 text-gray-500" />
            <span>Restore From Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

