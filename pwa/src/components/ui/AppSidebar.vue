<script lang="ts" setup>
import { useLayoutStore } from '@/store/layout'
import { computed } from 'vue'

const store = useLayoutStore()
const rail = computed(() => store.rail)
const drawer = computed(() => store.drawer)
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    :expand-on-hover="!!rail"
  >
    <v-list-item prepend-avatar="/assets/icons/church.png" nav>
      <h3 class="font-weight-bold">SIP</h3>
      <template #append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="store.toggleRail()"
        />
      </template>
    </v-list-item>

    <v-divider />

    <v-list density="comfortable">
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        value="home"
        to="/"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
