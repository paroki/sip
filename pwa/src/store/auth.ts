import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { type ApiResponseError, useApiClient } from '@doyolabs/api-client-core'
import dayjs from 'dayjs'
import type { AssociativeArray } from '@/types'

export interface AuthProfile {
  id?: string
  nama?: string
  roles?: string[]
  expiresAt?: string
  refreshExpiresAt?: string
}

export const useInitialAuthProfile = (): AuthProfile => {
  return {
    id: undefined,
    nama: undefined,
    roles: undefined,
    expiresAt: undefined,
    refreshExpiresAt: undefined,
  }
}

export interface AuthState {
  profile?: AuthProfile
  error?: ApiResponseError<AuthProfile>
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    profile: <AuthProfile>(
      useLocalStorage('auth.profile', useInitialAuthProfile())
    ),
    error: undefined,
  }),
  getters: {
    authenticated: (state) => {
      if (!state.profile?.id) return false
      return !state.profile.id ? false : true
    },
    expired: ({ profile }) => {
      if (!profile?.expiresAt) return true

      const expiresAt = dayjs(profile.expiresAt)
      const duration = expiresAt.diff(dayjs(), 'minutes')

      return duration <= 5
    },
    refreshTokenExpired: ({ profile }) => {
      if (!profile?.refreshExpiresAt) return true

      const refreshExpiresAt = dayjs(profile.refreshExpiresAt)
      const duration = refreshExpiresAt.diff(dayjs(), 'days')

      return duration <= 1
    },
  },
  actions: {
    async login(payload: AssociativeArray<string>) {
      const api = useApiClient()

      const { data, error } = await api<AuthProfile>('/auth/login', {
        method: 'POST',
        payload,
      })
      this.profile = data
      this.error = error
    },
    async logout() {
      const api = useApiClient()

      const { error } = await api<AuthProfile>('/auth/logout')
      this.error = error
      this.profile = useInitialAuthProfile()
    },
    async refreshToken() {
      const api = useApiClient()

      const { data, error } = await api<AuthProfile>('/auth/refresh-token')
      this.error = error
      this.profile = data
    },
  },
})
