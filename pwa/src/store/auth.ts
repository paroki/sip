import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ApiResponseError } from '@doyolabs/api-client-core'
import dayjs from 'dayjs'

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

      const expiry = dayjs(profile.expiresAt).subtract(5, 'minute')

      console.log(expiry.diff(dayjs(), 'minute'))
      return expiry.isBefore(dayjs())
    },
    refreshTokenExpired: ({ profile }) => {
      if (!profile?.refreshExpiresAt) return true
    },
  },
})
