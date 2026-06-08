import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@helpers', replacement: path.resolve(__dirname, './src/helpers') },
      { find: '@stores', replacement: path.resolve(__dirname, './src/stores') }
    ]
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')()]
    }
  }
})