import React, { StrictMode } from 'react' // Import StrictMode specifically due to typescript rules
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AppProvider} from './appContext'

// No changes needed from vite template
// No need for redux or context API, as the app is small enough to manage state with useState
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
