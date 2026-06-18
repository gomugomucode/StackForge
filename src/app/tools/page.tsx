"use client"
import { devTools } from '@/data/tools'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { ArrowRight, Wrench, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = devTools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Developer Toolbox" 
        subtitle="A collection of essential utilities to speed up your development workflow."
      />

      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search for a tool..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div >
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Formatter', 'Converter', 'Analyzer', 'Generator'].map(cat => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Link 
            key={tool.id} 
            href={`/tools/${tool.slug}`} 
            className="group p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{tool.description}</p>
            <div className="flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all">
              Launch Tool <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
