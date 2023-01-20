<template>
  <CForm>
    <CFormInput
      v-if="!isGranted('ROLE_ADMIN')"
      type="password"
      id="oldPassword"
      label="Password anda saat ini"
      :model-value="oldPassword"
    />
    <CFormInput
      type="password"
      id="newPassword"
      label="Password baru"
      :model-value="newPassword"
    />
    <CFormInput
      type="password"
      id="newPasswordConfirm"
      label="Masukan ulang password baru"
      :model-value="newPasswordConfirm"
    />
    <div style="margin-top: 16px;">
      <CButton color="success" type="submit">
        Ganti Password
      </CButton>
    </div>
  </CForm>
</template>
<script>

import {useAuthStore} from "../../stores";

export default {
  name: "PasswordForm",
  data: () => ({
    oldPassword: null,
    newPassword: null,
    newPasswordConfirm: null
  }),
  computed: {
    ...mapGetters(useAuthStore, {
      isGranted: 'isGranted'
    })
  }
}
</script>
<style scoped>

</style>
