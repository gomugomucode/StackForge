import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
"use client";
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Layers } from 'lucide-react'
import { navLinks, brandName } from '@/lib/data/navigation'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Brand - Left */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label={`${brandName} home`}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
              <Layers className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight">{brandName}</span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth Actions - Right */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button href="/login" variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              Sign In
            </Button>
            <Button href="/roadmaps" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
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
              <div className="pb-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === link.href ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button href="/login" variant="ghost" size="md" className="text-white bg-white/5" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Button>
                  <Button href="/roadmaps" variant="primary" size="md" className="bg-indigo-600 text-white" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
