// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // IF your repo is 'shadowledger', uncomment the line below:
  // base: '/shadowledger/', 
})