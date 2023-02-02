<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const authenticated = computed(() => store.authenticated)
const error = computed(() => store.error)
const data = reactive({
  email: 'admin@sip.com',
  password: 'sip'
})

async function login () {
  await store.login(data)
  if (authenticated) {
    await navigateTo('/')
  }
}
const loading = computed(() => store.loading)
watchLoading(loading)

</script>
<template>
  <v-card class="elevation-5 pa-3">
    <v-toolbar color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text v-if="error">
      <h1>{{ error.data.code }}</h1>
      <p>{{ error.data.message }}</p>
    </v-card-text>
    <v-card-text>
      <v-form ref="loginForm" :disabled="loading" @submit.prevent="login">
        <v-text-field
          v-model="data.email"
          name="email"
          color="primary"
          placeholder="Isi dengan alamat email anda"
          prepend-inner-icon="mdi-email"
          type="email"
          label="Email"
        />
        <v-text-field
          v-model="data.password"
          name="password"
          placeholder="Isi dengan password anda"
          type="password"
          label="Password"
          prepend-inner-icon="mdi-key"
        />
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
