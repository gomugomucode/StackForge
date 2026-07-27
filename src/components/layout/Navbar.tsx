'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Code2, 
  Trophy, 
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
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/80 hover:border-primary/50 hover:bg-secondary transition-all duration-150 group"
    >
      <div className="flex items-center gap-1">
        <Trophy className="w-3.5 h-3.5 text-amber-500 group-hover:scale-105 transition-transform duration-150" />
        <span className="text-xs font-bold text-foreground">Lv.{level}</span>
      </div>
      <div className="w-px h-3 bg-border/60" />
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-semibold text-muted-foreground">{xp} XP</span>
      </div>
      <div className="w-px h-3 bg-border/60" />
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-amber-500">🔥 {streak}</span>
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
  const otherLinks = navLinks.filter(link => {
    if (link.label === 'Resources') return false;
    if (link.label === 'Dashboard' && !isAuthenticated) return false;
    return true;
  });

  return (
    <>
      <CommandMenu />
      <header className="fixed top-0 z-50 w-full transition-all duration-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center justify-between h-14 bg-card/90 backdrop-blur-md text-card-foreground border border-border rounded-xl px-4 shadow-xs">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label={`${brandName} home`}>
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-150 shadow-xs">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-150">
                {brandName}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {otherLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources Dropdown Trigger */}
              {resourceLink && (
                <div className="relative" ref={resourcesRef}>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 flex items-center gap-1.5 ${
                      resourcesOpen || pathname.startsWith('/resources') || pathname.startsWith('/blog') || pathname.startsWith('/cheatsheets')
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    Resources
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-[520px] max-w-[calc(100vw-2rem)] p-5 rounded-xl bg-card border border-border shadow-xl backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-hidden z-50"
                      >
                        {/* Column 1: Learning Assets */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2">
                            Learning Assets
                          </h4>
                          <div className="grid gap-1">
                            <Link 
                              href="/cheatsheets" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <FileText className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Cheatsheets</div>
                                <div className="text-[11px] text-muted-foreground">Programming reference guides</div>
                              </div>
                            </Link>

                            <Link 
                              href="/blog" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <BookOpen className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Articles</div>
                                <div className="text-[11px] text-muted-foreground">Detailed engineering walkthroughs</div>
                              </div>
                            </Link>

                            <Link 
                              href="/learn" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <BookOpenCheck className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Tutorials</div>
                                <div className="text-[11px] text-muted-foreground">Interactive step-by-step lessons</div>
                              </div>
                            </Link>

                            <Link 
                              href="/projects" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <Layout className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Projects</div>
                                <div className="text-[11px] text-muted-foreground">Production-grade mini apps</div>
                              </div>
                            </Link>

                            <Link 
                              href="/interview" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <HelpCircle className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Interview Questions</div>
                                <div className="text-[11px] text-muted-foreground">Coding & system design prep</div>
                              </div>
                            </Link>

                            <Link 
                              href="/roadmaps" 
                              onClick={() => setResourcesOpen(false)}
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <Award className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Roadmaps</div>
                                <div className="text-[11px] text-muted-foreground">Guided learning tracks & paths</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: External References */}
                        <div className="space-y-3 sm:border-l sm:border-border/40 sm:pl-5">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2">
                            References
                          </h4>
                          <div className="grid gap-1">
                            <a 
                              href="https://react.dev" 
                              target="_blank" 
                              rel="noreferrer"
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground flex items-center gap-1 group-hover:text-primary">
                                  Official Docs <Sparkles className="w-3 h-3 text-amber-500" />
                                </div>
                                <div className="text-[11px] text-muted-foreground">React, Next.js, and Node docs</div>
                              </div>
                            </a>

                            <a 
                              href="https://developer.mozilla.org" 
                              target="_blank" 
                              rel="noreferrer"
                              className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 text-primary mt-0.5" />
                              <div>
                                <div className="text-xs font-semibold text-foreground group-hover:text-primary">External References</div>
                                <div className="text-[11px] text-muted-foreground">MDN Web Docs specifications</div>
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
                className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
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
                <Search className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] border border-border font-mono">⌘K</kbd>
              </Button>

              {isAuthenticated && <ThemeToggle />}

              {isAuthenticated ? (
                <Button to="/dashboard" variant="primary" size="sm">
                  Dashboard
                </Button>
              ) : (
                <Button to="/auth/login" variant="primary" size="sm">
                  Get Started
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
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Dropdown Panel */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden pb-4 border-t border-border mt-2 bg-card border border-border rounded-xl p-4 shadow-xl"
              >
                <div className="flex flex-col gap-1">
                  {navLinks
                    .filter((link) => link.label !== 'Dashboard' || isAuthenticated)
                    .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3 px-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                      <Button to="/dashboard" variant="primary" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
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
                        className="w-full"
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
          <div className="bg-primary text-primary-foreground text-center py-1.5 text-xs font-semibold animate-in slide-in-from-top duration-200">
            Log in to save your progress and earn XP!{' '}
            <Link
              href={`/auth/login?from=${encodeURIComponent(pathname)}`}
              className="underline ml-1 hover:opacity-90"
            >
              Sign in now
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
