"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Lock, Copy, Trash2, Check, Info } from 'lucide-react'

export default function JwtDecoderPage() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<{header: any, payload: any} | null>(null)
  const [error, setError] = useState<string | null>(null)

  const decodeJwt = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT format. Expected 3 parts separated by dots.')
      
      const decode = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(window.atob(base64))
      }

      setDecoded({
        header: decode(parts[0]),
        payload: decode(parts[1])
      })
      setError(null)
    } catch (e: any) {
      setError(e.message)
      setDecoded(null)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    // Simple alert or toast would go here
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionHeader 
        title="JWT Decoder" 
        subtitle="Safely decode JSON Web Tokens to inspect the header and payload without verifying the signature."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase">
              <Lock className="w-4 h-4" /> Token
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={() => setToken('')}>
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          </div>
          <textarea 
            className="w-full p-6 rounded-3xl border border-border bg-card font-mono text-sm focus:ring-2 focus:ring-primary outline-none transition-all h-32 resize-none"
            placeholder="Paste your JWT here..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button variant="primary" size="lg" className="w-full py-6 text-lg font-bold" onClick={decodeJwt}>
            Decode Token
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive text-destructive text-sm flex items-center gap-3">
            <Info className="w-4 h-4" /> {error}
          </div>
        )}

        {decoded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold uppercase text-muted-foreground">Header</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2))}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre className="p-6 rounded-3xl border border-border bg-card font-mono text-sm overflow-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold uppercase text-muted-foreground">Payload</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre className="p-6 rounded-3xl border border-border bg-card font-mono text-sm overflow-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
