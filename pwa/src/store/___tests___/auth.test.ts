import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore, useInitialAuthProfile, type AuthProfile } from '../auth'
import { tsBootstrapPinia, tsMockApiClient } from '@/test/helpers'
import dayjs from 'dayjs'
import type { ApiResponseError } from '@doyolabs/api-client-core'
import Routing from 'fos-router'

vi.mock('@doyolabs/api-client-core')

describe('useAuthStore', () => {
  let profile: AuthProfile

  beforeEach(() => {
    tsBootstrapPinia()
    profile = {
      ...useInitialAuthProfile(),
      id: 'some-id',
      nama: 'some user',
    }
  })

  it('should have initial value configured', () => {
    const store = useAuthStore()

    expect(store.profile).toStrictEqual(useInitialAuthProfile())
    expect(store.authenticated).toBeFalsy()
    expect(store.expired).toBeTruthy()
    expect(store.refreshTokenExpired).toBeTruthy()
  })

  describe('expired', () => {
    it('true if expires in 5 minutes ago', () => {
      const store = useAuthStore()

      // expired before 5 minutes ago
      profile.expiresAt = dayjs().subtract(5, 'minutes').toISOString()
      store.profile = profile
      expect(store.expired).toBeTruthy()
    })

    it('expired false with expires in next 1 hour', () => {
      const store = useAuthStore()
      profile.expiresAt = dayjs().add(1, 'hour').toISOString()
      store.profile = profile
      expect(store.expired).toBeFalsy()
    })
  })

  describe('refreshExpired', () => {
    it('true if expires in 1 days ago', () => {
      const store = useAuthStore()

      // expired before 5 minutes ago
      profile.refreshExpiresAt = dayjs().subtract(1, 'days').toISOString()
      store.profile = profile
      expect(store.refreshTokenExpired).toBeTruthy()
    })

    it('false with expires after next 5 days', () => {
      const store = useAuthStore()
      profile.refreshExpiresAt = dayjs().add(5, 'days').toISOString()
      store.profile = profile
      expect(store.refreshTokenExpired).toBeFalsy()
    })
  })

  describe('login', () => {
    it('save profile during user login', async () => {
      const store = useAuthStore()
      const expected = {
        data: profile,
        error: { some: 'error' } as ApiResponseError<AuthProfile>,
      }
      const fn = await tsMockApiClient(expected)
      const payload = { email: 'email', password: 'password' }

      store.profile = useInitialAuthProfile()
      await store.login(payload)

      expect(fn).toBeCalledWith('/auth/login', {
        method: 'POST',
        payload,
      })
      expect(store.profile?.id).toBe('some-id')
      expect(store.error).toStrictEqual(expected.error)
    })
  })

  describe('logout', () => {
    it('reset profile after logged out', async () => {
      const store = useAuthStore()
      const expected = {
        error: { some: 'error' } as ApiResponseError<AuthProfile>,
      }
      const fn = await tsMockApiClient(expected)

      await store.logout()

      expect(fn).toBeCalled()
      expect(store.profile).toStrictEqual({})
      expect(store.error).toStrictEqual(expected.error)
    })
  })

  describe('refreshToken', () => {
    it('save new refreshed login profile', async () => {
      const store = useAuthStore()
      const expected = {
        error: { some: 'error' } as ApiResponseError<AuthProfile>,
        data: {
          ...profile,
          expiresAt: dayjs().subtract(1, 'hour').toISOString(),
          refreshExpiresAt: dayjs(3, 'hour').toISOString(),
        } as AuthProfile,
      }
      const m = await tsMockApiClient<AuthProfile>(expected)

      await store.refreshToken()

      expect(m).toBeCalledWith('/auth/refresh-token')
      expect(store.profile?.expiresAt).toStrictEqual(expected.data.expiresAt)
      expect(store.profile?.refreshExpiresAt).toStrictEqual(
        expected.data.refreshExpiresAt
      )

      expect(Routing.generate('auth_refresh_token')).toBe('hello world')
    })
  })
})
