/// <reference types="vitest" />
import {defineConfig} from "vitest/config"
import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)
export const alias: Record<string, string> = {
  '~': r('/'),
  '~~': r('.'),
  '~~/': r('./'),
  '@@': r('.'),
  '@@/': r('./'),
  assets: r('./assets'),
  public: r('./public'),
  'public/': r('./public/'),
}

export default defineConfig({
  resolve:{
    alias
  },
  test: {
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/vendor/**'
    ],
  }
})
