import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { ProgressProvider } from './context/ProgressContext'
import { AchievementProvider } from './context/AchievementContext'
import { AuthProvider } from './context/AuthProvider'
import { AIProvider } from './context/AIProvider'
import { PageLoadingSpinner } from './components/ui/PageLoadingSpinner'
import CommandPalette from './components/ui/CommandPalette'


// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })))
const RoadmapsPage = lazy(() => import('./pages/RoadmapsPage').then(m => ({ default: m.RoadmapsPage })))
const NotesPage = lazy(() => import('./pages/NotesPage').then(m => ({ default: m.NotesPage })))
const CheatsheetsPage = lazy(() => import('./pages/CheatsheetsPage').then(m => ({ default: m.CheatsheetsPage })))
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'))

const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const TechHubPage = lazy(() => import('./pages/TechHubPage').then(m => ({ default: m.TechHubPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })))
const SkillTreePage = lazy(() => import('./pages/SkillTreePage').then(m => ({ default: m.SkillTreePage })))
const CertificatePage = lazy(() => import('./pages/CertificatePage').then(m => ({ default: m.CertificatePage })))
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage').then(m => ({ default: m.PlaygroundPage })))
const AIMentorPage = lazy(() => import('./pages/AIMentorPage').then(m => ({ default: m.AIMentorPage })))
const CertificateCenterPage = lazy(() => import('./pages/CertificateCenterPage'))
const VerifyPage = lazy(() => import('./pages/VerifyPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'))

export default function App() {
  return (
    <AuthProvider>
      <AIProvider>
        <ProgressProvider>
          <AchievementProvider>
            <BrowserRouter>
              <ScrollToTop />
              <CommandPalette />
              <Suspense fallback={<PageLoadingSpinner />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    
                    {/* Dashboard & Comparison & Bookmarks */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/certificate/:technology" element={<CertificatePage />} />
                    
                    {/* Separate Academy Pages */}
                    <Route path="/roadmaps" element={<RoadmapsPage />} />
                    <Route path="/tutorials" element={<TutorialsPage />} />
                    <Route path="/resources" element={<RoadmapsPage />} /> {/* Backward compatibility redirect */}
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="/cheatsheets" element={<CheatsheetsPage />} />
                    <Route path="/interview-prep" element={<InterviewPrepPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/certifications" element={<CertificateCenterPage />} />
                    <Route path="/certificates" element={<CertificateCenterPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />

                    <Route path="/u/:username" element={<ProfilePage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    
                    {/* Tech Hub Page */}
                    <Route path="/learn/:technology" element={<TechHubPage />} />
                    <Route path="/skill-tree/:technology" element={<SkillTreePage />} />
                    <Route path="/playground" element={<PlaygroundPage />} />
                    <Route path="/mentor/:technology" element={<AIMentorPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AchievementProvider>
        </ProgressProvider>
      </AIProvider>
    </AuthProvider>
  )
}

