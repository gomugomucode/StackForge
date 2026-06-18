"use client"

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { Search, X, ArrowRight, BookOpen, Code2, Terminal, BrainCircuit } from 'lucide-react'
import { getAllSearchItems, SearchResult } from '@/utils/search-index'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const items = getAllSearchItems()

  const getIcon = (type: string) => {
    switch (type) {
      case 'roadmap': return <Terminal className="w-4 h-4" />
      case 'cheatsheet': return <BookOpen className="w-4 h-4" />
      case 'project': return <Code2 className="w-4 h-4" />
      case 'interview': return <BrainCircuit className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        >
          <div 
            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="flex flex-col">
              <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Command.Input 
                  placeholder="Search for roadmaps, projects, cheat sheets... (Cmd+K)" 
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  <span className="hidden sm:inline">ESC</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setOpen(false)} />
                </div >
              </div >

              <Command.List className="p-2 max-h-[400px] overflow-y-auto">
                <Command.Group heading="Suggested">
                  {items.slice(0, 4).map((item) => (
                    <Command.Item 
                      key={item.id} 
                      value={item.title}
                      onSelect={() => {
                        router.push(item.url)
                        setOpen(false)
                      }}
                      className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                          {getIcon(item.type)}
                        </div >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">{item.category}</span>
                        </div >
                      </div >
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="All Resources">
                  {items.map((item) => (
                    <Command.Item 
                      key={item.id} 
                      value={item.title}
                      onSelect={() => {
                        router.push(item.url)
                        setOpen(false)
                      }}
                      className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                          {getIcon(item.type)}
                        </div >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">{item.category}</span>
                        </div >
                      </div >
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </div >
        </motion.div>
      )}
    </AnimatePresence>
  )
}
