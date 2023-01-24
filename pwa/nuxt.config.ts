// https://nuxt.com/docs/api/configuration/nuxt-config
const isProduction = 'production' === process.env.NODE_ENV

export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  modules: [
    [
      '@pinia/nuxt',
      {
        disableVuex: true,
        autoImports: [
          'defineStore',
          'mapState',
          'mapWritableState',
          'mapActions',
          'mapGetters'
        ]
      }
    ]
  ],

  head: {
    title: 'SIP',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge'},
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'nuxt-spa-boilerplate' },
      { name: 'msapplication-TileColor', content: '#ffffff'},
      { name: 'theme-color', content: '#ffffff'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/sip.scss'
  ],

  buildModules: [
  ],

  vite: {
    server: {
      hmr: {
        port: 3001,
      }
    }
  },
  router: {
    options: {
      hashMode: true,
      linkActiveClass: 'active',
    },
  },
  pwa: {
    workbox: {
      enabled: isProduction
    }
  },
})
