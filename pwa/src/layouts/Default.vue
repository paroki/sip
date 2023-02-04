<script lang="ts" setup>
import AppSidebar from '@/components/ui/AppSidebar.vue';

</script>
<template>
  <v-app theme="light" class="bg-grey-lighten-4">
    <AppSidebar></AppSidebar>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
