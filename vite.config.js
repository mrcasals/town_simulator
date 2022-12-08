/// <reference types="vitest" />
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  root: 'src',
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
  test: {
    globals: true,
  },
})
