import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3004,
    proxy: {
      '/api':{
        target: 'https://img.pokemondb.net',
        changeOrigin: true,
        rewrite: (path)=> path.replace(/^\/api/,'')
      }
    },
    watch: {
      usePolling: true
    }
  }
})
