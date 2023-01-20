<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="store.updateSidebarVisible"
  >
    <CSidebarBrand>
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="churchNegative"
        :height="35"
      >
      </CIcon>
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="churchNegative"
        :height="35"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="store.toggleUnfoldable()"
    />
  </CSidebar>
</template>

<script>
import { AppSidebarNav } from '~/components/ui/AppSidebarNav'
import { useLayoutStore } from "~/stores";
import { logoNegative as logoFull }  from "assets/brand/logo-negative";
import { sygnet as logoNarrow } from "assets/brand/sygnet";
import { churchNegative } from "assets/brand/church-negative";

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  computed: {
    ...mapWritableState(useLayoutStore, ['sidebarUnfoldable', 'sidebarVisible'])
  },
  setup() {
    const store = useLayoutStore()
    return {
      logoFull,
      logoNarrow,
      churchNegative,
      store,
    }
  },
  methods: {

  }
}
</script>
