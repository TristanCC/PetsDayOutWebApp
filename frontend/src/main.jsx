import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider, createSystem, defineConfig, defaultConfig, defaultSystem } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react";
import './index.css'
import App from './App.jsx'


const system = createSystem(defineConfig(defaultConfig))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider theme={defaultSystem}> 
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
