"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { ArrowLeftRight, Copy, Trash2 } from 'lucide-react'

export default function Base64ToolPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e: any) {
      setOutput('Error: Invalid input for Base64 operation.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="Base64 Converter" 
        subtitle="Quickly encode or decode text to Base64 format for data transmission or storage."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-center gap-2 p-1 rounded-2xl bg-secondary w-fit mx-auto border border-border">
          <Button 
            variant={mode === 'encode' ? 'primary' : 'ghost'} 
            size="sm" 
            className="rounded-xl"
            onClick={() => { setMode('encode'); setOutput(''); }}
          >
            Encode
          </Button>
          <Button 
            variant={mode === 'decode' ? 'primary' : 'ghost'} 
            size="sm" 
            className="rounded-xl"
            onClick={() => { setMode('decode'); setOutput(''); }}
          >
            Decode
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
                <ArrowLeftRight className="w-4 h-4" /> Input
              </div>
              <Button variant="ghost" size="sm" onClick={() => setInput('')}>
                <Trash2 className="w-3 h-3" /> Clear
              </Button>
            </div>
            <textarea 
              className="w-full p-6 rounded-3xl border border-border bg-card font-mono text-sm focus:ring-2 focus:ring-primary outline-none transition-all h-64 resize-none"
              placeholder={mode === 'encode' ? "Text to encode..." : "Base64 to decode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
                <Copy className="w-4 h-4" /> Output
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigator.clipboard.writeText(output)}
                disabled={!output}
              >
                Copy Result
              </Button>
            </div>
            <div className="w-full p-6 rounded-3xl border border-border bg-card font-mono text-sm h-64 overflow-auto whitespace-pre-wrap break-all">
              {output || 'Result will appear here...'}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="primary" size="lg" className="px-12 py-6 text-lg font-bold" onClick={process}>
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>
        </div>
      </div>
    </div>
  )
}
