<template>
  <div class="form-toolbar d-inline-flex">
    <CButton v-if="listRef" type="button" color="primary" @click="loadListPage">
      <CIcon icon="cil-arrow-circle-left" />
      Kembali
    </CButton>
    <CButton v-if="handleSubmit" type="button" color="success" @click="onSave">
      <CIcon icon="cil-save" />
      Simpan
    </CButton>
    <CButton type="button" color="info" @click="onReset">
      <CIcon icon="cil-reload" />
      Reset
    </CButton>
    <CButton v-if="handleDelete" type="button" color="danger" @click="onDelete">
      <CIcon icon="cil-trash" />
      Hapus
    </CButton>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  listRef: {
    type: String,
    required: false,
    default: () => ''
  },
  handleSubmit: {
    type: Function,
    required: false
  },
  handleDelete: {
    type: Function,
    required: false
  },
  handleReset: {
    type: Function,
    required: false
  },
  validator: {
    type: Object,
    required: true
  }
})

// eslint-disable-next-line require-await
const onSave = async () => {
  const validator = props.validator
  validator.$clearExternalResults()

  const valid = validator.$validate()
  if (valid && props.handleSubmit) {
    props.handleSubmit(props.validator.item.$model)
  }
}

const onDelete = () => {
  if (props.handleDelete) {
    props.handleDelete()
  }
}

const onReset = () => {
  props.validator.$reset()
  props.validator.$clearExternalResults()
  if (props.handleReset) {
    props.handleReset()
  }
}

const loadListPage = () => {
  if (props.listRef) {
    navigateTo(props.listRef, { replace: false })
  }
}

</script>
<style scoped>
.form-toolbar button {
  margin-right: 8px;
}
</style>
