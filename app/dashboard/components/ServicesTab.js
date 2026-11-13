"use client";

import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiBriefcase,
  FiList,
  FiSave,
  FiEye
} from "react-icons/fi";
import { FaPalette, FaBoxOpen, FaLayerGroup, FaPenNib, FaShapes } from "react-icons/fa6";

const COLOR_PRESETS = [
  { label: "Pink Rose", value: "from-pink-500 to-rose-400" },
  { label: "Rose Amber", value: "from-rose-500 to-amber-400" },
  { label: "Purple Pink", value: "from-purple-500 to-pink-500" },
  { label: "Fuchsia Purple", value: "from-fuchsia-500 to-purple-400" },
  { label: "Emerald Teal", value: "from-emerald-500 to-teal-400" },
  { label: "Indigo Violet", value: "from-indigo-500 to-purple-500" }
];

const ICON_OPTIONS = [
  { key: "palette", label: "Palette", icon: FaPalette },
  { key: "packaging", label: "Packaging", icon: FaBoxOpen },
  { key: "social", label: "Social", icon: FaLayerGroup },
  { key: "pen", label: "Illustration", icon: FaPenNib },
  { key: "shapes", label: "Design System", icon: FaShapes }
];

export default function ServicesTab({ services = [], onSave }) {
  const [list, setList] = useState([...services]);
  const [editingService, setEditingService] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newFeatureText, setNewFeatureText] = useState("");

  const handleEdit = (service) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
    setIsNew(false);
  };

  const handleCreate = () => {
    const newId = list.length > 0 ? Math.max(...list.map((s) => Number(s.id) || 0)) + 1 : 1;
    setEditingService({
      id: newId,
      title: "",
      titleAr: "",
      icon: "palette",
      color: "from-pink-500 to-rose-400",
      description: "",
      descriptionAr: "",
      features: []
    });
    setIsNew(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const updated = list.filter((s) => s.id !== id);
    setList(updated);
    if (onSave) onSave(updated);
    showSaved();
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingService.title.trim()) {
      alert("Please provide at least a service title.");
      return;
    }

    let updatedList;
    if (isNew) {
      updatedList = [...list, editingService];
    } else {
      updatedList = list.map((s) => (s.id === editingService.id ? editingService : s));
    }

    setList(updatedList);
    setEditingService(null);
    if (onSave) onSave(updatedList);
    showSaved();
  };

  const showSaved = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setEditingService((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeatureText.trim()]
    }));
    setNewFeatureText("");
  };

  const handleRemoveFeature = (idx) => {
    setEditingService((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
              <FiBriefcase className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-gray-900">Services & Studio Offerings</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage your design packages, deliverables, bilingual descriptions, and feature lists.
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
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((service) => (
          <div
            key={service.id}
            className="bg-white/90 backdrop-blur-sm rounded-3xl border border-pink-100/80 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${service.color || "from-pink-500 to-rose-400"} text-white flex items-center justify-center shadow-sm`}>
                  <FaPalette className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                  ID: #{service.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                {service.title || "Untitled Service"}
              </h3>
              {service.titleAr && (
                <p className="text-xs font-medium text-pink-600/80 mt-0.5 font-sans" dir="rtl">
                  {service.titleAr}
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-gray-500 line-clamp-3 mt-3 leading-relaxed">
                {service.description || "No description provided."}
              </p>

              {/* Deliverables / Features */}
              <div className="mt-4 pt-4 border-t border-pink-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FiList className="w-3.5 h-3.5 text-pink-500" />
                  Key Deliverables ({service.features?.length || 0})
                </p>
                <ul className="space-y-1.5">
                  {(service.features || []).slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                  {(service.features?.length || 0) > 3 && (
                    <li className="text-[11px] text-pink-600 font-medium">
                      +{service.features.length - 3} more deliverables
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                Studio Offering
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                  title="Edit Service"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  title="Delete Service"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-pink-100 shadow-2xl p-6 md:p-8 my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {isNew ? "Add New Service Offering" : "Edit Service Offering"}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Configure English & Arabic titles, deliverables, and aesthetic gradient.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Service Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="e.g. Brand Identity & Logo Design"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    عنوان الخدمة (بالعربية)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingService.titleAr || ""}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, titleAr: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-right"
                    placeholder="مثال: الهوية البصرية وتصميم الشعارات"
                  />
                </div>
              </div>

              {/* Color Gradient Preset */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Gradient Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() =>
                        setEditingService((prev) => ({ ...prev, color: preset.value }))
                      }
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        editingService.color === preset.value
                          ? "border-pink-500 bg-pink-50 text-pink-700 font-bold"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${preset.value}`} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={editingService.description || ""}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  placeholder="Detailed breakdown of what this service offers..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  الوصف (بالعربية)
                </label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={editingService.descriptionAr || ""}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, descriptionAr: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-right"
                  placeholder="وصف تفصيلي للخدمة ومميزاتها للعملاء..."
                />
              </div>

              {/* Features / Deliverables Manager */}
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Deliverables & Key Inclusions
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="e.g. Complete Brand Guidelines PDF"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-400 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3.5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {(editingService.features || []).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-pink-100 text-xs text-gray-700"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {(!editingService.features || editingService.features.length === 0) && (
                    <p className="text-xs text-gray-400 italic">No deliverables added yet.</p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium shadow-sm transition-all"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isNew ? "Create Service" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

