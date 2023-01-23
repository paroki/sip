<template>
  <CToaster :autohide="true" placement="top-center">
    <CToast v-for="(toast, index) in toasts"  color="success">
      <div class="d-flex">
        <CToastBody v-html="content"></CToastBody>
        <CToastClose class="me-2 m-auto" white />
      </div>
    </CToast>
  </CToaster>
</template>
<script lang="ts">
import {useNotificationStore} from "~/stores/notifications"

interface IToasts {
  title: string
  content: string
}
export default defineComponent({
  name: 'Alert',
  setup(){
    const store = useNotificationStore()
    const toasts: IToasts[] = reactive([])
    return {
      store,
      toasts
    }
  },
  computed: {
    ...mapState(useNotificationStore, {
      title: 'text',
      content: 'subText',
      show: 'show'
    }),
  },
  watch: {
    show(val){
      if(val){
        this.toasts.push({
          title: this.title,
          content: this.content
        })
      }
    }
  },
  methods: {
  }
})
</script>
