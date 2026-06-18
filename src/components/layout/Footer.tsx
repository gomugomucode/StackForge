import Link from 'next/link'
import { Code2, GitFork, Share2, Mail, MessageCircle } from 'lucide-react'
import { brandName, brandTagline, navLinks } from '../../data/navigation'

const footerLinks = [
  { label: 'Courses', href: '/resources' },
  { label: 'Quizzes', href: '/#weekly-challenge' },
  { label: 'Roadmaps', href: '/#roadmaps' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export function Footer() {
  return (
    <footer className="border-t border-surface-700/50 bg-surface-850">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">{brandName}</span>
            </Link>
            <p className="text-text-secondary max-w-md mb-6 leading-relaxed">
              {brandTagline}. Free courses, quizzes, games, roadmaps, and resources to help you become a better developer.
            </p>
            <div className="flex gap-3">
              {[
                { icon: GitFork, label: 'GitHub' },
                { icon: Share2, label: 'Twitter' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-surface-750 border border-surface-600 flex items-center justify-center text-text-secondary hover:text-accent-purple hover:border-accent-purple/40 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-purple transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">Get in Touch</h3>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Have questions or suggestions? Reach out anytime — we typically reply within minutes.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-600/30 text-sm font-medium hover:bg-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Message us
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
