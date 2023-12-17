import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const auto = process.env.SW_AUTO === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
