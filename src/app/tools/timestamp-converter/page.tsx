"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Clock, Copy, Trash2 } from 'lucide-react'

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('1718345600')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const ms = timestamp.length === 10 ? parseInt(timestamp) * 1000 : parseInt(timestamp)
      const date = new Date(ms)
      if (isNaN(date.getTime())) throw new Error('Invalid timestamp')
      setOutput(date.toLocaleString())
    } catch (e: any) {
      setOutput('Error: Please enter a valid numerical timestamp.')
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Timestamp Converter" 
        subtitle="Convert Unix Epoch timestamps to human-readable dates and times instantly."
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <Clock className="w-4 h-4" /> Unix Timestamp
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={() => setTimestamp('')}>
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          </div>
          <input 
            type="text" 
            className="w-full p-6 rounded-3xl border border-border bg-card font-mono text-lg focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="e.g. 1718345600"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
          <Button variant="primary" size="lg" className="w-full py-6 text-lg font-bold" onClick={convert}>
            Convert to Date
          </Button>
        </div>

        {output && (
          <div className="p-8 rounded-3xl border border-border bg-card text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-sm font-bold text-muted-foreground uppercase">Converted Date</div>
            <div className="text-3xl font-bold">{output}</div>
            <Button variant="outline" size="sm" className="gap-2 mx-auto" onClick={copyToClipboard}>
              {copied ? 'Copied!' : <Copy className="w-4 h-4" />} Copy Result
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
