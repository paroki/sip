import { beforeEach, describe, expect, it, vi } from 'vitest'
import dayjs from 'dayjs'
import type { Profile } from '~/stores/auth'
import { useAuthStore } from '~/stores/auth'
import { mockApiClient, mockLocalStorage, mockPiniaStart } from '~/test'

vi.mock('@vueuse/core')

describe('useAuthStore', () => {
  const profile: Profile = {
    id: 'some-id'
  }

  beforeEach(() => {
    mockPiniaStart()
  })

  it('should set profile and error value on login', async () => {
    const initial = { id: 'foo-bar' }
    await mockLocalStorage(initial)
    const api = await mockApiClient({
      data: profile,
      error: 'some-error'
    })

    const store = useAuthStore()

    expect(store.profile).toStrictEqual(initial)

    await store.login('test', 'test')
    expect(store.error).toBe('some-error')
    expect(api).toBeCalledWith('/auth/login', {
      method: 'POST',
      payload: { email: 'test', password: 'test' }
    })
  })

  it('should remove profile and error value during logout', async () => {
    await mockLocalStorage(profile)
    const api = await mockApiClient({
      data: null,
      error: 'some-error'
    })

    const store = useAuthStore()
    expect(store.profile).toBeDefined()

    await store.logout()
    expect(api).toBeCalledWith('/auth/logout')
    expect(store.profile).toBeUndefined()
    expect(store.error).toBe('some-error')
    expect(store.loading).toBeFalsy()
  })

  it('tokenExpired true if token has expired', async () => {
    const store = useAuthStore()
    expect(store.tokenExpired).toBeTruthy()
    profile.expiresAt = dayjs().subtract(60, 'hour').toISOString()
    store.profile = profile
    expect(store.tokenExpired).toBeTruthy()
  })

  it('tokenExpired false if token not expired', async () => {
    const store = useAuthStore()
    profile.expiresAt = dayjs().add(1, 'hour').toISOString()
    store.profile = profile
    expect(store.profile).toStrictEqual(profile)
    expect(store.tokenExpired).toBeFalsy()
  })

  it('refreshTokenExpired true if expired', async () => {
    const store = useAuthStore()
    expect(store.refreshTokenExpired).toBeTruthy()
    profile.refreshExpiresAt = dayjs().subtract(2, 'days').toISOString()
    store.profile = profile
    expect(store.refreshTokenExpired).toBeTruthy()
  })

  it('refreshTokenExpired false if not expired', async () => {
    const store = useAuthStore()
    profile.refreshExpiresAt = dayjs().add(30, 'days').toISOString()
    store.profile = profile
    expect(store.profile).toStrictEqual(profile)
    expect(store.refreshTokenExpired).toBeFalsy()
  })

  it('refreshToken should get token from server', async () => {
    const retVal = {
      data: 'some-profile',
      error: 'some-error'
    }

    const m = await mockApiClient(retVal)
    const store = useAuthStore()

    await store.refreshToken()

    expect(m).toBeCalledWith('/auth/refresh-token')
    expect(store.profile).toBe(retVal.data)
    expect(store.error).toBe(retVal.error)
  })
})
