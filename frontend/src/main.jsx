import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider, createSystem, defineConfig, defaultConfig, defaultSystem, mergeConfigs } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react";
import './index.css'
import App from './App.jsx'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Dark mode
        primary: { value: "#121212" },             // base dark bg
        primaryMidpoint: { value: "#1A1A1A" },      // for sections/cards
        primarySurface: { value: "#1F1F1F" },       // surfaces/panels
        primaryD: { value: "#2E2E2E" },             // borders or subtle dividers
        primaryDarkL: { value: "#eaeaea" },         // light text on dark bg
  
        // Light mode
        primaryL: { value: "#F9FAFB" },             // light background
        primaryMidpointL: { value: "#F3F4F6" },     // section background
        primarySurfaceL: { value: "#FFFFFF" },      // card/surface (pure white)
      },
      fonts: {
        body: { value: "'poppins', 'Inter', system-ui, sans-serif" },
        heading: { value: "'poppins','Inter', system-ui, sans-serif" },
      },
    },
  },
})

const configs = mergeConfigs(defaultConfig, customConfig)

const system = createSystem(defineConfig(configs))

createRoot(document.getElementById('root')).render(
  
    <ChakraProvider value={system}>
      <ColorModeProvider theme={defaultSystem}> 
          <App />
      </ColorModeProvider>
    </ChakraProvider>
  ,
)
