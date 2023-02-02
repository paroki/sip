<!-- eslint-disable vue/v-on-event-hyphenation -->
<script lang="ts" setup>
import type { StoreDefinition } from 'pinia'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import AppError from '../ui/AppError.vue'
import type { TableHeader, TableFilters, TableOrder } from '~/types'

const props = defineProps<{
  storeDefinition: StoreDefinition,
  headers: TableHeader[]
}>()

const page = ref(1)
const sorts: Ref<TableOrder[]> = ref([])
const filters: Ref<TableFilters> = ref({})
const itemsPerPage = ref(10)

const store = props.storeDefinition()
async function loadItems () {
  const sort: {[key: string]: string} = {}
  if (sorts.value.length > 0) {
    sorts.value.forEach((val) => {
      sort[val.key] = val.order
    })
  }

  const params = {
    page: page.value,
    sort,
    itemsPerPage: itemsPerPage.value,
    ...filters.value
  }

  await store.loadItems(params)
}
const { items, totalItems, loading } = storeToRefs(store)
watchLoading(loading)

// await loadItems()
</script>
<template>
  <div>
    <AppError />
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sorts"
      v-model:items="items"
      v-model:items-length="totalItems"
      v-model:page="page"
      :headers="headers"
      @update:options="loadItems"
    />
  </div>
</template>
