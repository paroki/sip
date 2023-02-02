<template>
  <v-app theme="light" class="bg-grey-lighten-4">
    <AppSidebar />
    <v-main>
      <transition>
        <v-container fluid>
          <v-row dense>
            <v-col cols="12">
              <ProgressOverlay />
              <slot />
            </v-col>
          </v-row>
        </v-container>
      </transition>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import AppSidebar from '~/components/ui/AppSidebar.vue'
import ProgressOverlay from '~/components/ui/ProgressOverlay.vue'
</script>
