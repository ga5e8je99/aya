"use client";

import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiHeart,
  FiSave
} from "react-icons/fi";
import { FaCat, FaPaw } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const COLOR_THEMES = [
  { label: "Warm Orange (Milo)", value: "from-amber-400 to-orange-400", border: "border-orange-200" },
  { label: "Soft Pink (Luna)", value: "from-pink-400 to-rose-400", border: "border-pink-200" },
  { label: "Slate Purple (Oliver)", value: "from-purple-400 to-indigo-400", border: "border-purple-200" },
  { label: "Sage Teal", value: "from-teal-400 to-emerald-400", border: "border-teal-200" }
];

export default function CoDesignersTab({ coDesigners = [], onSave }) {
  const [list, setList] = useState([...coDesigners]);
  const [editingCat, setEditingCat] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleEdit = (cat) => {
    setEditingCat(JSON.parse(JSON.stringify(cat)));
    setIsNew(false);
  };

  const handleCreate = () => {
    setEditingCat({
      id: `cat-${Date.now()}`,
      name: "",
      nameAr: "",
      breed: "Persian Fluffy",
      role: "Studio Mascot & Creative Assistant",
      roleAr: "المساعد الإبداعي وجالب البهجة للأستوديو",
      badge: "Creative Specialist",
      quirk: "Inspects every moodboard before sending to client.",
      quirkAr: "يدقق في كل لوحة إلهام قبل إرسالها للعملاء.",
      funStat: "100% Cuddly • 95% Focus",
      color: "from-pink-400 to-rose-400",
      border: "border-pink-200"
    });
    setIsNew(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to remove this co-designer?")) return;
    const updated = list.filter((c) => c.id !== id);
    setList(updated);
    if (onSave) onSave(updated);
    showSaved();
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingCat.name.trim()) {
      alert("Please enter a name for the co-designer.");
      return;
    }

    let updatedList;
    if (isNew) {
      updatedList = [...list, editingCat];
    } else {
      updatedList = list.map((c) => (c.id === editingCat.id ? editingCat : c));
    }

    setList(updatedList);
    setEditingCat(null);
    if (onSave) onSave(updatedList);
    showSaved();
  };

  const showSaved = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              <FaCat className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Furry Co-Designers & Mascots</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage Aya Adel Studio&apos;s feline team members, their creative titles, quirks, and stats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1 font-medium animate-pulse">
              <FiCheck className="w-3.5 h-3.5" /> Changes saved
            </span>
          )}
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium px-5 py-2.5 rounded-2xl shadow-sm hover:shadow transition-all text-sm"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Co-Designer</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white/95 rounded-3xl border ${cat.border || "border-pink-200"} p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
          >
            <div>
              {/* Header Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color || "from-pink-400 to-rose-400"} text-white flex items-center justify-center shadow-md`}
                >
                  <FaPaw className="w-6 h-6" />
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-100 flex items-center gap-1">
                  <HiSparkles className="w-3.5 h-3.5 text-pink-500" />
                  {cat.badge || "Co-Designer"}
                </span>
              </div>

              {/* Name & Breed */}
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
                {cat.nameAr && (
                  <span className="text-sm font-bold text-pink-500 font-sans" dir="rtl">
                    ({cat.nameAr})
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{cat.breed}</p>

              {/* Roles */}
              <div className="mt-3 bg-pink-50/40 rounded-2xl p-3 border border-pink-100/60">
                <p className="text-xs font-semibold text-gray-800">{cat.role}</p>
                {cat.roleAr && (
                  <p className="text-[11px] text-pink-600/80 mt-1 font-sans" dir="rtl">
                    {cat.roleAr}
                  </p>
                )}
              </div>

              {/* Quirk */}
              <div className="mt-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Signature Quirk
                </p>
                <p className="text-xs text-gray-600 mt-1 italic">&ldquo;{cat.quirk}&rdquo;</p>
              </div>

              {/* Fun Stat */}
              {cat.funStat && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-pink-600 font-medium">
                  <FiHeart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                  <span>{cat.funStat}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-100">
              <span className="text-xs text-gray-400">Team Member</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                  title="Edit Cat"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Delete Cat"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingCat && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-pink-100 shadow-2xl p-6 md:p-8 my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingCat(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {isNew ? "Add Furry Co-Designer" : `Edit ${editingCat.name}`}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Configure names, breed, studio role, signature quirk, and color theme.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCat.name}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400"
                    placeholder="e.g. Milo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    الاسم (بالعربية)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingCat.nameAr || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, nameAr: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 text-right"
                    placeholder="مثال: مايلو"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Breed</label>
                  <input
                    type="text"
                    value={editingCat.breed || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, breed: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. Orange Tabby, Persian White"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Badge Title
                  </label>
                  <input
                    type="text"
                    value={editingCat.badge || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, badge: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. Warm Palette Specialist"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Role (English)
                  </label>
                  <input
                    type="text"
                    value={editingCat.role || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. Chief Color Strategist"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    الدور الوظيفي (بالعربية)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingCat.roleAr || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, roleAr: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 text-right"
                    placeholder="مثال: رئيس قسم تناسق الألوان"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Signature Quirk (English)
                </label>
                <textarea
                  rows={2}
                  value={editingCat.quirk || ""}
                  onChange={(e) =>
                    setEditingCat((prev) => ({ ...prev, quirk: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  placeholder="e.g. Inspects every gradient before export..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  العادة المميزة (بالعربية)
                </label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={editingCat.quirkAr || ""}
                  onChange={(e) =>
                    setEditingCat((prev) => ({ ...prev, quirkAr: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 text-right"
                  placeholder="مثال: يراقب تدرجات الألوان بشغف ولا يسمح بالتصدير دون لمسة دافئة..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Fun Stat</label>
                  <input
                    type="text"
                    value={editingCat.funStat || ""}
                    onChange={(e) =>
                      setEditingCat((prev) => ({ ...prev, funStat: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. 99% Curiosity • 100% Cuddly"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Theme Color
                  </label>
                  <select
                    value={editingCat.color}
                    onChange={(e) => {
                      const selected = COLOR_THEMES.find((t) => t.value === e.target.value);
                      setEditingCat((prev) => ({
                        ...prev,
                        color: e.target.value,
                        border: selected?.border || "border-pink-200"
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 bg-white"
                  >
                    {COLOR_THEMES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingCat(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium shadow-sm transition-all"
                >
                  <FiSave className="w-3.5 h-3.5" />
                  <span>{isNew ? "Add Co-Designer" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

