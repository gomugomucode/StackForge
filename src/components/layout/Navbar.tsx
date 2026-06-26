'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Code2, 
  Trophy, 
  Users, 
  ChevronDown, 
  BookOpen, 
  FileText, 
  Layout, 
  Award, 
  HelpCircle, 
  ExternalLink, 
  Sparkles,
  Search,
  BookOpenCheck
} from 'lucide-react'
import { navLinks, brandName } from '../../data/navigation'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/theme-toggle'
import { CommandMenu } from './CommandMenu'
import { useUserStats } from '@/context/UserStatsContext'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { UserMenu } from '@/features/auth/components/UserMenu'
import { motion, AnimatePresence } from 'framer-motion'

function UserStatsBadge() {
  const { xp, level, streak, isLoading } = useUserStats();

  if (isLoading) return <div className="w-24 h-8 rounded-full bg-secondary/50 animate-pulse border border-border/30" />;

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full premium-glass hover:border-[#1BBDF9]/50 hover:bg-[#1BBDF9]/5 transition-all duration-300 group"
    >
      <div className="flex items-center gap-1">
        <Trophy className="w-3.5 h-3.5 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-xs font-bold text-foreground">Lv.{level}</span>
      </div>
      <div className="w-px h-3 bg-border/60" />
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-semibold text-muted-foreground">{xp} XP</span>
      </div>
      <div className="w-px h-3 bg-border/60" />
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-orange-500 animate-bounce-slow">🔥 {streak}</span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLearningPage = pathname !== '/' &&
    !pathname.startsWith('/about') &&
    !pathname.startsWith('/blog') &&
    !pathname.startsWith('/resources') &&
    !pathname.startsWith('/auth');

  const resourceLink = navLinks.find(link => link.label === 'Resources');
  const otherLinks = navLinks.filter(link => link.label !== 'Resources');

  return (
    <>
      <CommandMenu />
      <header className="fixed top-0 z-50 w-full transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center justify-between h-16 backdrop-blur-md bg-white/10 dark:bg-slate-950/40 border border-white/20 dark:border-slate-800/40 rounded-2xl px-4 shadow-xl shadow-black/5 transition-all duration-300">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label={`${brandName} home`}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1BBDF9] to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#1BBDF9]/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-foreground tracking-tight group-hover:text-[#1BBDF9] transition-colors duration-300">
                {brandName}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 group ${
                    pathname === link.href
                      ? 'text-[#1BBDF9] bg-[#1BBDF9]/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#1BBDF9] rounded-full transition-all duration-300 ${
                    pathname === link.href ? 'w-6' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}

              {/* Resources Mega Menu Trigger */}
              {resourceLink && (
                <div className="relative" ref={resourcesRef}>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-1.5 ${
                      resourcesOpen || pathname.startsWith('/resources') || pathname.startsWith('/blog') || pathname.startsWith('/cheatsheets')
                        ? 'text-[#1BBDF9] bg-[#1BBDF9]/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                    }`}
                  >
                    Resources
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-[560px] p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-border/60 shadow-2xl backdrop-blur-xl grid grid-cols-2 gap-6 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1BBDF9]/5 to-purple-600/5 pointer-events-none" />
                        
                        {/* Column 1: Learning Assets */}
                        <div className="relative z-10 space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2">
                            🎓 Learning Assets
                          </h4>
                          <div className="grid gap-2">
                            <Link 
                              href="/cheatsheets" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <FileText className="w-4 h-4 text-[#1BBDF9] mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Cheatsheets</div>
                                <div className="text-[10px] text-muted-foreground">Rapid-fire programming reference guides</div>
                              </div>
                            </Link>

                            <Link 
                              href="/blog" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <BookOpen className="w-4 h-4 text-purple-500 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Articles</div>
                                <div className="text-[10px] text-muted-foreground">Detailed engineering walkthroughs</div>
                              </div>
                            </Link>

                            <Link 
                              href="/learn" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <BookOpenCheck className="w-4 h-4 text-emerald-500 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Tutorials</div>
                                <div className="text-[10px] text-muted-foreground">Step-by-step interactive lessons</div>
                              </div>
                            </Link>

                            <Link 
                              href="/projects" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <Layout className="w-4 h-4 text-orange-500 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Projects</div>
                                <div className="text-[10px] text-muted-foreground">Production-grade mini apps to build</div>
                              </div>
                            </Link>

                            <Link 
                              href="/interview" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <HelpCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Interview Questions</div>
                                <div className="text-[10px] text-muted-foreground">FAANG coding & system design prep</div>
                              </div>
                            </Link>

                            <Link 
                              href="/roadmaps" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <Award className="w-4 h-4 text-pink-500 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9] transition-colors">Roadmaps</div>
                                <div className="text-[10px] text-muted-foreground">Guided learning tracks & paths</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: External References */}
                        <div className="relative z-10 space-y-4 border-l border-border/40 pl-6">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2">
                            🔗 References
                          </h4>
                          <div className="grid gap-2">
                            <a 
                              href="https://react.dev" 
                              target="_blank" 
                              rel="noreferrer"
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-cyan-400 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground flex items-center gap-1 group-hover:text-[#1BBDF9]">
                                  Official Docs <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
                                </div>
                                <div className="text-[10px] text-muted-foreground">Official React, Next.js, and Node docs</div>
                              </div>
                            </a>

                            <a 
                              href="https://developer.mozilla.org" 
                              target="_blank" 
                              rel="noreferrer"
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-secondary/60 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-blue-400 mt-0.5" />
                              <div>
                                <div className="text-xs font-bold text-foreground group-hover:text-[#1BBDF9]">External References</div>
                                <div className="text-[10px] text-muted-foreground">MDN Web Docs, standard specifications</div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Right-side Utilities & Profile */}
            <div className="hidden xl:flex items-center gap-3">
              {isAuthenticated && !isLoading && <UserStatsBadge />}
              <UserMenu />

              {/* CMD+K Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-full"
                onClick={() => {
                  const event = new KeyboardEvent('keydown', {
                    key: 'k',
                    ctrlKey: true,
                    metaKey: true,
                    bubbles: true
                  });
                  document.dispatchEvent(event);
                }}
              >
                <Search className="w-3.5 h-3.5 text-[#1BBDF9]" />
                <span className="text-xs font-semibold">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[9px] border border-border">⌘K</kbd>
              </Button>

              <ThemeToggle />

              {isAuthenticated ? (
                <Button to="/dashboard" variant="primary" size="sm" className="bg-[#1BBDF9] hover:bg-[#159ecf] text-white">
                  Dashboard
                </Button>
              ) : (
                <Button
                  to={
                    isLearningPage
                      ? `/auth/login?from=${encodeURIComponent(pathname)}`
                      : '/auth/login'
                  }
                  variant="primary"
                  size="sm"
                  className="bg-[#1BBDF9] hover:bg-[#159ecf] text-white"
                >
                  Start Learning
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Panel */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden pb-4 border-t border-border mt-2 bg-background/95 backdrop-blur-md rounded-2xl p-4 shadow-xl"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-[#1BBDF9] bg-[#1BBDF9]/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3 px-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                      <Button to="/dashboard" variant="primary" size="md" className="w-full bg-[#1BBDF9]" onClick={() => setMobileOpen(false)}>
                        Go to Dashboard
                      </Button>
                    ) : (
                      <Button
                        to={
                          isLearningPage
                            ? `/auth/login?from=${encodeURIComponent(pathname)}`
                            : '/auth/login'
                        }
                        variant="primary"
                        size="md"
                        className="w-full bg-[#1BBDF9]"
                        onClick={() => setMobileOpen(false)}
                      >
                        Start Learning
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        {!isAuthenticated && !isLoading && isLearningPage && (
          <div className="bg-[#1BBDF9] text-white text-center py-2 text-xs font-semibold animate-in slide-in-from-top duration-300">
            Log in to save your progress and earn XP!{' '}
            <Link
              href={`/auth/login?from=${encodeURIComponent(pathname)}`}
              className="underline ml-1"
            >
              Sign in now
            </Link>
          </div>
        )}
      </header>
    </>
  )
}

