<template>
  <AppContainer title="Unauthorized" icon="cil-lock-locked">
    Anda tidak memiliki hak akses untuk halaman ini.
  </AppContainer>
</template>
<script>
import AppContainer from "../components/ui/AppContainer";
export default {
  name: 'Unauthorized',
  components: {AppContainer}
}
</script>
