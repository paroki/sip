<template>
  <CCard>
    <CCardHeader>
      <CIcon v-if="!!icon" :icon="icon" style="margin-right: 8px !important;"/>
      <strong>{{  title }}</strong>
    </CCardHeader>
    <CCardBody>
      <slot/>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: "AppContainer",
  props: {

    title: {
      type: String,
      required: true,
    },
    icon: {
      required: false,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
