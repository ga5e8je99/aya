"use client";

import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiAward,
  FiSliders,
  FiSave,
  FiTag
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const CATEGORY_META = {
  tools: { label: "Design Tools & Software", badgeBg: "bg-pink-50 text-pink-700 border-pink-200" },
  branding: { label: "Brand Identity & Strategy", badgeBg: "bg-purple-50 text-purple-700 border-purple-200" },
  digital: { label: "Digital, UI & Social", badgeBg: "bg-amber-50 text-amber-800 border-amber-200" },
  print: { label: "Print, Packaging & Pre-Press", badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200" }
};

export default function SkillsTab({ skills = [], onSave }) {
  const [list, setList] = useState([...skills]);
  const [filterCat, setFilterCat] = useState("all");
  const [editingSkill, setEditingSkill] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories = [
    { key: "all", label: "All Skills" },
    { key: "tools", label: "Software & Tools" },
    { key: "branding", label: "Branding" },
    { key: "digital", label: "Digital & Social" },
    { key: "print", label: "Print & Editorial" }
  ];

  const filteredSkills =
    filterCat === "all" ? list : list.filter((s) => s.category === filterCat);

  const handleEdit = (skill, index) => {
    setEditingSkill({ ...skill, _origIndex: index });
    setIsNew(false);
  };

  const handleCreate = () => {
    setEditingSkill({
      name: "",
      category: filterCat !== "all" ? filterCat : "tools",
      tier: "Core Competency",
      experience: "3+ years",
      proficiency: 90,
      highlight: "",
      badgeColor: "border-pink-300 text-pink-600 bg-pink-50"
    });
    setIsNew(true);
  };

  const handleDelete = (indexToDelete) => {
    if (!confirm("Are you sure you want to remove this skill?")) return;
    const updated = list.filter((_, idx) => idx !== indexToDelete);
    setList(updated);
    if (onSave) onSave(updated);
    showSaved();
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingSkill.name.trim()) {
      alert("Please provide a skill or tool name.");
      return;
    }

    let updatedList;
    if (isNew) {
      updatedList = [...list, editingSkill];
    } else {
      updatedList = list.map((s, idx) => (idx === editingSkill._origIndex ? editingSkill : s));
    }

    setList(updatedList);
    setEditingSkill(null);
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
              <FiAward className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Skills, Tools & Expertise</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage your design software proficiencies, brand strategy domains, and experience levels.
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
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilterCat(c.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              filterCat === c.key
                ? "bg-pink-500 text-white shadow-sm"
                : "bg-white/80 text-gray-600 border border-pink-100/70 hover:bg-pink-50/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill, idx) => {
          const catMeta = CATEGORY_META[skill.category] || {
            label: skill.category,
            badgeBg: "bg-gray-100 text-gray-700 border-gray-200"
          };
          return (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm rounded-3xl border border-pink-100/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catMeta.badgeBg}`}
                  >
                    {skill.tier || catMeta.label}
                  </span>
                  <span className="text-xs font-bold text-pink-600">
                    {skill.proficiency || 90}%
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Experience: {skill.experience || "3+ years"}
                </p>

                {/* Proficiency Bar */}
                <div className="w-full bg-pink-100/60 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency || 90}%` }}
                  />
                </div>

                {/* Highlights */}
                {skill.highlight && (
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed bg-pink-50/30 p-2.5 rounded-xl border border-pink-100/50">
                    {skill.highlight}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <HiSparkles className="w-3.5 h-3.5 text-pink-400" />
                  Studio Verified
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(skill, idx)}
                    className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                    title="Edit Skill"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Delete Skill"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-pink-100 shadow-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setEditingSkill(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {isNew ? "Add Skill / Tool" : "Edit Skill / Tool"}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Configure name, category domain, experience, and proficiency level.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Skill / Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) =>
                    setEditingSkill((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400"
                  placeholder="e.g. Adobe Illustrator, Figma, Typography"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 bg-white"
                  >
                    <option value="tools">Design Tools & Software</option>
                    <option value="branding">Brand Identity & Strategy</option>
                    <option value="digital">Digital, UI & Social</option>
                    <option value="print">Print & Pre-Press</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tier / Badge</label>
                  <input
                    type="text"
                    value={editingSkill.tier || ""}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({ ...prev, tier: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. Mastery Core"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={editingSkill.experience || ""}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({ ...prev, experience: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                    placeholder="e.g. 5+ years"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-700">Proficiency</label>
                    <span className="text-xs font-bold text-pink-600">
                      {editingSkill.proficiency || 90}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={editingSkill.proficiency || 90}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({
                        ...prev,
                        proficiency: Number(e.target.value)
                      }))
                    }
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Key Strengths & Highlights
                </label>
                <textarea
                  rows={2}
                  value={editingSkill.highlight || ""}
                  onChange={(e) =>
                    setEditingSkill((prev) => ({ ...prev, highlight: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400"
                  placeholder="e.g. Vector Precision, Logo Creation, Die-Lines, CMYK..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium shadow-sm transition-all"
                >
                  <FiSave className="w-3.5 h-3.5" />
                  <span>{isNew ? "Add Skill" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

