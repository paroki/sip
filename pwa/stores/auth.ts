import { useLayoutStore } from "~/stores"
import * as config from '~/lib/config'
import {storeHMRUpdate} from "~/lib/helpers"
import api from "~/lib/api"
import {ROLE_ADMIN, ROLE_KEUSKUPAN_ADMIN, ROLE_PAROKI_ADMIN} from "~/lib/config"

export const AUTH_PROFILE_KEY = 'PROFILE'

interface AuthProfile {
  id: string,
  nama: string,
  roles: string[],
  routes: object
}

export const useAuthStore = defineStore('auth', {

  state: () => ({
    initialized: false,
    profile: null as AuthProfile | null,
    checkProfileError: null as string | null,
    loginError: null as string | null
  }),

  getters: {
    loggedIn: (state) => !!state.profile,
    routes: (state) => state.profile ? state.profile.routes : {},
    isGranted: (state) => {
      return (role: string) => state.profile ? state.profile.roles.includes(role):false
    }
  },

  actions: {
    async initialize(){
      if(this.initialized){
        return;
      }
      const data = localStorage.getItem(config.AUTH_PROFILE_KEY)
      if(data){
        this.profile = JSON.parse(data)
      }else{
        this.checkProfile()
      }

      this.initialized = true
    },

    async checkProfile(){
      if(null !== this.loginError){
        return
      }
      this.toggleLoading()
      this.reset()

      await api.fetch('/auth/profile')
        .then(response => response.json())
        .then(data => {
          this.saveProfile(data)
        })
        .catch(err => {
          this.checkProfileError = err.message
        })

      this.initialized = true
      this.toggleLoading()
    },

    login(email: string, password: string){
      this.toggleLoading()
      this.reset()
      const options = {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      }

      return api.fetch('/auth/login', options)
        .then(response => {
          this.toggleLoading()
          if(200 == response.status){
            return this.checkProfile()
          }
        })
        .catch(err => {
          this.toggleLoading()
          this.loginError = err.message
        })
    },

    async logout(){
      await fetch('/auth/logout').then((data) => {
        this.reset()
      })
    },

    saveProfile(data: any){
      localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(data))
      this.profile = data
    },

    reset(){
      localStorage.removeItem(AUTH_PROFILE_KEY)
      this.loginError = null
      this.checkProfileError = null
      this.profile = null
    },

    toggleLoading(){
      const layout = useLayoutStore()
      layout.toggleLoading()
    }
  }
})

storeHMRUpdate(useAuthStore)

