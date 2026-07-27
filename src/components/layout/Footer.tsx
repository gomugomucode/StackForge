import Link from 'next/link'
import { Code2, GitFork, Share2, Mail, MessageCircle } from 'lucide-react'
import { brandName, brandTagline, navLinks } from '../../data/navigation'

const footerLinks = [
  { label: 'Courses', href: '/resources' },
  { label: 'Quizzes', href: '/quizzes' },
  { label: 'Roadmaps', href: '/roadmaps' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight">{brandName}</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md mb-4 leading-normal">
              {brandTagline}. Free courses, quizzes, roadmaps, and resources for software engineers.
            </p>
            <div className="flex gap-2">
              {[
                { icon: GitFork, label: 'GitHub' },
                { icon: Share2, label: 'Twitter' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Get in Touch</h3>
            <p className="text-xs text-muted-foreground mb-3 leading-normal">
              Have questions or suggestions? Reach out anytime — we typically reply quickly.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-medium hover:bg-primary/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Message us
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
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
