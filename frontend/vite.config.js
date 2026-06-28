import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    allowedHosts: ["app-006.notgr.xyz"],
    // or to allow all hosts:
    // allowedHosts: true,
  },
  plugins: [react()],
})
