import { motion } from 'framer-motion'
import { Info, Map, BookOpen, Library, Briefcase, FileText, HelpCircle } from 'lucide-react'

interface MobileTabBarProps {
  activeTab: string
  onChangeTab: (tab: string) => void
}

export function MobileTabBar({ activeTab, onChangeTab }: MobileTabBarProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'interviews', label: 'Prep', icon: HelpCircle },
    { id: 'cheatsheets', label: 'Sheets', icon: FileText }
  ]

  return (
    <div className="mobile-tab-bar md:hidden border-t border-black/[0.05] dark:border-white/[0.05]">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="flex-1 flex flex-col items-center justify-center h-full relative focus:outline-none cursor-pointer"
            aria-label={`Switch to ${tab.label} tab`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              isActive ? 'text-accent-purple dark:text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            
            <span className={`text-[9px] font-medium tracking-tight mt-0.5 ${
              isActive ? 'text-text-primary font-bold' : 'text-text-muted'
            }`}>
              {tab.label}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeMobileTabIndicator"
                className="absolute top-0 w-8 h-1 bg-accent-purple dark:bg-accent-cyan rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
