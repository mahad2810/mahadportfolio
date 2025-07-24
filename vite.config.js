import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          ui: ['lucide-react', 'react-icons']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'framer-motion']
  },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
})
