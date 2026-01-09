import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        // Nothing special – we just keep the vanilla CSS
      }
    }
  }
})