<template>
  <AppContainer title="User" icon="cil-user">
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Nama</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-if="items" :key="item['id']" v-for="item in items">
          <CTableDataCell>
            <div>
              <CButton size="sm" :href="item['@id'] + '/edit'" component="a" color="success">
                <CIcon icon="cil-pencil"/>
              </CButton>
              <CButton size="sm" :href="item['@id']" color="danger">
                <CIcon icon="cil-user-x"/>
              </CButton>
            </div>
          </CTableDataCell>
          <CTableDataCell>{{ item.nama }}</CTableDataCell>
          <CTableDataCell>{{ item.email }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </AppContainer>
</template>

<script lang="ts">
import AppUnderConstruction from "~/components/ui/AppUnderConstruction.vue"
import AppContainer from "~/components/ui/AppContainer.vue"
import { useUserStore } from '~/stores/konfigurasi'
import list from "~/lib/crud/list"

definePageMeta({
  middleware: 'is-admin'
})
export default {
  name: 'UserIndex',
  mixins: [list],
  components: {AppContainer, AppUnderConstruction},
  data: () => {
    return {
      columns: [
        {
          label: '#'
        },
        {
          key: 'nama',
          label: 'Nama',
          colspan: 2,

        }
      ],
    }
  },
  computed: {
    ...mapGetters(useUserStore, {
      items: 'list'
    }),
    ...mapState(useUserStore, {
      deletedItem: 'deleted',
      error: 'error',
      loading: 'loading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  mounted() {
    this.store.fetchAll()
  },
  async setup(){
    const store = useUserStore()
    // await store.fetchAll()

    // const lists = store.lists
    return {
      store,
      //lists
    }
  },
  methods: {
  }
}
</script>
