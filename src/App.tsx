import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { NotesPage } from './pages/NotesPage'
import { CheatsheetsPage } from './pages/CheatsheetsPage'
import { InterviewPrepPage } from './pages/InterviewPrepPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { CertificationsPage } from './pages/CertificationsPage'
import { ToolsPage } from './pages/ToolsPage'
import { TechHubPage } from './pages/TechHubPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* Separate Academy Pages */}
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/resources" element={<RoadmapsPage />} /> {/* Backward compatibility redirect */}
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/cheatsheets" element={<CheatsheetsPage />} />
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          
          {/* Tech Hub Page */}
          <Route path="/learn/:technology" element={<TechHubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
