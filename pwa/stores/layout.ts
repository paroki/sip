
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
    setLoading (value: boolean) {
      this.loading = value
    },
    toggleRail () {
      this.rail = !this.rail
    }
  }
})
