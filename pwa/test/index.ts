import { createPinia, setActivePinia } from 'pinia'
import { readFileSync } from 'node:fs'
import { createApp } from 'vue'
import { vi } from 'vitest'

export function loadJsonFixtures (file: string) {
  const json = readFileSync(file)
  return JSON.parse(json.toString())
}

export function mockPiniaStart(){
  const pinia = createPinia()
  const app = createApp({})
  app.use(pinia)
  setActivePinia(pinia)
}

export async function mockLocalStorage(initValue: any){
  const s = await import('@vueuse/core')
  s.useLocalStorage = vi.fn().mockReturnValue(initValue)
}

export async function mockApiClient(returnValue: any){
  vi.mock('@doyolabs/api-client-core')
  const api = vi.fn().mockResolvedValue(returnValue)
  const m = await import('@doyolabs/api-client-core')
  m.useApiClient = vi.fn().mockReturnValue(api)
  return api
}
