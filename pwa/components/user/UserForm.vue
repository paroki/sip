<template>
  <CForm>
    <CFormInput
      type="text"
      key="nama"
      label="Nama"
      v-model="item.nama"
    />
    <CFormInput
      type="text"
      id="email"
      label="Email"
      v-model="item.email"
    />
  </CForm>
</template>

<script>

import { validationMixin } from 'vuelidate';

export default {
  name: "UserForm",
  // mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      default: () => {}
    },
    initialValues: {
      type: Object,
      default: () => {}
    },
    handleSubmit: {
      type: Function,
      required: false
    }
  },
  data: () => ({
    nama: null,
    email: null,
  }),
  computed: {
    item(){
      return this.initialValues || this.values
    },
  },
  methods: {
    updateProfile(){
      console.log('update')
    }
  }
}
</script>

<style scoped>

</style>
