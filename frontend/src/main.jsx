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
        primary: { value: "#121212 " },
        primaryMidpoint: {value: "#0F0F0F"},
        primarySurface: { value: "#0E0E0E"},
        primaryDarkL: { value: "#D9D9D9" }, 
        primaryDark: { value: "#2E2E2E" }, // new dark version
        primaryL: { value: "#EDEDED" },          // background darker white
        primaryMidpointL: { value: "#F2F2F2" },  // 
        primarySurfaceL: { value: "#F5F5F5" }   // foreground lighter white
                                              
        
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
  },
})

const configs = mergeConfigs(defaultConfig, customConfig)

const system = createSystem(defineConfig(configs))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider theme={defaultSystem}> 
          <App />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
