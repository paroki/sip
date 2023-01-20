import { AUTH_PROFILE_KEY } from "~/lib/config"
import { useAuthStore } from "~/stores"

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const publicPages = ['/login', '/logout', '/change-password']
  const authRequired = !publicPages.includes(to.path)

  if('/logout' === to.path){
    await auth.logout()
    return navigateTo('/login');
  }

  if(authRequired){
    await auth.initialize()
    const isLoggedIn = !!auth.profile
    if(!isLoggedIn){
      return navigateTo('/login');
    }
  }
})
