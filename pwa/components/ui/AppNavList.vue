<script lang="ts" setup>
import { has } from 'lodash'
defineProps({
  items: {
    type: Object,
    required: true
  }
})
// const opened = ref([])
</script>
<template>
  <div v-for="item in items" :key="item.title">
    <v-list-item
      v-if="!has(item, 'items')"
      :to="item.to"
      :prepend-icon="item.icon"
      :title="item.title"
      :value="item.value"
    />
    <v-list-group
      v-else
      :prepend-icon="item.icon"
      :title="item.title"
      :value="item.value"
    >
      <template #activator="{props}">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-circle"
          :title="item.title"
        />
      </template>
      <AppNavList
        :items="item.items"
      />
    </v-list-group>
  </div>
</template>
