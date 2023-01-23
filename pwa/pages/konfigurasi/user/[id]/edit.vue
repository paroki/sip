<template>
  <AppContainer
    :title="'User'"
    list-href="/#/konfigurasi/user"
    :delete-handler="onDelete"
    v-if="item"
  >
    <CNav variant="pills" role="tablist">
      <CNavItem
        :active="tabPanePillsActiveKey === 1"
        @click="() => {tabPanePillsActiveKey = 1}"
        href="javascript:"
      >
        Biodata
      </CNavItem>
      <CNavItem
        :active="tabPanePillsActiveKey === 2"
        @click="() => {tabPanePillsActiveKey = 2}"
        href="javascript:"
      >
        Ubah Password
      </CNavItem>
    </CNav>
    <CTabContent style="min-height: 400px">
      <CTabPane style="padding: 16px" role="tabpanel" aria-labelledby="biodata-tab" :visible="tabPanePillsActiveKey === 1">
        <UserForm
          :values="item"
          ref="updateForm"
          :errors="violations"
        />
        <Toolbar
          list-href="/user"
          :handle-submit="onSave"
          :handle-reset="onReset"
          :handle-delete="onDelete"
        />
      </CTabPane>
      <CTabPane style="padding: 16px" role="tabpanel" aria-labelledby="biodata-tab" :visible="tabPanePillsActiveKey === 2">
        <ChangePasswordForm
          :handle-submit="onChangePassword"
          ref="changePasswordForm"
        />
      </CTabPane>
    </CTabContent>
  </AppContainer>
</template>

<script lang="ts">
import {useUserService, useUserStore} from "~/stores/konfigurasi"
import AppContainer from "~/components/ui/AppContainer.vue"
import UserForm from "~/components/user/UserForm.vue"
import Toolbar from "~/components/Toolbar.vue"
import user from "~/components/user/user"
import ChangePasswordForm from "~/components/user/ChangePasswordForm.vue"
import useNotification from "~/components/crud/notification"

export default defineComponent({
  name: 'UserEdit',
  components: {ChangePasswordForm, Toolbar, UserForm, AppContainer},
  mixins: [user],
  computed: {
    ...mapState(useUserStore, ['violations', 'updated'])
  },
  data(){
    return {
      // item: {},
      tabPanePillsActiveKey: 1
    }
  },
  watch: {
    updated(val){
      this.showMessage(`User <strong>${val.nama}</strong> berhasil di update.`)
    }
  },
  setup(){
    const store = useUserStore()
    const service = useUserService
    return {
      store,
      service,
      servicePrefix: 'user'
    }
  },
})


</script>

<style scoped>

</style>
