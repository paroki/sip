import { useLayoutStore } from "~/stores"
import * as config from '~/lib/config'
import { storeHMRUpdate } from "~/lib/common"
import {defineStore} from "pinia"
import fetch from '~/lib/fetch'
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
    loginError: null as string | null,
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

      await fetch('/auth/profile')
        .then((response) => response.json())
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

      return fetch('/auth/login', options)
        .then((response: Response) => {
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
      try{
        await fetch('/auth/logout')
      }catch(e:any){
        console.log(e.message)
      }
      console.log('success')
      this.reset()
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

// storeHMRUpdate(useAuthStore)

