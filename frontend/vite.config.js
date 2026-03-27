import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },

  build: {
    sourcemap: false, // ✅ FIX
  },

  esbuild: {
    sourcemap: false, // ✅ extra safety
  }
})