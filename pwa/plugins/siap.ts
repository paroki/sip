import CoreuiVue from "@coreui/vue"
import CIcon from "@coreui/icons-vue"
import { iconsSet as icons } from "~/assets/icons"

export default defineNuxtPlugin( (nuxtApp) => {
    nuxtApp.vueApp.use(CoreuiVue)
    nuxtApp.vueApp.provide('icons', icons)
    nuxtApp.vueApp.component('CIcon', CIcon)
})
