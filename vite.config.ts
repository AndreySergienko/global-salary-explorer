import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const isStorybook = !!process.env.STORYBOOK;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    !isStorybook && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
      '@maps': fileURLToPath(new URL('./src/features/map', import.meta.url)),
      '@graphic': fileURLToPath(new URL('./src/features/graphic', import.meta.url)),
    },
  },
})
