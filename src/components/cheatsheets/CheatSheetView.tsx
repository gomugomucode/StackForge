"use client"

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Search, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

interface CheatSheetViewProps {
  sheet: any
}

export function CheatSheetView({ sheet }: CheatSheetViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Navigation Sidebar */}
      <div className="lg:w-64 p-4 bg-card rounded-3xl border border-border h-fit sticky top-24">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Filter snippets..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div >
        <nav className="space-y-1">
          {sheet.sections.map((section: any, idx: number) => (
            <Link 
              key={idx} 
              href={`#${section.title.replace(/\s+/g, '-').toLowerCase()}`} 
              className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {section.title}
            </Link>
          ))}
        </nav>
        <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-muted-foreground uppercase">
            <Keyboard className="w-3 h-3" /> Keyboard
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Use <kbd className="px-1 rounded bg-background border border-border">Ctrl+F</kbd> to find quickly across the page.
          </p>
        </div >
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-12">
        {sheet.sections.map((section: any, sIdx: number) => (
          <section 
            key={sIdx} 
            id={section.title.replace(/\s+/g, '-').toLowerCase()} 
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold border-b border-border pb-4">{section.title}</h3>
            <div className="grid grid-cols-1 gap-6">
              {section.items.filter((item: any) => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item: any, iIdx: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sIdx * 2 + iIdx) * 0.05 }}
                  key={iIdx} 
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="p-4 flex items-center justify-between border-b border-border bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{item.name}</span>
                      <span className="text-xs text-muted-foreground hidden sm:block">{item.description}</span>
                    </div >
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 gap-2" 
                      onClick={() => copyToClipboard(item.code, `${sIdx}-${iIdx}`)}
                    >
                      {copiedId === `${sIdx}-${iIdx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span className="text-xs">{copiedId === `${sIdx}-${iIdx}` ? 'Copied!' : 'Copy'}</span>
                    </Button>
                  </div >
                  <div className="relative group-hover:opacity-100 transition-opacity">
                    <SyntaxHighlighter 
                      language={sheet.language} 
                      style={oneDark} 
                      customStyle={{ margin: 0, padding: '1rem', fontSize: '13px', background: 'transparent' }}
                    >
                      {item.code}
                    </SyntaxHighlighter>
                  </div >
                </motion.div>
              ))}
            </div >
          </section>
        ))}
      </div >
    </div>
  )
}

import Link from 'next/link'
