import {IHydraListResponse, IResource} from "~/lib"
import {SubmissionError} from "../common"
import {SubmissionErrorsType} from "../types"
import { defineStore } from "pinia"
import { Nullable } from '~/lib/types'

// @ts-ignore
import { remove } from 'lodash'
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
  violations: null as Nullable<SubmissionErrorsType>,
});

export default function makeCrudStore(name: string){
  const normalizeRelations = (x: IResource) => x
  const resolveRelations = (x: IResource) => x
  return defineStore(name, {
    state: initialState,
    getters: {
      find: (state) => {
        return (id: string) => {
          return state.byId[id]
        }
      }
    },
    actions: {
      fetchAll(retrieved: IHydraListResponse){
        // this.view = retrieved.hasOwnProperty('hydra:view') ?? retrieved['hydra:view']
        this.totalItems = retrieved['hydra:totalItems']
        this.resetList()
        if(this.doResetList){
          this.resetList()
        }

        retrieved["hydra:member"].forEach(item => {
          this.add(normalizeRelations(item))
        })
      },
      add(item: IResource){
        const byId = this.byId
        byId[item['@id']] = item
        this.$patch({
          byId
        })

        if(this.allIds.includes(item['@id'])) return
        const allIds = this.allIds
        allIds.push(item['@id'])
        this.$patch({
          allIds
        })
      },
      create(item: IResource){
        this.loading = false
        this.add(item)
        this.created = item
      },
      update(item: IResource){
        this.updated = item
        this.byId[item['@id']] = item
      },
      delete(deleted: IResource){
        // const byId = remove(this.byId, (id: string) => id === deleted['@id'])
        // const allIds = remove(this.allIds, (item: IResource) => item['@id'] === deleted['@id'])

        this.deleted = deleted
      },
      toggleLoading(){
        this.loading = !this.loading
      },
      setError(e: Error|SubmissionError){
        if (e instanceof SubmissionError) {
          this.violations = e.errors
          // @ts-ignore
          this.error = e.errors._error
        }
      },
      resetError(){
        this.error = null
        this.violations = null
      },
      resetList(){
        this.$patch({
          allIds: [],
          byId: {},
          error: null,
          loading: false,
          doResetList: false,
        })
      },
      resetCreate(){
        this.$patch({
          loading: false,
          error: "",
          created: null,
          violations: null,
        })
      },
      resetUpdate(){
        this.$patch({
          error: null,
          loading: false,
          updated: null,
          violations: null,
        })
      },
      resetDelete(){
        this.$patch({
          loading: false,
          error: "",
          deleted: null,
        })
      },
    }
  })
}
