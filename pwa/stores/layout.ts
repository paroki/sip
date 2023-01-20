import {storeHMRUpdate} from "~/lib/helpers"

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawerOpen: true,
    loading: false,
    sidebarVisible: true,
    sidebarUnfoldable: false,
    routes: {}
  }),

  actions: {
    toggleLoading(){
      this.loading = !this.loading
    },
    toggleSidebar(){
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleUnfoldable(){
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
    updateSidebarVisible(payload: boolean){
      this.sidebarVisible = payload
    }
  }
})

storeHMRUpdate(useLayoutStore)
