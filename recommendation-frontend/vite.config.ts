import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query', 'axios'],
          'animation-vendor': ['gsap', 'framer-motion'],
          'ui-vendor': ['swiper', '@headlessui/react', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly increase limit for main chunk
  },
})
