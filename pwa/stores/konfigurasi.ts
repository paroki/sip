import makeApiService from "~/lib/service/api"
import makeCrudStore from "~/lib/service/store"
import makeCrudService from "~/lib/service/crud"
import {storeHMRUpdate} from "~/lib/common"

export const useUserStore = makeCrudStore('user')
export const useUserApi = makeApiService('/user')
export const useUserService = makeCrudService(useUserStore, useUserApi)
storeHMRUpdate(useUserStore)
