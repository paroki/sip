<script lang="ts" setup>
import type { ApiResponseError } from '@doyolabs/api-client-core'
import { defineProps } from 'vue'

defineProps<{
  error: ApiResponseError<any>
}>()
</script>
<template>
  <v-alert prominent type="error" variant="outlined">
    <template v-if="error?.data">
      {{ error.data.message }}
    </template>
    <template v-else>
      {{ error.message }}
    </template>
  </v-alert>
</template>
