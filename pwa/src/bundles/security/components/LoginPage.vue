<script lang="ts" setup>
import LoginForm from './LoginForm.vue'

</script>
<template>
  <v-app id="inspire" class="bg-grey-lighten-3">
    <v-main>
      <v-container fluid class="primary fill-height">
        <v-row class="align-center justify-center">
          <v-col cols="12" sm="8" md="4" lg="4">
            <LoginForm></LoginForm>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.fill-height {
  height: 100vh;
}
</style>
