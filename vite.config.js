import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          ui: ['lucide-react', 'react-icons'],
          emailjs: ['@emailjs/browser']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'framer-motion']
  },
  define: {
    global: 'globalThis',
    // Manually expose environment variables to client-side
    'import.meta.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(process.env.EMAILJS_SERVICE_ID),
    'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.EMAILJS_TEMPLATE_ID),
    'import.meta.env.EMAILJS_PUBLIC_KEY': JSON.stringify(process.env.EMAILJS_PUBLIC_KEY),
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
})
