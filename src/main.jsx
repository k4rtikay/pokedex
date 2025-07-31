import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'
import { PokedexProvider } from './Context/PokedexContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PokedexProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokedexProvider>
    </AuthProvider>
  </StrictMode>
)
