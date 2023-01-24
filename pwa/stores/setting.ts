import makeCrudStore from "~/lib/crud/store"

export const useUserStore = makeCrudStore('user', '/user')
