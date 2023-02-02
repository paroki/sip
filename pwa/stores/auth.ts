import type { ApiResponseError } from '@doyolabs/api-client-core'
import { useApi, useApiClient } from '@doyolabs/api-client-core'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { m } from 'vitest/dist/types-aac763a5'
import { router } from '~/composables'

export interface Profile {
  id?: string,
  nama?: string,
  expiresAt?: string,
  refreshExpiresAt?: string,
  roles?: string[]
}

export interface UserState {
  profile?: Profile|{},
  error?: ApiResponseError<Profile>,
  loading: boolean,
}

export const useAuthStore = defineStore('user', {
  state: (): UserState => ({
    profile: useLocalStorage<Profile>('profile', {}),
    error: undefined,
    loading: false
  }),
  getters: {
    authenticated: (state) => {
      if (!state?.profile?.expiresAt) { return false }

      return true
    },
    tokenExpired: (state) => {
      // returns true when user not login
      if (!state?.profile) { return true }

      const profile = state?.profile as Profile
      const expiresAt = dayjs(profile.expiresAt)
      const duration = expiresAt.diff(dayjs(), 'minutes')

      return duration <= 5
    },
    refreshTokenExpired: (state) => {
      // returns true when user not login
      if (!state?.profile) { return true }

      const profile = state?.profile as Profile
      const refreshExpiresAt = dayjs(profile.refreshExpiresAt)
      const duration = refreshExpiresAt.diff(dayjs(), 'days')

      return duration <= 1
    }
  },
  actions: {
    toggleLoading () {
      this.loading = !this.loading
    },
    resetError () {
      this.error = undefined
    },
    async login (payload: object) {
      this.toggleLoading()
      this.resetError()
      const url = '/auth/login' // router.generate('auth_login')
      const api = useApiClient()

      const { data, error } = await api<Profile>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      this.profile = data
      this.error = error
      this.toggleLoading()
    },
    async logout () {
      this.toggleLoading()
      this.resetError()

      const url = router.generate('auth_logout')
      const api = useApiClient()

      const { error } = await api<Profile>(url)

      this.profile = undefined
      this.error = error

      this.toggleLoading()
    },
    async refreshToken () {
      this.toggleLoading()
      this.resetError()

      const api = useApiClient()
      const url = router.generate('auth_refresh_token')
      const { data, error } = await api<Profile>(url)

      this.profile = data
      this.error = error
    }
  }
})
