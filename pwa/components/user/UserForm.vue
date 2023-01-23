<template>
  <CForm>
    <CAlert color="danger" v-if="errors">
      <ul>
        <template v-for="(item,index) in errors">
          <li v-if="index !== '_error'">
            {{ item }}
          </li>
        </template>
      </ul>
    </CAlert>
    <CFormInput
      type="text"
      key="nama"
      label="Nama"
      v-model="v$.item.nama.$model"
      @input="v$.item.nama.$touch"
      @blur="v$.item.nama.$touch"
      :invalid="v$.item.nama.$error"
      :valid="!v$.item.nama.$error"
      :feedback-invalid="namaError"
    >
    </CFormInput>
    <CFormInput
      type="text"
      id="email"
      label="Email"
      v-model="v$.item.email.$model"
      @input="v$.item.email.$touch"
      @blur="v$.item.email.$touch"
      :invalid="v$.item.email.$error"
      :valid="!v$.item.email.$error"
      :feedback-invalid="emailError"
    />
  </CForm>
</template>

<script lang="ts">
import {email, helpers, required } from "@vuelidate/validators";
import useVuelidate, {ErrorObject} from "@vuelidate/core";
import {has} from "lodash/object";
import {computed} from "vue"
import { useViolationsCheck } from "~/components/crud/validators"
import useNotification from "~/components/crud/notification"
import {useUserStore} from "~/stores/konfigurasi"

const { checkViolations } = useViolationsCheck()

export default defineComponent({
  name: "UserForm",
  setup(){

    return {
      v$: useVuelidate(),
    }
  },
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
    violations(){
      return this.errors || {}
    },
    namaError(){
      // console.log(this.v$.item.nama.$error.message.value())
      const errors: string[] = []
      if (!this.v$.item.nama.$dirty) return "";

      const errs = this.v$.item.nama.$errors
      errs.map((err) => {
        errors.push(err.$message)
      })

      return errors.join("<br/>")
    },
    emailError() {
      const errors: string[] = []
      if (!this.v$.item.email.$dirty) return "";

      const errs = this.v$.item.email.$errors

      errs.map((err) => {
        errors.push(err.$message)
      })

      return errors.join("<br/>")
    },
    ...mapState(useUserStore, ['updated'])
  },
  methods: {
    checkViolations(field: string){
      console.log(this.initialValues)
      return true
    }
  },
  validations: () => {
    return computed(() => ({
      item: {
        nama: {
          server: helpers.withAsync(checkViolations),
          req: helpers.withMessage('Nama harus diisi', required),
        },
        email: {
          req: helpers.withMessage('Email harus diisi', required),
          unique: helpers.withMessage('Alamat email salah', email),
        }
      }
    }))
  }
})
</script>

<style scoped>

</style>
