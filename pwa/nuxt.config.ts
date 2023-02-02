// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        disableVuex: true,
        autoImports: ['defineStore']
      }
    ],
    '@vueuse/nuxt'
  ],
  vite: {
    server: {
      hmr: {
        port: 3001
      }
    }
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'roboto-fontface/css/roboto/roboto-fontface.css',
    '~/assets/sass/main.scss'
  ],
  build: {
    transpile: [
      'vuetify'
    ]
  }
})
