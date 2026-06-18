"use client"
import { cheatsheets } from '@/data/cheatsheets'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { Code2, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function CheatSheetsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSheets = cheatsheets.filter(sheet => 
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sheet.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Developer CheatSheets" 
        subtitle="Quick reference guides for the modern tech stack. Optimized for speed and precision."
      />

      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search cheat sheets..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div >
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Language', 'Framework', 'Tool', 'DevOps'].map(cat => (
            <Button 
              key={cat} 
              variant={cat === 'All' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSearchQuery(cat === 'All' ? '' : cat)}
            >
              {cat}
            </Button>
          ))}
        </div >
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSheets.map((sheet) => (
          <Link 
            key={sheet.id} 
            href={`/cheatsheets/${sheet.slug}`} 
            className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                {sheet.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{sheet.title}</h3>
            <p className="text-muted-foreground text-sm mb-6">{sheet.description}</p>
            <div className="flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all">
              Open Sheet <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
