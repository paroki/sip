<template>
  <ResourceList
    title="User"
    :items="items"
    :columns="columns"
    :filters="filters"
    :edit-href="isGranted('ROLE_ADMIN') ? `/setting/{{id}}/edit`:''"
    :total-items="totalItems"
  />
</template>
<script setup lang="ts">
import ResourceList from '~/components/ui/resource/ResourceList.vue'
import useList from '~/lib/crud/composable/list'
import { useUserStore } from '~/stores/setting'
import { isGranted } from '~/lib'
import useNotification from "~/lib/notification"

const defaultFilters = {
  sorts: { nama: 'ASC' },
  search: { active: 1 },
  itemsPerPage: 10,
  page: 1
}
const {
  items,
  filters,
  totalItems,
  deleted
} = useList(useUserStore, defaultFilters)
const { showMessage } = useNotification()

const columns = [
  {
    title: 'Nama',
    field: 'nama',
    sortable: true
  },
  {
    title: 'Email',
    field: 'email'
  }
]

watch(deleted, () =>  {
  console.log(deleted)
  showMessage(`User <strong>${deleted.value.nama}</strong> berhasil dihapus.`)
})
</script>
