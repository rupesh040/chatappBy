import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import proxy from 'http-proxy-middleware'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
