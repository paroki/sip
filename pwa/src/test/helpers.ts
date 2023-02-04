import type { ApiResponse } from '@doyolabs/api-client-core'
import { setActivePinia } from 'pinia'
import { createPinia } from 'pinia'
import { vi, type Mock } from 'vitest'
import { createApp } from 'vue'

export function tsBootstrapPinia() {
  const app = createApp({})
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
}

export async function tsMockApiClient<T>(
  expected: ApiResponse<T>
): Promise<Mock<any[], any>> {
  const fn = vi.fn().mockResolvedValue(expected)
  const m = await import('@doyolabs/api-client-core')
  m.useApiClient = vi.fn().mockReturnValue(fn)
  return fn
}
