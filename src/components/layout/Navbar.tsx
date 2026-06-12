import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Layers } from 'lucide-react'
import { navLinks, brandName } from '../../data/navigation'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          <Link to="/" className="flex items-center gap-2.5 group" aria-label={`${brandName} home`}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/20"
            >
              <Layers className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-text-primary tracking-tight">{brandName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl glass">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent-purple/15 border border-accent-purple/20 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button to="/blog" variant="ghost" size="sm">
              Articles
            </Button>
            <Button to="/#weekly-challenge" variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl glass text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

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
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      end={link.href === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-accent-purple bg-accent-purple/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="pt-3 px-2 flex items-center justify-between gap-4">
                    <ThemeToggle />
                    <Button to="/#weekly-challenge" variant="primary" size="md" className="flex-1" onClick={() => setMobileOpen(false)}>
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
