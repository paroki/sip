<template>
  <CCard>
    <CCardHeader>
      <CNav variant="tabs" class="card-header-tabs">
        <CNavItem>
          <CNavLink href="javascript:" :active="1===currentTabNav" @click="() => {currentTabNav=1}">
            Biodata
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink :active="2===currentTabNav" href="javascript:" @click="() => {currentTabNav=2}">
            Password
          </CNavLink>
        </CNavItem>
      </CNav>
    </CCardHeader>
    <CCardBody>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labeledby="biodata" :visible="1===currentTabNav">
          <ResourceForm
            ref="updateForm"
            :values="item"
            :schema="useUserForm"
            :handle-delete="onDelete"
            :handle-submit="onSave"
            :handle-reset="onReset"
            :store-definition="useUserStore"
            list-ref="/setting/user"
          />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labeledby="password" :visible="2===currentTabNav">
          <Password
          />
        </CTabPane>
      </CTabContent>
    </CCardBody>
  </CCard>
</template>
<script lang="ts" setup>

import useUpdate from '~/lib/crud/composable/update'
import { useUserStore } from '~/stores/setting'
import ResourceForm from '~/components/ui/crud/ResourceForm.vue'
import { useUserForm, useUserChangePasswordForm } from '~/lib/modules/setting/user'
import useNotification from '~/lib/notification'
import Password from "~/components/setting/user/Password.vue"

const currentTabNav = ref(1)
const {
  item,
  onSave,
  onReset,
  updated,
  onDelete,
  deleted
} = useUpdate('user', useUserStore)
const { showMessage } = useNotification()

watch(updated, () => {
  showMessage(`Perubahan data user <strong>${updated.value.nama}</strong> berhasil di simpan.`)
})

watch(deleted, () => {
  showMessage(`User <strong>${deleted.value.nama}</strong> berhasil dihapus.`)
  navigateTo('/setting/user')
})

</script>
