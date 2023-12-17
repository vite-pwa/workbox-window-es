import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.MODE === 'production' ? 'production' : 'development',
  define: {
    __SW__: '"/sw.js"',
    __SW_SCOPE__: '"/"',
    __SW_TYPE__: '"classic"',
    __DATE__: `${JSON.stringify(Date.now())}`,
    AUTO_SW: `${JSON.stringify(process.env.SW_AUTO === 'true')}`,
    AUTO_DESTROY_SW: 'false',
  },
  plugins: [vue()],
})
