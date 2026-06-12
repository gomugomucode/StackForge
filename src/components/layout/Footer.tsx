import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Layers, GitFork, Share2, Mail, MessageCircle } from 'lucide-react'
import { brandName, brandTagline, navLinks } from '../../data/navigation'
import { FadeIn } from '../ui/Motion'

const footerLinks = [
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Study Notes', href: '/notes' },
  { label: 'Cheat Sheets', href: '/cheatsheets' },
  { label: 'Interview Prep', href: '/interview-prep' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Tools & Utilities', href: '/tools' },
]

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.06] bg-surface-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FadeIn className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">{brandName}</span>
            </Link>
            <p className="text-text-secondary max-w-md mb-6 leading-relaxed text-sm">
              {brandTagline}. Free courses, quizzes, games, roadmaps, and resources to help you become a better developer.
            </p>
            <div className="flex gap-3">
              {[
                { icon: GitFork, label: 'GitHub' },
                { icon: Share2, label: 'Social' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-accent-purple transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-text-secondary hover:text-accent-purple transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Questions or feedback? We are happy to help.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/25 text-sm font-medium hover:bg-emerald-500/15 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Message us
            </motion.a>
          </FadeIn>
        </div>

        <div className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-text-muted hover:text-text-secondary text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
