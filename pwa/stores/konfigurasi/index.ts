import makeCrudStore from '~/stores/crud'
import makeService from "~/lib/service"

export const useUserService = makeService('/user')
export const useUserStore = defineStore('user', {
  state: () => ({
    byId: {},
    allIds: [],
    created: null,
    updated: null,
    deleted: null,
    totalItems: 0,
    view: null,
    loading: false,
    resetList: false,
    error: null
  }),
  getters: {
    find: (state) => {
      return (id) => {
        return state.byId[id]
      }
    },
    list: (state) => {
      const test = state.allIds.map(id => {
        return state.byId[id]
      })
      if(test.length) return test
      return []
    }
  },
  actions: {
    toggleLoading(){
      this.loading = !this.loading
    },
    async fetchAll(params){
      this.toggleLoading()
      return service
        .findAll({params})
        .then(response => response.json())
        .then(retrieved => {
          this.toggleLoading()
          this.totalItems = retrieved['hydra:totalItems']
          this.view = retrieved['hydra:view']
          if(true === this.resetList){
            this.resetList()
          }
          retrieved['hydra:member'].forEach(item => {
            this.add(item)
          })
        })
    },
    add(item){
      this.byId[item['@id']] = item
      if(this.allIds.includes(item['@id'])) return
      this.allIds.push(item['@id'])
    },
    load(id){
      if (!service) throw new Error('No service specified!');
      this.toggleLoading()
      return service
        .find(id)
        .then(response => response.json())
        .then(item => {
          this.toggleLoading()
          // commit(ACTIONS.ADD, normalizeRelations(item));
          this.add(item)
        })
        .catch(e => handleError(this, e));
    },
    resetCreate(){
      Object.assign(this.$state, {
        isLoading: false,
        error: '',
        created: null,
        violations: null
      });
    },
    resetDelete(){
      Object.assign(this.$state, {
        isLoading: false,
        error: '',
        deleted: null
      });
    },
    resetList(){
      Object.assign(this.$state, {
        allIds: [],
        byId: {},
        error: '',
        isLoading: false,
        resetList: false
      })
    },
    resetShow(){
      Object.assign(this.$state, {
        error: '',
        isLoading: false
      });
    },
    resetUpdate(){
      Object.assign(this.$state, {
        error: '',
        isLoading: false,
        updated: null,
        violations: null
      });
    },
    update: (item) => {
      // this.toggleLoading()
      this.toggleLoading()
      this.updated = service
        .update(item)
        .then(response => response.json())
        .then(retrieved => retrieved)
        .catch(e => {
          console.log(e.message)
        });
    }
  }
})
