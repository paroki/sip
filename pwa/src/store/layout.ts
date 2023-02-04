import { defineStore } from 'pinia'

export interface LayoutState {
  loading: boolean
  rail: boolean
  drawer: boolean
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    loading: false,
    rail: false,
    drawer: true
  }),
  actions: {
    toggleDrawer(){
      this.drawer = !this.drawer
    },
    toggleRail(){
      this.rail = !this.rail
    },
    toggleLoading(){
      this.loading = !this.loading
    }
  }
})
