<template>
  <AppContainer title="Edit user" icon="cil-user">

    <CNav variant="pills" role="tablist">
      <CNavItem
        href="#"
        :active="tabPanePillsActiveKey === 1"
        @click="() => {tabPanePillsActiveKey = 1}"
      >
        Biodata
      </CNavItem>
      <CNavItem
        href="#"
        :active="tabPanePillsActiveKey === 2"
        @click="() => {tabPanePillsActiveKey = 2}"
      >
        Ubah Password
      </CNavItem>
    </CNav>
    <CTabContent style="min-height: 400px">
      <CTabPane style="padding: 16px" role="tabpanel" aria-labelledby="biodata-tab" :visible="tabPanePillsActiveKey === 1">
        <UserForm
          :handle-submit="onSendForm"
          :values="item"
          ref="updateForm"
        />
        <Toolbar
          list-href="/user"
          :handle-submit="onSendForm"
          :handle-reset="resetForm"
          :handle-delete="del"
        />
      </CTabPane>
      <CTabPane style="padding: 16px" role="tabpanel" aria-labelledby="biodata-tab" :visible="tabPanePillsActiveKey === 2">
        <PasswordForm
          :handle-submit="onChangePassword"
        />
      </CTabPane>
    </CTabContent>
  </AppContainer>
</template>
<script>
import AppContainer from "~/components/ui/AppContainer";
import update from "~/lib/crud/update";
import {useUserStore} from "~/stores/konfigurasi";
import UserForm from "~/components/user/UserForm";
import PasswordForm from "../../../components/user/PasswordForm";
import Toolbar from "../../../components/Toolbar";

const store = useUserStore()

export default {
  name: 'UserEdit',
  endpoint: '/user',
  mixins: [update],
  store,
  components: {
    Toolbar,
    PasswordForm,
    UserForm,
    AppContainer
  },
  data: () => ({
    tabPanePillsActiveKey: 1,
  }),
  computed: {
    ...mapGetters(useUserStore, ['find'])
  },
  methods: {
    ...mapActions(useUserStore, {
      createReset: 'resetCreate',
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
      update: 'update',
      updateReset: 'resetUpdate'
    }),
    onChangePassword(){

    },
  },
  setup(){
    const store = useUserStore()
    return {
      store
    }
  }
}
</script>
