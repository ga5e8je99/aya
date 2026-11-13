"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiX,
  FiCheck,
  FiExternalLink
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const STATUS_CONFIG = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Completed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Cancelled: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" }
};

export default function AppointmentsTab({ appointments = [], onUpdateStatus, onDelete, onAdd }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Brand Identity Design",
    date: new Date().toISOString().split("T")[0],
    time: "02:00 PM",
    notes: ""
  });

  const filtered = appointments.filter((apt) => {
    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      apt.name?.toLowerCase().includes(q) ||
      apt.email?.toLowerCase().includes(q) ||
      apt.phone?.toLowerCase().includes(q) ||
      apt.service?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newBooking.name.trim()) return;
    if (onAdd) {
      onAdd({
        ...newBooking,
        id: `apt-${Date.now()}`,
        status: "Confirmed",
        createdAt: new Date().toISOString()
      });
    }
    setShowAddModal(false);
    setNewBooking({
      name: "",
      email: "",
      phone: "",
      service: "Brand Identity Design",
      date: new Date().toISOString().split("T")[0],
      time: "02:00 PM",
      notes: ""
    });
  };

  const getCleanPhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/[^0-9]/g, "");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              <FiCalendar className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Appointments & Discovery Calls</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Track client consultations, confirm slots, and contact clients via WhatsApp or Email.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium px-5 py-2.5 rounded-2xl shadow-sm hover:shadow transition-all text-sm"
        >
          <FiPlus className="w-4 h-4" />
          <span>Log Discovery Call</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["all", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === status
                  ? "bg-pink-500 text-white shadow-sm"
                  : "bg-white/80 text-gray-600 border border-pink-100/70 hover:bg-pink-50/50"
              }`}
            >
              {status === "all" ? `All (${appointments.length})` : status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client or service..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-pink-100/80 bg-white/90 text-xs focus:outline-none focus:border-pink-400"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-pink-100">
            <FiCalendar className="w-10 h-10 text-pink-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">No appointments found</p>
            <p className="text-xs text-gray-400 mt-1">
              New client bookings from the website will appear here in real-time.
            </p>
          </div>
        ) : (
          filtered.map((apt) => {
            const statusMeta = STATUS_CONFIG[apt.status] || STATUS_CONFIG.Pending;
            const cleanPhone = getCleanPhone(apt.phone);
            const waLink = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${apt.name}, this is Aya Adel from Aya Adel Studio regarding your booking for ${apt.service}.`
                )}`
              : null;

            return (
              <div
                key={apt.id}
                className="bg-white/95 rounded-3xl p-5 border border-pink-100/80 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Client & Date Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex flex-col items-center justify-center flex-shrink-0 text-pink-600">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-900">{apt.name}</h4>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                      >
                        {apt.status}
                      </span>
                      <span className="text-xs font-medium text-pink-600 bg-pink-50/70 px-2 py-0.5 rounded-md">
                        {apt.service || "Consultation"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-medium text-gray-700">
                        <FiCalendar className="w-3.5 h-3.5 text-pink-500" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <FiClock className="w-3.5 h-3.5 text-pink-500" />
                        {apt.time}
                      </span>
                      {apt.phone && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <FiPhone className="w-3.5 h-3.5 text-gray-400" />
                          {apt.phone}
                        </span>
                      )}
                      {apt.email && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <FiMail className="w-3.5 h-3.5 text-gray-400" />
                          {apt.email}
                        </span>
                      )}
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-gray-600 mt-2 bg-pink-50/30 p-2 rounded-xl border border-pink-100/50">
                        <span className="font-semibold text-gray-700">Client Note: </span>
                        {apt.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Switchers & Direct Contact Actions */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 justify-end flex-wrap">
                  {/* WhatsApp Direct */}
                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-medium transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {/* Email Direct */}
                  {apt.email && (
                    <a
                      href={`mailto:${apt.email}?subject=${encodeURIComponent(
                        `Aya Adel Studio - Discovery Call (${apt.service})`
                      )}`}
                      className="p-2 rounded-xl text-gray-500 hover:text-pink-600 hover:bg-pink-50 border border-gray-200 transition-colors"
                      title="Send Email"
                    >
                      <FiMail className="w-4 h-4" />
                    </a>
                  )}

                  {/* Status Dropdown / Buttons */}
                  <select
                    value={apt.status}
                    onChange={(e) => onUpdateStatus && onUpdateStatus(apt.id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:border-pink-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (confirm("Delete this appointment record?")) {
                        onDelete && onDelete(apt.id);
                      }
                    }}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete record"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Manual Add Discovery Call Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-pink-100 shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Log Discovery Call</h3>
            <p className="text-xs text-gray-500 mb-5">
              Add a client appointment manually into the studio schedule.
            </p>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBooking.name}
                  onChange={(e) => setNewBooking((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  placeholder="e.g. Salma Farouk"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newBooking.email}
                    onChange={(e) =>
                      setNewBooking((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="salma@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={newBooking.phone}
                    onChange={(e) =>
                      setNewBooking((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="+20 100 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Requested
                </label>
                <input
                  type="text"
                  value={newBooking.service}
                  onChange={(e) =>
                    setNewBooking((prev) => ({ ...prev, service: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  placeholder="e.g. Brand Identity, Packaging Design"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) =>
                      setNewBooking((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newBooking.time}
                    onChange={(e) =>
                      setNewBooking((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="02:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={newBooking.notes}
                  onChange={(e) =>
                    setNewBooking((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  placeholder="Project details or special requirements..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium shadow-sm transition-all"
                >
                  Add Discovery Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

