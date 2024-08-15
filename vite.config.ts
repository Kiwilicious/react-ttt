import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // change for gh-pages asset lookup path
    assetsDir: 'react-ttt/assets',
  },
})
