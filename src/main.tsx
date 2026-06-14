import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeProvider'
import { contentService } from './core/content/contentService'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

// Register PWA service worker
registerSW({ immediate: true })

// Initialize content system
contentService.init().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>,
  );
});

