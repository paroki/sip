import {beforeEach, describe, expect, it, vi} from "vitest"
import makeCrudStore from "./store"
import makeApiService from "./api"
import makeCrudService from "./crud"
import {createPinia, setActivePinia} from "pinia"
import createFetchMock from 'vitest-fetch-mock'

setActivePinia(createPinia())
const useTestApi = makeApiService('/test')
const useTestStore = makeCrudStore('test')
const useTestService = makeCrudService(useTestStore, useTestApi)
const fetchMock = createFetchMock(vi)
fetchMock.enableMocks()

describe('crud service', async () => {
  const item = {
    'id': 'test',
    '@id': '@test'
  }

  beforeEach(() => {
    const body = JSON.stringify(item)
    fetchMock.mockResponse(body, {status: 200})
  })

  it('should handle fetch all resource', async() => {
    const body = JSON.stringify({
      totalItems: 1,
      'hydra:view': 'view',
      'hydra:member': [item]
    })
    fetchMock.mockResponse(body, {status: 200})

    const store = useTestStore()

    await useTestService.fetchAll()
    expect(store.byId).toStrictEqual({ "@test": item})
    expect(store.allIds).toStrictEqual(['@test'])
  })

  it('should handle create resource', async()=>{
    const store = useTestStore()
    await useTestService.create(item)
    expect(store.created).toStrictEqual(item)
    expect(store.allIds).toStrictEqual(['@test'])
  })

  it('should handle update resource', async() => {
    const store = useTestStore()
    await useTestService.update(item)
    expect(store.updated).toStrictEqual(item)
    expect(store.allIds).toStrictEqual(['@test'])
  })
})
