import {useAuthStore} from "~/stores"
import {ROLE_ADMIN} from "~/lib/config"

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  if(!auth.isGranted(ROLE_ADMIN)){
    return navigateTo('/unauthorized')
  }
})
