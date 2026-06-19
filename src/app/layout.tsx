import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ProgressProvider } from '@/context/ProgressContext'
import { BookmarkProvider } from '@/context/BookmarkContext'
import { UserStatsProvider } from '@/context/UserStatsContext'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/AuthProvider'


export const metadata = {
  title: 'StackForge | Master the Modern Tech Stack',
  description: 'Production-ready roadmaps, cheat sheets, and projects for elite developers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <ProgressProvider>
              <BookmarkProvider>
                <UserStatsProvider>
                  <ScrollToTop />
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </UserStatsProvider>
              </BookmarkProvider>
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>

      </body>
    </html>
  )
}
