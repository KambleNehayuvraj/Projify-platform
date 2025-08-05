import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,         // 👈 your desired static port
    strictPort: true,   // 👈 ensures it won’t fallback to another port
  },
})
