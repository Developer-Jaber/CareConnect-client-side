import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router/Router'
import AuthProvider from './Provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router></Router>
    </AuthProvider>
  </StrictMode>
)
