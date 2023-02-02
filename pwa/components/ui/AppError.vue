<script setup lang="ts">
import type { ApiResponseError } from '@doyolabs/api-client-core'
defineProps<{
  error: ApiResponseError<any>
}>()
</script>
<template>
  <v-alert
    v-if="error"
    variant="outlined"
    :title="error.data.code"
    :text="error.data.message"
  />
</template>
