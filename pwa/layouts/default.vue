<template>
  <div>
    <AppSidebar/>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <Alert/>
          <NuxtPage />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script lang="ts">
import AppSidebar from "~/components/ui/AppSidebar.vue"
import AppHeader from "~/components/ui/AppHeader.vue"
import AppFooter from "~/components/ui/AppFooter.vue"
import Alert from "~/components/ui/Alert.vue"
export default defineComponent({
  name: 'DefaultLayout',
  components: {AppFooter, AppHeader, AppSidebar, Alert}
})
</script>
<style>

</style>
