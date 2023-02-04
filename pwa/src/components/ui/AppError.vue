<script lang="ts" setup>
import type { ApiResponseError } from '@doyolabs/api-client-core'
import { defineProps } from 'vue'

defineProps<{
  error: ApiResponseError<any>
}>()
</script>
<template>
  <v-alert prominent type="error" variant="outlined">
    <template v-if="error.data['hydra:title']">
      <v-alert-title>{{ error.data['hydra:title'] }}</v-alert-title>
      {{  error.data['hydra:description'] }}
    </template>
    <template v-else-if="error?.data?.message">
      {{ error.data.message }}
    </template>
    <template v-else>
      {{ error.message }}
    </template>
  </v-alert>
</template>
