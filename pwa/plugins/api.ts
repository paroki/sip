import { useApiCore } from '@doyolabs/api-client-core'

export default defineNuxtPlugin(async () => {
  const core = useApiCore()
  core.options.entrypoint = 'https://localhost'

  loadRoutingData()
})
