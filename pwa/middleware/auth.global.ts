import { useAuthStore } from '~~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const publics = ['/login', '/logout']

  if(publics.includes(to.path)) return

  const store = useAuthStore()

  if(!store.authenticated){
    navigateTo('/login')
  }

  // try to use refresh token first
  if(store.tokenExpired && !store.refreshTokenExpired){
    store.refreshToken()
  }

  if(store.tokenExpired) return navigateTo('/login')
})
