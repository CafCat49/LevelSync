import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      // Any request starting with '/api' will be redirected
      '/api': {
        target: 'https://levelsync-backend.onrender.com',
        changeOrigin: true,
        secure: true, // Set to false if you encounter SSL issues on Render
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})