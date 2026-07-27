"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Plus, Search, Filter, Layers, BookOpen, 
  HelpCircle, Code, ShieldCheck, History, CheckCircle, 
  AlertCircle, Eye, Edit3, ArrowLeft, RefreshCw, Trash2, Tag
} from "lucide-react";

type ContentEntity = "lesson" | "topic" | "quiz" | "challenge" | "project" | "roadmap";

interface CmsItem {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version?: number;
  difficulty?: string;
  updatedAt?: string;
  [key: string]: any;
}

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<ContentEntity>("lesson");
  const [items, setItems] = useState<CmsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CmsItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
    technology: "JavaScript",
    status: "DRAFT",
    xpAwarded: 50,
    tags: "",
    prerequisites: "",
  });

  useEffect(() => {
    fetchContent();
  }, [activeTab, searchQuery, statusFilter]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/cms?entity=${activeTab}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (statusFilter !== "ALL") url += `&status=${statusFilter}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to fetch CMS items");
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: activeTab,
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty,
          technology: formData.technology,
          status: formData.status,
          xpAwarded: Number(formData.xpAwarded),
          tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
          prerequisites: formData.prerequisites ? formData.prerequisites.split(",").map((p) => p.trim()) : [],
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          description: "",
          difficulty: "beginner",
          technology: "JavaScript",
          status: "DRAFT",
          xpAwarded: 50,
          tags: "",
          prerequisites: "",
        });
        fetchContent();
      }
    } catch (err) {
      console.error("Error creating content:", err);
    }
  };

  const entityTabs: { key: ContentEntity; label: string; icon: React.ReactNode }[] = [
    { key: "lesson", label: "Lessons", icon: <BookOpen className="w-4 h-4" /> },
    { key: "topic", label: "Topics", icon: <Layers className="w-4 h-4" /> },
    { key: "quiz", label: "Quizzes", icon: <HelpCircle className="w-4 h-4" /> },
    { key: "challenge", label: "Challenges", icon: <Code className="w-4 h-4" /> },
    { key: "project", label: "Projects", icon: <FileText className="w-4 h-4" /> },
    { key: "roadmap", label: "Roadmaps", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" /> StackForge Admin Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Content Management System</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage roadmaps, lessons, quizzes, challenges, version histories, and publication workflows.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create {activeTab.toUpperCase()}
        </button>
      </div>

      {/* Entity Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1 overflow-x-auto">
        {entityTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-slate-800 text-sky-400 border-b-2 border-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={`Search ${activeTab}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-sm text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button
            onClick={fetchContent}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Table / List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-sky-400" />
          <p className="text-sm font-medium">Loading {activeTab} inventory...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 text-slate-400 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-600" />
          <p className="text-base font-semibold">No {activeTab}s found</p>
          <p className="text-xs text-slate-500">Create your first item or refine search parameters.</p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Title & Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Version</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-100">{item.title}</div>
                      <div className="text-xs font-mono text-slate-500">{item.slug || item.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.status === "DRAFT"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                        }`}
                      >
                        {item.status === "PUBLISHED" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <History className="w-3 h-3" />
                        )}
                        {item.status || "PUBLISHED"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-sky-400">
                      v{item.version || 1}.0
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {item.difficulty || "Beginner"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "Recent"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-100 capitalize">New {activeTab} Item</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xl font-semibold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={`e.g. Master ${activeTab.toUpperCase()} Architecture`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of learning objectives and key concepts..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">XP Awarded</label>
                  <input
                    type="number"
                    value={formData.xpAwarded}
                    onChange={(e) => setFormData({ ...formData, xpAwarded: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. react, typescript, async"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
