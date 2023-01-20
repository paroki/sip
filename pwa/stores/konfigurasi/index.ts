import makeCrudStore from '~/stores/crud'
import makeService from "~/lib/service"

export const useUserService = makeService('/user')
export const useUserStore = makeCrudStore({
  name: 'user',
  service: useUserService
})
