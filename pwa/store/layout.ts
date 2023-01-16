export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => {
    return {
      sidebarVisible: '',
      sidebarUnfoldable: false,
    }
  },
  actions: {},
  getters: {

  },
})

if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore,  import.meta.hot))
}
