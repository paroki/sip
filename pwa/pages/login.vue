<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue'
import ProgressOverlay from '~/components/ui/ProgressOverlay.vue'

definePageMeta({
  layout: 'custom'
})
</script>
<template>
  <v-container fluid class="primary fill-height grey-lighten-2">
    <ProgressOverlay />
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>
