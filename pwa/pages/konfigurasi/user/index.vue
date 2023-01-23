<template>
  <AppContainer title="User" icon="cil-user">

    <CTable class="table-data">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell></CTableHeaderCell>
          <CTableHeaderCell>Nama</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-if="items" :key="item['id']" v-for="item in items">
          <CTableDataCell>
            <DataToolbar
              :editRef="!isGranted('ROLE_ADMIN') ?  null:`#/konfigurasi${item['@id']}/edit`"
              :deleteRef="!isGranted('ROLE_ADMIN') ?  null:`#/konfigurasi${item['@id']}/delete`"
            />
          </CTableDataCell>
          <CTableDataCell>{{ item.nama }}</CTableDataCell>
          <CTableDataCell>{{ item.email }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </AppContainer>
</template>

<script setup lang="ts">
import {useUserService, useUserStore} from "~/stores/konfigurasi"
import AppContainer from "~/components/ui/AppContainer"
import { isGranted } from "~/lib/auth"
import { useList } from "~/lib"
import DataToolbar from '~/components/ui/table/toolbar'
import { IUser } from "~/lib"
import {onMounted} from "vue"

const {
  items,
  deletedItems,
  showMessage
} = useList(useUserStore, useUserService,{
  sortBy: ['nama'],
  sortDesc: [],
  page: 1,
  itemsPerPage: 10,
  search: {
    active: true
  }
})

watch(deletedItems, () => {
  showMessage(`User <strong>${deletedItems.nama}</strong> berhasil dihapus` )
})

watch(items, () => {
  console.log(items)
})

</script>

<style scoped>
.table-data thead th:first-child {
  width: 120px !important;
}

.table-data tbody td:first-child {

}

</style>
