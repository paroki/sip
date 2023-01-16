// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'mapState', "mapActions", "mapWritableState"]
      }
    ],
  ],
  css: [
    '~/assets/scss/main.scss'
  ]
})
