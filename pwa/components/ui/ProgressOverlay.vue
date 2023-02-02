<script lang="ts" setup>
import { useLayoutStore } from '~~/stores/layout'

const store = useLayoutStore()

const loading = computed(() => store.loading)

</script>
<template>
  <v-overlay
    :model-value="loading"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      :close-on-content-click="false"
      size="64"
    />
  </v-overlay>
</template>
