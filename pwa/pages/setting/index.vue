<script lang="ts" setup>
import type { TableHeader } from '~/types'

const { useListStore } = useUserResource
const headers = [
  {
    title: 'actions',
    key: 'actions',
    sortable: false
  },
  {
    title: 'Nama',
    key: 'nama',
    sortable: true
  },
  {
    title: 'Email',
    key: 'email',
    sortable: true
  }
] as TableHeader[]
</script>
<template>
  <div>
    <h3>User</h3>
    <hr>
    <ResourceTable
      :store-definition="useListStore"
      :headers="headers"
    />
  </div>
</template>
