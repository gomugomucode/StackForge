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
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then(m => ({ default: m.CertificationsPage })))
const ToolsPage = lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(m => ({ default: m.CommunityPage })))
const TechHubPage = lazy(() => import('./pages/TechHubPage').then(m => ({ default: m.TechHubPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage').then(m => ({ default: m.BookmarksPage })))
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })))
const CertificatePage = lazy(() => import('./pages/CertificatePage').then(m => ({ default: m.CertificatePage })))

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
                <Route path="/resources" element={<RoadmapsPage />} /> {/* Backward compatibility redirect */}
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/cheatsheets" element={<CheatsheetsPage />} />
                <Route path="/interview-prep" element={<InterviewPrepPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/u/:username" element={<ProfilePage />} />
                <Route path="/community" element={<CommunityPage />} />
                
                {/* Tech Hub Page */}
                <Route path="/learn/:technology" element={<TechHubPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AchievementProvider>
    </ProgressProvider>
  )
}

