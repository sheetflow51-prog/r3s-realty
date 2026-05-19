import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('recharts') || id.includes('d3-')) return 'charts'
          if (
            id.includes('react-dom') ||
            id.includes('scheduler') ||
            /node_modules[\\/]react[\\/]/.test(id)
          ) {
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
})
