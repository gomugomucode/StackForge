"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle, AlertCircle, X, Bug, Lightbulb } from "lucide-react";

export function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [type, setType] = useState<"FEEDBACK" | "BUG" | "FEATURE">("FEEDBACK");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 text-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
            <h3 className="text-xl font-bold">Thank You!</h3>
            <p className="text-sm text-slate-400">Your feedback has been logged for our product team.</p>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-400" /> Beta Feedback & Bug Report
              </h3>
              <p className="text-xs text-slate-400 mt-1">Help us make StackForge exceptional.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setType("FEEDBACK")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    type === "FEEDBACK" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> General
                </button>
                <button
                  type="button"
                  onClick={() => setType("BUG")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    type === "BUG" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-400"
                  }`}
                >
                  <Bug className="w-3.5 h-3.5" /> Bug Report
                </button>
                <button
                  type="button"
                  onClick={() => setType("FEATURE")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    type === "FEATURE" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "text-slate-400"
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Feature Request
                </button>
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your feedback, bug details, or feature idea..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
