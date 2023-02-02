<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutStore } from '~/stores/layout'

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
    <v-list-item
      prepend-avatar="/assets/icons/church.png"
      nav
    >
      <h3 class="font-weight-bold">
        SIP
      </h3>
      <template #append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="store.toggleRail()"
        />
      </template>
    </v-list-item>

    <v-divider />
    <!--
    <v-list density="comfortable">
      <AppNavList :items="nav"/>
    </v-list>
    -->
    <v-list density="comfortable">
      <v-list-item
        prepend-avatar="/assets/icons/eucharist.png"
        title="Sakramen"
        value="Sakramen"
        to="/sakramen"
      />
      <v-list-item
        prepend-icon="mdi-account-group"
        title="Data Umat"
        value="data-umat"
        to="/data-umat"
      />
      <v-list-item
        prepend-icon="mdi-cogs"
        title="Setting"
        value="Setting"
        to="/setting"
      />
      <v-list-item
        prepend-icon="mdi-account-edit"
        title="Profil"
        value="Profil"
        to="/profile"
      />
      <v-list-item
        prepend-icon="mdi-logout"
        title="Logout"
        value="Logout"
        to="/logout"
      />
    </v-list>

    <!--
    <v-list density="compact">
      <v-list-group title="Sakramen" value="sakramen">
        <template v-slot:activator="{props}">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="Sakramen"
          ></v-list-item>
        </template>

      </v-list-group>
    </v-list>
    -->
  </v-navigation-drawer>
</template>
