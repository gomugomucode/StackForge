"use client";
import { useState, useEffect } from 'react'
import { Download, X, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Save the event so it can be triggered later.
      setDeferredPrompt(e)
      // Check if user dismissed it in this session
      const dismissed = sessionStorage.getItem('stackforge-pwa-dismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    // Show the install prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleDismiss = () => {
    sessionStorage.setItem('stackforge-pwa-dismissed', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[60] max-w-sm w-full"
        >
          <div className="glass-card p-5 rounded-2xl glow-purple relative overflow-hidden flex gap-4">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 dark:bg-accent-purple/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/20 shrink-0 mt-0.5">
              <Layers className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-text-primary text-sm tracking-tight mb-1">
                  Install StackForge App
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  Access roadmaps, study guides, and certificates offline with instant loading.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-accent-purple rounded-xl hover:bg-accent-violet shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-1.5 text-xs font-semibold text-text-secondary bg-surface-850 hover:bg-surface-800 rounded-xl transition-all cursor-pointer border border-black/[0.04] dark:border-white/[0.04]"
                >
                  Not Now
                </button>
              </div>
            </div>

            {/* Direct Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-text-muted hover:text-text-primary p-0.5 rounded-lg hover:bg-surface-850 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
