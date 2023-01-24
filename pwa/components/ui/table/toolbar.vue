<template>
  <div class="table-toolbar">
    <CButton
      v-if="editRef"
      component="a"
      :href="editRef"
      size="sm"
      color="success"
    >
      <CIcon icon="cil-pencil"/>
    </CButton>
    <CButton
      v-if="readRef"
      component="a"
      :href="readRef"
      size="sm"
      color="primary"
    >
      <CIcon icon="cil-magnifying-glass"/>
    </CButton>
    <CButton
      v-if="deleteRef"
      component="a"
      :href="deleteRef"
      size="sm"
      color="danger"
    >
      <CIcon icon="cil-user-x"/>
    </CButton>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DataToolbar',
  props: {
    editRef: {
      type: String,
    },
    readRef: {
      type: String,
    },
    deleteRef: {
      type: String,
    },
  },
}
</script>
<style scoped>
.table-toolbar {
  display: inline-block;
  align-items: center;
  width: 100%;
}
.table-toolbar .btn {
  margin-right: 4px !important;
}
.table-toolbar .btn:last-child {
  margin-right: 0 !important;
}

</style>
