import { StoreDefinition } from 'pinia'
import { computed, ComputedRef, onMounted } from 'vue'
// @ts-ignore
import { isArray, isObject, isUndefined, forEach, isEmpty } from 'lodash'
import { IResource, IResourceMap } from '~/lib'

export declare interface IFilterParams {
  [key:string]: string
}

export declare interface IFilters {
  sorts: IFilterParams | {}
  search: IFilterParams | {}
  itemsPerPage: number
  page: number | 1
}

export default function useList (
  storeDefinition: StoreDefinition,
  defaultFilters: IFilters = { sorts: {}, search: {}, itemsPerPage: 5, page: 1 }
) {
  const store = storeDefinition()
  const items: ComputedRef<IResourceMap> = computed(() => {
    return store.list
  })

  const filters: IFilters = reactive(defaultFilters)
  const totalItems: ComputedRef<number> = computed(() => {
    return store.totalItems
  })
  const deleted: ComputedRef<IResource> = computed(() => {
    return store.deleted
  })

  const loadData = async () => {
    const params = generateParams(filters)
    await store.fetchAll(params)
  }

  onMounted(async () => {
    await loadData()
  })

  const generateParams = (filters: IFilters) => {
    const {
      itemsPerPage,
      sorts,
      page,
      search
    } = filters

    const params: any = {}

    if (!isEmpty(sorts)) {
      forEach(sorts, (value: any, property: any) => {
        params[`sort[${property}]`] = value
      })
    }

    params.page = page

    if (itemsPerPage > 0) {
      params.itemsPerPage = itemsPerPage
    }

    if (!isEmpty(search)) {
      forEach(search, (value: any, property: any) => {
        params[property] = value
      })
    }

    return params
  }

  watch(filters, async () => {
    store.doResetList = true
    await loadData()
  })

  return {
    items,
    filters,
    store,
    deleted,
    totalItems
  }
}
