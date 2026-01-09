import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './styles/global.css' // <--- This import does the work!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)