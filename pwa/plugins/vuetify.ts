import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      VDataTableServer,
    },
    directives
  })

  nuxtApp.vueApp.use(vuetify)
})
