import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},  // Fix for SockJS and StompJS requiring 'global'
  },
  server: {
    hmr: false // Disable Vite WebSocket for debugging
  }
})
