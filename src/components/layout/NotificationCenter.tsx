"use client";

import React, { useState, useEffect } from "react";
import { Bell, Check, Award, Code2, MessageSquare, AlertCircle, ExternalLink } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id }),
      });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ACHIEVEMENT":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "PROJECT_REVIEW":
        return <Code2 className="w-4 h-4 text-indigo-400" />;
      case "MENTOR_SUGGESTION":
        return <MessageSquare className="w-4 h-4 text-sky-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-sky-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-sm text-slate-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
            <span className="font-bold text-slate-100 flex items-center gap-2">
              Notifications {unreadCount > 0 && <span className="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">{unreadCount} new</span>}
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No notifications yet</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.read && markAsRead(n.id)}
                  className={`p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                    n.read ? "bg-slate-900/40 hover:bg-slate-800/40" : "bg-sky-500/5 hover:bg-sky-500/10"
                  }`}
                >
                  <div className="mt-0.5 p-2 bg-slate-950 rounded-lg border border-slate-800">
                    {getNotificationIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-slate-100 flex items-center justify-between">
                      <span>{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
