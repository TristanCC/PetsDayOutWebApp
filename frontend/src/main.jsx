import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { ColorModeProvider } from "@/components/ui/color-mode"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
