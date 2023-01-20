<template>
  <div class="p-8">
    <h3 class="text-3xl">Homepage</h3>
    {{ store.loggedIn ? "Logged In":"Not Logged IN"}}

    <div class="inline-flex">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script lang="ts">

import { useAuthStore } from "~/stores"

export default {
  name: 'IndexPage',
  setup(){
    const store = useAuthStore()
    return {
      store
    }
  },
  methods: {
    async logout(){
      await this.store.logout()
      await navigateTo('/login')
    }
  }
}
</script>
