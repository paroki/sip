<template>
  <CForm class="rs-form">
    <div v-if="useOldPassword" class="rs-form-field">
      <CFormLabel for="oldPassword">
        Password Lama Anda
      </CFormLabel>
      <CFormInput
        id="oldPassword"
        v-model="v$.oldPassword.$model"
        type="password"
        :invalid="!_.isEmpty(v$.oldPassword.$errors)"
        :valid="_.isEmpty(v$.oldPassword.$errors)"
        @input="v$.oldPassword.$touch()"
      />
      <CAlert v-if="!_.isEmpty(v$.oldPassword.$errors)" color="danger">
        <ul>
          <template
            v-for="(error, index) in v$.oldPassword.$errors"
            :key="`err-old-password-${index}`"
          >
            <li>
              {{ error.$message }}
            </li>
          </template>
        </ul>
      </CAlert>
    </div>
    <div class="rs-form-field">
      <CFormLabel for="password">
        Password Baru
      </CFormLabel>
      <CFormInput
        id="password"
        v-model="v$.password.$model"
        type="password"
        :invalid="!_.isEmpty(v$.password.$errors)"
        :valid="_.isEmpty(v$.password.$errors)"
        @input="v$.password.$touch()"
      />
      <CAlert v-if="!_.isEmpty(v$.password.$errors)" color="danger">
        <ul>
          <template
            v-for="(error, index) in v$.password.$errors"
            :key="`err-password-${index}`"
          >
            <li>
              {{ error.$message }}
            </li>
          </template>
        </ul>
      </CAlert>
    </div>
    <div class="rs-form-field">
      <CFormLabel for="passwordConfirm">
        Masukkan Ulang Password Baru
      </CFormLabel>
      <CFormInput
        id="passwordConfirm"
        v-model="v$.passwordConfirm.$model"
        type="password"
        :invalid="!_.isEmpty(v$.password.$errors)"
        :valid="_.isEmpty(v$.passwordConfirm.$errors)"
        @input="v$.passwordConfirm.$touch()"
        @blur="v$.passwordConfirm.$touch()"
      />
      <CAlert v-if="!_.isEmpty(v$.passwordConfirm.$errors)" color="danger">
        <ul>
          <template
            v-for="(error, index) in v$.passwordConfirm.$errors"
            :key="`err-password-confirm-${index}`"
          >
            <li>
              {{ error.$message }}
            </li>
          </template>
        </ul>
      </CAlert>
    </div>

    <div class="rs-form-toolbar">
      <CButton type="button" color="success" @click="onChangePassword">
        <CIcon icon="cil-save" />
        Ganti Password
      </CButton>
    </div>
  </CForm>
</template>

<script lang="ts" setup>

import _ from 'lodash'
import { useUserChangePasswordForm } from '~/lib/modules/setting/user'
import {useUserStore} from "~/stores/setting"
import fetch from "~/lib/fetch"
import Routing from "~/vendor/jsrouting-bundle/router"

const router = useRoute()
const userId: string|string[] = router.params.id
const props = defineProps({
  useOldPassword: {
    type: Boolean,
    required: false,
    default: () => false
  }
})
const {
  v$,
  onChangePassword
} = useUserChangePasswordForm(props.useOldPassword, userId)

</script>
