<template>
  <CCard>
    <CCardHeader>
      <CIcon v-if="!!icon" :icon="icon" style="margin-right: 8px !important;"/>
      <strong>{{  title }}</strong>
    </CCardHeader>
    <CCardBody>
      <slot/>
    </CCardBody>
    <CCardFooter
      v-if="listHref || newHref"
    >
      <CButton
        type="button"
        color="primary"
        v-if="listHref"
        :href="listHref"
        component="a"
      >
        <CIcon icon="cil-arrow-circle-left"/>
        Kembali
      </CButton>
      <CButton
        type="button"
        color="primary"
        v-if="newHref"
        :href="newHref"
        component="a"
      >
        <CIcon icon="cil-plus"/>
        Baru
      </CButton>
      <CButton
        type="button"
        color="danger"
        v-if="deleteHandler"
        @click="onDelete"
      >
      <CIcon icon="cil-trash"/>
      Hapus
    </CButton>
    </CCardFooter>
  </CCard>
</template>

<script lang="ts">
export default defineComponent({
  name: "AppContainer",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      required: false,
      type: String
    },
    listHref: {
      required: false,
      type: String
    },
    newHref: {
      required: false,
      type: String
    },
    deleteHandler: {
      required: false,
      type: Function
    }
  },
  methods: {
    onDelete(){
      if(this.deleteHandler){
        this.deleteHandler()
      }
    }
  }
})
</script>

<style scoped>

</style>
