<script lang="ts" setup>
import AppError from '@/components/ui/AppError.vue'
import { useAuthStore } from '@/store/auth'
import type { AssociativeArray } from '@/types'
import { computed, reactive } from 'vue'

const model: AssociativeArray<string> = reactive({
  email: '',
  password: '',
})
const store = useAuthStore()
const login = () => {
  store.login(model)
}
const error = computed(() => store.error)
</script>
<template>
  <v-card title="Login">
    <v-card-text v-if="error">
      <AppError :error="error"></AppError>
    </v-card-text>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="model.email"
          name="email"
          label="Masukkan alamat email anda"
          type="email"
          color="primary"
        ></v-text-field>
        <v-text-field
          v-model="model.password"
          name="password"
          label="Masukkan password anda"
          type="password"
          color="primary"
        >
        </v-text-field>

        <v-btn
          color="success"
          class="me-4"
          type="submit"
          prepend-icon="mdi-login"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
