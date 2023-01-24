import {beforeEach, describe, expect, it, vi} from "vitest"
import {createPinia, setActivePinia, Store, StoreDefinition, StoreGeneric} from "pinia"
import createFetchMock from 'vitest-fetch-mock'
import makeCrudStore from "~/lib/crud/store"


const testStore = makeCrudStore('test', '/test')
const fetchMock = createFetchMock(vi)
const testItem = { "@id": '@test', 'id': 'test'}
fetchMock.enableMocks()
// @ts-ignore
fetchMock.mockIf(/^https?:\/\/localhost.*$/, (req) => {
  if(req.url.endsWith('test') && 'POST' === req.method){
    return {
      body: JSON.stringify(testItem),
      status: 200
    }
  }
})
describe('makeCrudStore', () => {
  let store: StoreGeneric

  beforeEach(() => {
    setActivePinia(createPinia())
    store = testStore()

  })

  it('should define initial state', () => {
    // expect('hello').toEqual('World')
    expect(store.allIds).toStrictEqual([])
  })

  it('should toggle loading status', () => {
    expect(store.loading).toBeFalsy()

    store.toggleLoading()
    expect(store.loading).toBeTruthy()
  })

  it('should remove errors', () => {
    expect(store.error).toBe(null)

    store.error = 'hello'
    expect(store.error).toEqual('hello')

    store.resetError()
    expect(store.error).toBe(null)
  })

  it('should handle create resource', async() =>{
    expect(store.created).toBeNull()
    await store.create(testItem)

    expect(store.created).toStrictEqual(testItem)
    expect(store.byId).toStrictEqual({'@test': testItem})
    expect(store.allIds).toStrictEqual(['@test'])
  })

})
