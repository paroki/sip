/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '@/router'

// Types
import type { App } from 'vue'
import { createPinia } from 'pinia'
import sip from './sip'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .use(sip)
}
