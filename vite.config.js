import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@C': '/src/components',
      '@V': '/src/views',
      '@assets': '/src/assets',
      '@api': '/src/api',
      '@libs': '/src/libs',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
  },
});
