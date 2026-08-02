import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project at Hjalte01.github.io/hjaltes-cookbook/.
  // Override with VITE_BASE_PATH=/ when deploying at a custom root domain.
  base: process.env.VITE_BASE_PATH ?? '/hjaltes-cookbook/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
