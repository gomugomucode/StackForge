"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function NewsletterSection() {
  return (
    <section id="newsletter" className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16 text-center text-primary-foreground">
          {/* Background Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Level Up Your Game</h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Join 20,000+ developers receiving our weekly digest of high-impact 
              roadmaps, tool recommendations, and career advice.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                required
              />
              <Button variant="secondary" className="gap-2 font-bold">
                Subscribe <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="mt-6 text-xs text-primary-foreground/60">
              No spam. Only high-quality engineering content. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
