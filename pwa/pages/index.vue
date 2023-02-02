<template>
  <div>
    <h3>Hello World</h3>
    <v-btn color="primary" @click="logout">
      Logout
    </v-btn>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const store = useAuthStore()

const loading = computed(() => store.loading)
watchLoading(loading)

const logout = async () => {
  await store.logout()
  await navigateTo('/login')
}
</script>
