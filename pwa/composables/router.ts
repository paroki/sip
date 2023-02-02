import { useApiClient } from '@doyolabs/api-client-core'
import type { RoutingData } from '~/utils'
import { Router } from '~/utils'

export async function loadRoutingData () {
  let routes
  if (!routes) {
    const api = useApiClient()
    const { data } = await api<RoutingData>('/js/routing.json')
    localStorage.setItem('routing', JSON.stringify(data))
    routes = data
  } else {
    routes = JSON.parse(routes)
  }
  Router.setData(routes as RoutingData)
}

export const router = Router.getInstance()
