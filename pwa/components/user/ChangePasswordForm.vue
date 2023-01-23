<template>
  <CForm>
    <CFormInput
      v-if="!isGranted('ROLE_ADMIN')"
      type="password"
      id="oldPassword"
      label="Password anda saat ini"
      v-model="v$.item.oldPassword.$model"
      @input="v$.item.oldPassword.$touch"
      @blur="v$.item.oldPassword.$touch"
      :invalid="v$.item.oldPassword.$error"
      :valid="!v$.item.oldPassword.$error"
      :feedback-invalid="oldPasswordError"
    />
    <CFormInput
      type="password"
      id="newPassword"
      label="Password baru"
      v-model="v$.item.newPassword.$model"
      @input="v$.item.newPassword.$touch"
      @blur="v$.item.newPassword.$touch"
      :invalid="v$.item.newPassword.$error"
      :valid="!v$.item.newPassword.$error"
      :feedback-invalid="newPasswordError"
    />
    <CFormInput
      type="password"
      id="newPasswordConfirm"
      label="Masukan ulang password baru"
      v-model="v$.item.newPasswordConfirm.$model"
      @input="v$.item.newPasswordConfirm.$touch"
      @blur="v$.item.newPasswordConfirm.$touch"
      :invalid="v$.item.newPasswordConfirm.$error"
      :valid="!v$.item.newPasswordConfirm.$error"
      :feedback-invalid="newPasswordConfirmError"
    />
    <div style="margin-top: 16px;">
      <CButton color="success" type="submit" @click="onHandleSubmit">
        Ganti Password
      </CButton>
    </div>
  </CForm>
</template>
<script lang="ts">

import {useAuthStore} from "~/stores";
import {helpers, required, sameAs} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {computed} from "vue"

export default {
  name: "ChangePasswordForm",
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    resetMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    showError(item: any): string{
      const errors: string[] = []
      if (!item.$dirty) return "";

      const errs = item.$errors

      errs.map((err:any) => {
        errors.push(err.$message)
      })

      return errors.join("<br/>")
    },
    onHandleSubmit(){
      if(this.handleSubmit){
        this.handleSubmit()
      }
    }
  },
  computed: {
    ...mapGetters(useAuthStore, {
      isGranted: 'isGranted'
    }),
    oldPasswordError(): string{
      return this.showError(this.v$.item.oldPassword)
    },
    newPasswordError(): string{
      return this.showError(this.v$.item.newPassword)
    },
    newPasswordConfirmError(): string{
      return this.showError(this.v$.item.newPasswordConfirm)
    },

  },

  setup(){
    const state = reactive({
      item: {
        newPassword: null,
        newPasswordConfirm: null,
      }
    })
    const rules = computed(() => ({
      item: {
        newPassword: {
          required: helpers.withMessage('Password baru harus diisi', required)
        },
        newPasswordConfirm: {
          required: helpers.withMessage('Konfirmasi password baru harus diisi', required),
          confirmPassword: helpers.withMessage('Konfirmasi password tidak sama dengan nilai password', sameAs(state.item.newPassword))
        }
      }
    }))
    return {
      v$: useVuelidate(rules, state),
      state
    }
  },

}
</script>
<style scoped>

</style>
