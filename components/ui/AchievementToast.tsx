"use client";
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy } from 'lucide-react'
import type { Achievement } from '@/lib/data/achievements'

export function AchievementToast({ achievement, onClose }: { achievement: Achievement, onClose: () => void }) {
  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-full duration-500">
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        className="glass-card p-4 rounded-2xl border border-accent-emerald/30 bg-accent-emerald/10 backdrop-blur-xl shadow-2xl shadow-accent-emerald/20 flex items-center gap-4 min-w-[300px]"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-emerald to-accent-cyan flex items-center justify-center text-white shadow-lg shadow-accent-emerald/30 shrink-0">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-text-primary mb-0.5">Achievement Unlocked!</h4>
          <p className="text-xs text-text-secondary leading-relaxed">{achievement.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-primary transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
