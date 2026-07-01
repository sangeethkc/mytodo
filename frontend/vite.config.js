import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = parseInt(process.env.VITE_PORT, 10) || 4173;
const ALLOWED_HOSTS = process.env.VITE_ALLOWED_HOSTS
  ? process.env.VITE_ALLOWED_HOSTS.split(",")
  : undefined;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: PORT,
  },
  preview: {
    host: true,
    port: PORT,
    allowedHosts: ALLOWED_HOSTS,
  },
})
