import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // base: '/shadowledger/',  <-- MAKE SURE THIS IS GONE OR COMMENTED OUT
})