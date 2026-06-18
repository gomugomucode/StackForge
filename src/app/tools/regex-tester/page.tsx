"use client"

import React, { useState, useEffect } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Search, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function RegexTesterPage() {
  const [regex, setRegex] = useState('([a-z0-9._%+-]+)@([a-z0-9.-]+\\.[a-z]{2,})')
  const [testString, setTestString] = useState('test@example.com')
  const [matches, setMatches] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!regex) {
        setMatches([])
        setError(null)
        return
      }
      const re = new RegExp(regex, 'gi')
      const results = [...testString.matchAll(re)].map(match => ({
        index: match.index,
        value: match[0],
        groups: match.slice(1)
      }))
      setMatches(results)
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setMatches([])
    }
  }, [regex, testString])

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Regex Tester" 
        subtitle="Debug and validate your regular expressions in real-time with detailed match groups."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
                <Search className="w-4 h-4" /> Regular Expression
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                className={`w-full p-4 rounded-2xl border-2 font-mono text-sm transition-all outline-none ${
                  error ? 'border-destructive bg-destructive/5' : 'border-border bg-card focus:border-primary'
                }`}
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="Enter regex pattern..."
              />
              {error && (
                <div className="absolute -bottom-6 left-0 text-destructive text-[10px] font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
                <Search className="w-4 h-4" /> Test String
              </div>
            </div>
            <textarea 
              className="w-full p-4 rounded-2xl border border-border bg-card font-mono text-sm focus:ring-2 focus:ring-primary outline-none transition-all h-48 resize-none"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <CheckCircle2 className="w-4 h-4" /> Matches
            </div>
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
              {matches.length} found
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
            {matches.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No matches found.
              </div>
            ) : (
              matches.map((match, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Match {idx + 1}</span>
                    <span className="text-[10px] font-mono text-primary">Pos: {match.index}</span>
                  </div>
                  <div className="font-mono text-sm font-bold break-all">
                    {match.value}
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border space-y-1">
                      {match.groups.map((group: string, gIdx: number) => (
                        <div key={gIdx} className="flex items-center gap-2 text-[11px]">
                          <span className="text-muted-foreground font-medium">Group {gIdx + 1}:</span>
                          <span className="text-foreground font-mono">{group}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
