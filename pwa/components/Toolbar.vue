<template>
  <div class="form-toolbar">
    <CButton
      v-if="handleSubmit"
      color="success"
      @click="submitItem"
      type="button"
    >
      <CIcon icon="cil-save"/>
      Simpan
    </CButton>
    <CButton
      v-if="handleReset"
      color="info"
      @click="resetItem"
      type="button"
    >
      <CIcon icon="cil-reload"/>
      Reset
    </CButton>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    handleSubmit: {
      type: Function,
      required: false
    },
    handleReset: {
      type: Function,
      required: false
    },
    handleDelete: {
      type: Function,
      required: false
    },
    handleAdd: {
      type: Function,
      required: false
    },
  },
  methods: {
    async submitItem(){
      if(this.handleSubmit){
        await this.handleSubmit()
      }
    },
    resetItem() {
      if (this.handleReset) {
        this.handleReset();
      }
    }
  }
}
</script>

<style scoped>
.form-toolbar {
  margin-top: 16px!important;
}
.form-toolbar .btn {
  margin-right: 8px!important;
}
.form-toolbar .btn:last-child {
  margin-right: 0 !important;
}
</style>
