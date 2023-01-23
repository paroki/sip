<template>
  <AppContainer :title="'User: ' + item.nama">

  </AppContainer>
</template>

<script lang="ts">
import AppContainer from "../../../../components/ui/AppContainer";
import { useUserStore, useUserService } from "~/stores/konfigurasi"

export default defineComponent({
  name: "UserDelete",
  components: {AppContainer},
  data: () => ({
    item: {
      nama: 'Hello World'
    }
  })
})
</script>

<style scoped>

</style>
