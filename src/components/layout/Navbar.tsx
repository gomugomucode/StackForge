'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Code2, Trophy, Users } from 'lucide-react'
import { navLinks, brandName } from '../../data/navigation'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/theme-toggle'
import { CommandMenu } from './CommandMenu'
import { useUserStats } from '@/context/UserStatsContext'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { UserMenu } from '@/features/auth/components/UserMenu'


function UserStatsBadge() {
  const { xp, level, streak, isLoading } = useUserStats();

  if (isLoading) return <div className="w-20 h-8 rounded-full bg-secondary animate-pulse" />;

  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-all group"
    >
      <div className="flex items-center gap-1.5">
        <Trophy className="w-3.5 h-3.5 text-yellow-500 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold text-foreground">Lv.{level}</span>
      </div>
      <div className="w-px h-3 bg-border" />
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-muted-foreground">{xp} XP</span>
      </div>
      <div className="w-px h-3 bg-border" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-orange-500">🔥 {streak}</span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  const isLearningPage = pathname !== '/' &&
    pathname !== '/about' &&
    pathname !== '/blog' &&
    pathname !== '/resources' &&
    pathname !== '/auth/login' &&
    pathname !== '/auth/signup';

  return (
    <>
      <CommandMenu />
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${brandName} home`}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                {brandName}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* XP / Level / Streak are ONLY rendered for authenticated users.
                  Anonymous visitors never see them — no fake stats, no leaked
                  dashboard affordances. */}
              {isAuthenticated && !isLoading && <UserStatsBadge />}
              <UserMenu />

              <Link
                href="/community"
                className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-all flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Circles</span>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
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
                <span className="text-xs font-medium">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[10px] border border-border">⌘K</kbd>
              </Button>
              <ThemeToggle />
              <Button to="/blog" variant="ghost" size="sm">
                Articles
              </Button>

              {/* Auth-aware primary CTA.
                  - Anonymous: "Start Learning" → /login (preserving the current page)
                  - Authenticated: "Start Learning" → #weekly-challenge on the homepage
              */}
              {isAuthenticated ? (
                <Button to="/#weekly-challenge" variant="primary" size="sm">
                  Start Learning
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
                >
                  Start Learning
                </Button>
              )}
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                        ? 'text-primary bg-primary/10'
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
                    <Button to="/dashboard" variant="primary" size="md" className="w-full">
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
                    >
                      Start Learning
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
        {!isAuthenticated && !isLoading && isLearningPage && (
          <div className="bg-primary text-white text-center py-2 text-xs font-medium animate-in slide-in-from-top duration-300">
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
