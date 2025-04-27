import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    force: true,
    exclude: ['js-big-decimal'],
    include: ['your-broken-dep-name']
  },

  plugins: [react(), tailwindcss(),],
})
