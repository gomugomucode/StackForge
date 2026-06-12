import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'

export function PageLoadingSpinner() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-transparent">
      <div className="relative flex flex-col items-center">
        {/* Outer glowing pulsing background */}
        <div className="absolute w-24 h-24 rounded-full bg-accent-purple/10 dark:bg-accent-purple/20 blur-xl animate-pulse" />

        {/* Outer rotating gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-t-accent-purple border-r-accent-cyan border-b-transparent border-l-transparent"
        />

        {/* Inner static branding icon */}
        <div className="absolute top-3.5 w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/20">
          <Layers className="w-5 h-5 text-white animate-pulse" />
        </div>

        {/* Pulsing Text */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 text-sm font-semibold tracking-wide text-text-secondary dark:text-text-primary uppercase"
        >
          Loading StackForge...
        </motion.div>
      </div>
    </div>
  )
}
