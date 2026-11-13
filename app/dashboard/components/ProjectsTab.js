"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiFolder,
  FiUploadCloud,
  FiExternalLink
} from "react-icons/fi";

export default function ProjectsTab({ projects = [], onSave }) {
  const [list, setList] = useState([...projects]);
  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = [
    { key: "branding", label: "Brand Identity" },
    { key: "packaging", label: "Packaging & Print" },
    { key: "social", label: "Social Media & Ads" },
    { key: "digital", label: "UI/UX & Digital" },
    { key: "editorial", label: "Editorial & Layout" }
  ];

  const handleEdit = (proj) => {
    setEditingProject({ ...proj });
    setIsNew(false);
  };

  const handleAddNew = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      slug: `project-${Date.now()}`,
      title: "New Creative Project",
      titleAr: "مشروع تصميم جديد",
      category: "branding",
      categoryLabel: "Brand Identity",
      client: "Client Name",
      duration: "4 Weeks",
      year: new Date().getFullYear().toString(),
      image: "/aya-playing-cat.png",
      tagline: "Short aesthetic project summary",
      taglineAr: "نبذة قصيرة عن المشروع وتفاصيله",
      tags: ["Brand Identity", "Typography", "Packaging"],
      tools: ["Adobe Illustrator", "Photoshop", "Figma"],
      description: "Comprehensive case study details...",
      descriptionAr: "تفاصيل دراسة الحالة والمخرجات التصميمية...",
      highlights: ["35% Increase in Brand Awareness", "Luxury Textured Finish", "Custom Arabic Type Pairing"]
    };
    setEditingProject(newProj);
    setIsNew(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = list.filter((p) => p.id !== id);
    setList(updated);
    onSave({ projects: updated });
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    let updated;
    if (isNew) {
      updated = [editingProject, ...list];
    } else {
      updated = list.map((p) => (p.id === editingProject.id ? editingProject : p));
    }
    setList(updated);
    onSave({ projects: updated });
    setEditingProject(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.success && result.url) {
        setEditingProject((prev) => ({ ...prev, image: result.url }));
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2d1b30]">Portfolio Projects & Case Studies</h2>
          <p className="text-xs text-gray-500">
            Showcase Aya Adel&apos;s brand systems, packaging designs, and digital campaigns ({list.length} total).
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-500/20 transition-all flex items-center gap-1.5"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl overflow-hidden border border-pink-200/80 shadow-xs hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] bg-pink-50 overflow-hidden">
                <Image
                  src={proj.image || "/aya-playing-cat.png"}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-pink-700 shadow-xs uppercase">
                  {proj.category || "Design"}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-2">
                <h3 className="font-extrabold text-base text-[#2d1b30] line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {proj.tagline || proj.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 pt-2">
                  <span>Client: {proj.client || "Studio"}</span>
                  <span>•</span>
                  <span>{proj.year || "2024"}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-pink-50/40 border-t border-pink-100 flex items-center justify-between">
              <a
                href={`/projects/${proj.slug || proj.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1"
              >
                <span>View Live</span>
                <FiExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleEdit(proj)}
                  className="p-2 bg-white text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl border border-gray-200 transition-colors shadow-2xs"
                  title="Edit Project"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 bg-white text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-gray-200 transition-colors shadow-2xs"
                  title="Delete Project"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-pink-200 overflow-hidden flex flex-col animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
                  <FiFolder className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#2d1b30]">
                    {isNew ? "Create New Project" : `Edit: ${editingProject.title}`}
                  </h3>
                  <p className="text-xs text-gray-500">Case study details & deliverables</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-pink-100 border border-pink-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Title (EN) *</label>
                  <input
                    type="text"
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">عنوان المشروع (AR)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingProject.titleAr || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProject.category || "branding"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Duration / Timeline</label>
                  <input
                    type="text"
                    value={editingProject.duration || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                    placeholder="e.g. 4 Weeks"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Cover / Showcase Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.image || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="/projectImage/... or upload"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none font-mono"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors">
                    <FiUploadCloud />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline / Short Summary (EN)</label>
                <input
                  type="text"
                  value={editingProject.tagline || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Case Study Narrative</label>
                <textarea
                  rows={4}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                />
              </div>

              {/* Tools & Tags (comma separated) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tools Used (comma separated)</label>
                  <input
                    type="text"
                    value={(editingProject.tools || []).join(", ")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tools: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="Illustrator, Figma, Photoshop"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Key Tags (comma separated)</label>
                  <input
                    type="text"
                    value={(editingProject.tags || []).join(", ")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="Brand Identity, Packaging, Luxe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-all flex items-center gap-1.5"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

