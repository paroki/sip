import { defineStore, StoreDefinition } from 'pinia'
// @ts-ignore
import { remove } from 'lodash'
import makeApiService, { IResource } from '~/lib/crud/api'
import { Nullable, storeHMRUpdate, SubmissionError, SubmissionErrorsType } from '~/lib'

const handleError = (storeDefinition:StoreDefinition, e: Error|SubmissionErrorsType) => {
  const store = storeDefinition()
  store.toggleLoading()

  if (e instanceof SubmissionError) {
    store.setViolations(e.errors)
    store.setError(e.errors._error)
    return Promise.reject(e)
  }

  store.setError(e.message)
  return Promise.reject(e)
}

const initialState = () => ({
  allIds: [] as string[],
  byId: {} as {[key: string]: IResource},
  created: null as Nullable<IResource>,
  deleted: null as Nullable<IResource>,
  updated: null as Nullable<IResource>,
  error: null as Nullable<string>,
  loading: false as boolean,
  doResetList: false as boolean,
  selectItems: null as Nullable<string>,
  totalItems: 0 as number,
  view: null as Nullable<string>,
  violations: null as Nullable<SubmissionErrorsType>
})

export declare interface IResourceMap {
  [key: string]: IResource
}
export default function makeCrudStore (
  name: string,
  endPoint: string
): StoreDefinition {
  const service = makeApiService(endPoint)
  const normalizeRelations = (x: IResource) => x
  const resolveRelations = (x: IResource) => x

  const definition = defineStore(name, {
    state: initialState,
    getters: {
      find: (state) => {
        return (id: string) => {
          return resolveRelations(state.byId[id])
        }
      },
      list: (state) => {
        return state.allIds.map((id) => {
          // @ts-ignore
          return state.find(id)
        })
      }
    },
    actions: {
      toggleLoading () {
        this.$patch((state) => {
          state.loading = !state.loading
        })
      },
      setError (message: string | null) {
        this.error = message
      },
      setViolations (errors: SubmissionErrorsType|{}) {
        this.violations = errors
      },
      add (item: IResource) {
        this.$patch((state) => {
          state.byId[item['@id']] = item
          if (state.allIds.includes(item['@id'])) { return }
          state.allIds.push(item['@id'])
        })
      },
      load (id: string) {
        this.toggleLoading()
        return service
          .find(id)
          .then(response => response.json())
          .then((item) => {
            this.toggleLoading()
            this.add(normalizeRelations(item))
          })
      },
      create (item: IResource) {
        return service
          .create(item)
          .then(response => response.json())
          .then((created:IResource) => {
            this.toggleLoading()
            this.add(created)
            this.created = created
          })
      },
      update (item: IResource): Promise<any> {
        this.resetError()
        this.toggleLoading()
        return service
          .update(item)
          .then(response => response.json())
          .then((data: IResource) => {
            this.toggleLoading()
            this.setUpdated(data)
          })
          .catch(e => handleError(definition, e))
      },
      setUpdated (updated: IResource) {
        this.byId[updated['@id']] = updated
        this.updated = updated
      },
      delete (item: IResource): any {
        this.toggleLoading()
        return service
          .delete(item)
          .then(() => {
            this.toggleLoading()
            this.setDeleted(item)
          })
          .catch(e => handleError(definition, e))
      },
      setDeleted (deleted: IResource) {
        if (!this.allIds.includes(deleted['@id'])) { return }
        this.$patch({
          allIds: remove(this.allIds, (item:IResource) => item['@id'] === deleted['@id']),
          deleted
        })
        if (this.byId.hasOwnProperty(deleted['@id'])) {
          delete this.byId[deleted['@id']]
        }
      },
      fetchAll (params: string[] = []): any {
        this.toggleLoading()
        return service
          .findAll({ params })
          .then(response => response.json())
          .then((retrieved) => {
            this.toggleLoading()
            this.totalItems = retrieved['hydra:totalItems']
            this.view = retrieved['hydra:view']

            if (this.doResetList) {
              this.resetList()
            }

            retrieved['hydra:member'].forEach((item:IResource) => {
              this.add(normalizeRelations(item))
            })
          })
          .catch(e => handleError(definition, e))
      },
      resetList () {
        this.$patch({
          allIds: [],
          byId: {},
          error: null,
          loading: false,
          doResetList: false
        })
      },
      resetShow () {
        this.$patch({
          error: null,
          loading: false
        })
      },
      resetError () {
        this.error = null
      },
      resetCreate () {
        this.$patch({
          loading: false,
          error: null,
          created: null,
          violations: null
        })
      },
      resetUpdate () {
        this.$patch({
          error: null,
          loading: false,
          updated: null,
          violations: null
        })
      },
      resetDelete () {
        this.$patch({
          loading: false,
          error: null,
          deleted: null
        })
      }
    }
  })

  storeHMRUpdate(definition)
  return definition
}
