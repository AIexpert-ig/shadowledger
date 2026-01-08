// src/main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App, app } from './app'
import './styles/global.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

// Expose shim to global window for legacy inline handlers
declare global {
  interface Window {
    app: { toggleReportMode: () => void }
  }
}

window.app = { toggleReportMode: app.toggleReportMode }
