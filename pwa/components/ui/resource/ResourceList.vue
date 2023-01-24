<template>
  <CCard class="rs-list">
    <CCardHeader>
      <strong>
        <CIcon icon="cil-user"/>
        {{ title }}
      </strong>
      <div
        id="rs-list-toolbar"
        class="d-inline-flex align-items-end align-middle align-items-baseline"
      >
        <CButton color="success">
          <CIcon icon="cil-note-add"/>
          Baru
        </CButton>
        <span class="rs-list-info">
          <strong>{{ filters.itemsPerPage }}</strong> dari
          <strong>{{ totalItems }}</strong> data
        </span>
      </div>
    </CCardHeader>
    <CCardBody>
      <CTable v-if="items">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <template v-for="col in columns">
              <CTableHeaderCell
                class="rs-list-th"
                :class="!col.sortable || 'sortable'"
                v-if="col.sortable"
                @click="doSort(col)"
              >
                <CIcon icon="cil-sort-alpha-up" v-show="getSortDir(col)==='ASC'"/>
                <CIcon icon="cil-sort-alpha-down" v-show="getSortDir(col)==='DESC'"/>
                {{ col.title || col.field }}
              </CTableHeaderCell>
              <CTableHeaderCell v-else>
                {{ col.title || col.field }}
              </CTableHeaderCell>
            </template>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="item in items">
            <CTableDataCell class="rs-list-resource-nav">
              <CButton size="sm" color="info" v-if="editHref" @click="loadPage(item, editHref)">
                <CIcon icon="cil-magnifying-glass"></CIcon>
              </CButton>
            </CTableDataCell>
            <CTableDataCell v-for="col in columns">
              <CTableDataCell>{{ item[col.field] }}</CTableDataCell>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    <CCardFooter>
      <div id="rs-list-pager">
        <CButton color="primary">
          <CIcon icon="cil-reload"></CIcon>
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>
<script setup lang="ts">
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell
} from "@coreui/vue"
import { CIcon } from "@coreui/icons-vue"
import {IResource} from "~/lib"
// @ts-ignore
import { isEmpty } from "lodash"
import {computed} from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showHref: {
    type: String,
    required: false,
    default: null
  },
  editHref: {
    type: String,
    required: false,
    default: null
  },
  newHref: {
    type: String,
    required: false,
  },
  items:{
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: false,
    default: {
      sorts: {},
      search: {},
      itemsPerPage: 5,
    }
  },
  totalItems: {
    type: Number,
    required: false,
    default: 0
  },
})

const loadPage = (item: IResource, href:string) => {
  href = href.replace('{{id}}', item['@id'])
  href = href.replace('//', '/')
  navigateTo(href, {replace: false})
}

function getSortDir(col: any) {
  const sorts = props.filters.sorts
  let direction = 'ASC'

  if(!isEmpty(sorts[col.field])){
    direction = sorts[col.field] === "ASC" ? "DESC":"ASC"
  }

  return direction
}

function doSort(col: any){
  const sorts = props.filters.sorts
  const dir = getSortDir(col) || 'ASC'

  props.filters.sorts = {
    ...sorts,
    nama: dir
  }
}
</script>
<style scoped>
#rs-list-toolbar {
  position: relative;
  margin-left: 40px;
}

.sortable:hover {
  cursor: pointer !important;
}

.rs-list-resource-nav {
  width: 40px;
}

.rs-list-info {
  margin-left: 24px;
}
</style>
