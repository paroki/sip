<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="layout.toggleSidebar()">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
    </CContainer>
  </CHeader>
</template>

<script>
// import AppBreadcrumb from './AppBreadcrumb'
// import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '~/assets/brand/logo'
import {useLayoutStore} from "~/stores";
export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    // AppHeaderDropdownAccnt,
  },
  setup() {
    const layout = useLayoutStore()
    return {
      logo,
      layout
    }
  },
}
</script>
