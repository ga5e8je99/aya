"use client";

import { useState } from "react";
import {
  FiMail,
  FiCheckCircle,
  FiCircle,
  FiTrash2,
  FiSearch,
  FiCornerUpLeft,
  FiClock,
  FiUser,
  FiCheck,
  FiEye,
  FiX
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

export default function MessagesTab({ messages = [], onToggleRead, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((msg) => {
    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && !msg.read) ||
      (filterType === "read" && msg.read);

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read && onToggleRead) {
      onToggleRead(msg.id, true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              <FiMail className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Inquiries & Client Messages</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Read project inquiries sent via the contact form and reply directly to clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 ? (
            <span className="px-3.5 py-1.5 rounded-full bg-pink-500 text-white text-xs font-bold shadow-sm">
              {unreadCount} Unread {unreadCount === 1 ? "Message" : "Messages"}
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
              <FiCheck className="w-3.5 h-3.5" /> All caught up!
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === "all"
                ? "bg-pink-500 text-white shadow-sm"
                : "bg-white/80 text-gray-600 border border-pink-100/70 hover:bg-pink-50/50"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilterType("unread")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === "unread"
                ? "bg-pink-500 text-white shadow-sm"
                : "bg-white/80 text-gray-600 border border-pink-100/70 hover:bg-pink-50/50"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType("read")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === "read"
                ? "bg-pink-500 text-white shadow-sm"
                : "bg-white/80 text-gray-600 border border-pink-100/70 hover:bg-pink-50/50"
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-pink-100/80 bg-white/90 text-xs focus:outline-none focus:border-pink-400"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-pink-100">
            <FiMail className="w-10 h-10 text-pink-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">No messages found</p>
            <p className="text-xs text-gray-400 mt-1">
              New client messages from the contact form will show up here.
            </p>
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !msg.read
                  ? "bg-white border-pink-300/80 shadow-sm ring-1 ring-pink-200/50"
                  : "bg-white/70 border-pink-100/70 hover:bg-white text-gray-600"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Read/Unread Indicator */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleRead) onToggleRead(msg.id, !msg.read);
                  }}
                  className="mt-1 text-gray-400 hover:text-pink-500"
                  title={msg.read ? "Mark unread" : "Mark read"}
                >
                  {!msg.read ? (
                    <span className="w-3 h-3 rounded-full bg-pink-500 inline-block ring-4 ring-pink-100" />
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className={`text-sm ${
                        !msg.read ? "font-bold text-gray-900" : "font-semibold text-gray-700"
                      }`}
                    >
                      {msg.name}
                    </h4>
                    <span className="text-xs text-gray-400 font-normal">
                      &lt;{msg.email}&gt;
                    </span>
                    {!msg.read && (
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs mt-1 truncate ${
                      !msg.read ? "text-gray-900 font-semibold" : "text-gray-600"
                    }`}
                  >
                    {msg.subject || "(No Subject)"}
                  </p>

                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Timestamp & Actions */}
              <div
                className="flex items-center gap-2 justify-end self-end md:self-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[11px] text-gray-400 flex items-center gap-1 mr-2">
                  <FiClock className="w-3 h-3" />
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                </span>

                <a
                  href={`mailto:${msg.email}?subject=${encodeURIComponent(
                    `Re: ${msg.subject || "Your Inquiry to Aya Adel Studio"}`
                  )}`}
                  className="p-2 text-pink-600 hover:bg-pink-50 rounded-xl transition-colors"
                  title="Reply via Email"
                >
                  <FiCornerUpLeft className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    if (confirm("Delete this message?")) {
                      onDelete && onDelete(msg.id);
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete message"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-pink-100 shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
                Inquiry Details
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {selectedMessage.subject || "(No Subject)"}
            </h3>

            <div className="bg-pink-50/50 rounded-2xl p-3 border border-pink-100 my-4 text-xs space-y-1">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">From:</span> {selectedMessage.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-pink-600 underline font-medium"
                >
                  {selectedMessage.email}
                </a>
              </p>
              {selectedMessage.createdAt && (
                <p className="text-gray-400">
                  <span className="font-semibold text-gray-600">Received:</span>{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="my-5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Message Body
              </label>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Delete this message?")) {
                    onDelete && onDelete(selectedMessage.id);
                    setSelectedMessage(null);
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-2 rounded-xl hover:bg-rose-50"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    `Re: ${selectedMessage.subject || "Your Inquiry to Aya Adel Studio"}`
                  )}`}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium shadow-sm transition-all"
                >
                  <FiCornerUpLeft className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

