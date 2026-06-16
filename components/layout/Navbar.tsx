import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
"use client";
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Layers, ChevronDown } from 'lucide-react'
import { navLinks, academyLinks, brandName } from '@/lib/data/navigation'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchSystem } from '../ui/SearchSystem'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [academyDropdownOpen, setAcademyDropdownOpen] = useState(false)
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg shadow-black/[0.03] dark:shadow-black/20' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label={`${brandName} home`}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/20"
            >
              <Layers className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-text-primary tracking-tight">{brandName}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl glass">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-accent-purple/15 border border-accent-purple/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}

            {/* Academy Dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={() => setAcademyDropdownOpen(true)}
              onMouseLeave={() => setAcademyDropdownOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={academyDropdownOpen}
                aria-controls="desktop-academy-menu"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all text-text-secondary hover:text-text-primary flex items-center gap-1 cursor-pointer`}
              >
                Academy <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${academyDropdownOpen ? 'rotate-185' : ''}`} />
              </button>

              <AnimatePresence>
                {academyDropdownOpen && (
                  <motion.div
                    id="desktop-academy-menu"
                    role="menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-48 rounded-xl bg-surface-900 border border-black/[0.08] dark:border-white/[0.08] p-1.5 shadow-xl shadow-black/20"
                  >
                    {academyLinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        role="menuitem"
                        className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all font-medium"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Bar + Controls */}
          <div className="hidden md:flex items-center gap-3">
            <SearchSystem />
            <ThemeToggle />
            <Button href="/dashboard" variant="ghost" size="sm">
              Dashboard
            </Button>
            <Button href="/roadmaps" variant="ghost" size="sm">
              Syllabus
            </Button>
            <Button href="/#weekly-challenge" variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <SearchSystem />
            <button
              type="button"
              className="p-2.5 rounded-xl glass text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu expanded container */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-accent-purple bg-accent-purple/10 font-semibold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}

                  {/* Collapsible Mobile Academy Section */}
                  <div>
                    <button
                      onClick={() => setMobileAcademyOpen(!mobileAcademyOpen)}
                      aria-expanded={mobileAcademyOpen}
                      aria-controls="mobile-academy-menu"
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    >
                      <span>Academy Topics</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAcademyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileAcademyOpen && (
                        <motion.div
                          id="mobile-academy-menu"
                          role="menu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 border-l border-black/[0.05] dark:border-white/[0.05] ml-4 mt-1 space-y-0.5"
                        >
                          {academyLinks.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              role="menuitem"
                              onClick={() => {
                                setMobileOpen(false)
                                setMobileAcademyOpen(false)
                              }}
                              className="block px-4 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-3 px-2 flex items-center justify-between gap-4 border-t border-black/[0.04] dark:border-white/[0.04] mt-2">
                    <ThemeToggle />
                    <Button href="/#weekly-challenge" variant="primary" size="md" className="flex-1" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
