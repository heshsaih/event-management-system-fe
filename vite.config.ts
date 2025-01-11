/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "playwright.config.ts",
    testTimeout: 1_000_000,
    minWorkers: 1,
    maxWorkers: 4,
    expect: {
      poll: {
        timeout: 1_000_000
      } 
    }
  },
});
