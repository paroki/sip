<template>
  <div>

    <NuxtWelcome />
  </div>
</template>
<script>
import {useLayoutStore} from "../store/layout";

export default {
    computed: {
        ...mapState(useLayoutStore,["sidebarVisible", "sidebarUnfoldable"])
    }
}
</script>
