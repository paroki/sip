import {StoreDefinition} from "pinia"
import {ICrudService } from "~/lib"
import {onMounted, watch, onBeforeMount} from "vue"
import {StringAssociativeArray} from "~/lib/types"
// @ts-ignore
import { isEmpty, forEach } from 'lodash'
import useNotification from "~/components/crud/notification"

export declare interface IFilters {
  sortBy: string[] | []
  sortDesc: string[]
  page: number | 1
  itemsPerPage: number | 10
  search: [key: string] | {}
}

export declare interface IListOptions {
  filters: IFilters
  totalItems: number | 0
}

export function useList(
  storeDefinition: StoreDefinition,
  service: ICrudService,
  defaultFilters: IFilters,
){
  const store = storeDefinition()

  const options: IListOptions = reactive({
    filters: defaultFilters,
    totalItems: computed(() => store.totalItems)
  })

  const filters = reactive({})
  const items = computed(() => store.byId)
  const deletedItems = computed(() => store.deleted)
  const { showMessage } = useNotification()

  const generateFilters = ({
    page,
    itemsPerPage,
    sortBy,
    sortDesc,
    search
  }: IFilters) => {

    let params: StringAssociativeArray = {
      ...filters
    }

    if(itemsPerPage > 0){
      params = { ...params,itemsPerPage, page}
    }

    if(!isEmpty(sortBy)){
      params[`sort[${sortBy[0]}]`] = sortDesc[0] ? "desc" : "ASC";
    }

    if(!isEmpty(search)){
      forEach(search, (key: string, value: string) => {
        params[value] = key
      })
    }
    return params
  }

  const onUpdateOptions = (soptions:IListOptions) => {
    store.doResetList = true
    const filters = generateFilters(soptions.filters)
    Object.assign(options, {
      ...soptions
    })
    service.fetchAll(filters)
  }

  onMounted(async () => {
    console.log('mounted')
    const params = generateFilters(defaultFilters)
    await service.fetchAll(params)
  })

  const onSendFilter = () => {
    store.doResetList = true
    onUpdateOptions(options)
  }

  watch(items, () => {
    options.totalItems = store.totalItems
  })

  return {
    items,
    options,
    filters,
    loading: computed(() => store.loading),
    deletedItems,
    showMessage,
    onSendFilter
  }
}
