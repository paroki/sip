import CoreuiVue from "@coreui/vue"
import { iconsSet as icons } from "assets/icons"
import {CIcon} from "@coreui/icons-vue"
import {getRoutes} from "~/lib/common"
import Routing from '~/vendor/jsrouting-bundle/router'

export default defineNuxtPlugin(async(nuxtApp) => {
  nuxtApp.vueApp.use(CoreuiVue)
  nuxtApp.vueApp.provide('icons', icons)
  nuxtApp.vueApp.component('CIcon', CIcon)

  const routes = await getRoutes()
  Routing.setRoutingData(routes)

})
