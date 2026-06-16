import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'
import { Layout } from '@/components/layout/Layout'
import CommandPalette from '@/components/ui/CommandPalette'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StackForge Academy | Master the Stack',
  description: 'The ultimate platform for learning full-stack development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>
            <CommandPalette />
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
