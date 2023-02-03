import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore, useInitialAuthProfile } from '../auth'
import { tsBootstrapPinia } from '@/test/helpers'
import dayjs from 'dayjs'

describe('useAuthStore', () => {
  let profile = {
    ...useInitialAuthProfile(),
    id: 'some-id',
    nama: 'some user'
  }
  beforeEach(() => {
    tsBootstrapPinia()
  })

  it('should have initial value configured', () => {
    const store = useAuthStore()

    expect(store.profile).toStrictEqual(useInitialAuthProfile())
    expect(store.authenticated).toBeFalsy()
    expect(store.expired).toBeTruthy()
    expect(store.refreshTokenExpired).toBeTruthy()
  })

  it('expired true if token has expires', () => {
    const store = useAuthStore()

    // expired before 5 minutes ago
    profile.expiresAt = dayjs().subtract(5, 'minutes').toISOString()
    store.profile = profile
    expect(store.expired).toBeTruthy()

    profile.expiresAt = dayjs().add(1, 'hours').toISOString()
    store.profile = profile
    expect(store.profile).toStrictEqual(profile)
    expect(store.expired).toBeFalsy()
  })
})
