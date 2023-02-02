<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

onMounted(async () => {
  const store = useAuthStore()
  watchLoading(computed(() => store.loading))
  await store.logout()
  await navigateTo('/login')
})

</script>
<template>
  <div />
</template>
