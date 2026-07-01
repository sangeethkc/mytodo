import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = parseInt(process.env.VITE_PORT, 10) || 4173;

export default defineConfig({
  preview: {
    allowedHosts: ["app-006.notgr.xyz"],
    // or to allow all hosts:
    // allowedHosts: true,
  },
  plugins: [react()],
  server: {
    host: true,
    port: PORT,
  },
  preview: {
    host: true,
    port: PORT,
  },
})
