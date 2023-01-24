import { storeHMRUpdate } from '~/lib/common'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    show: false as boolean,
    color: 'error' as string,
    text: 'An error occurred' as string,
    subText: '' as string,
    timeout: 6000
  })
})

storeHMRUpdate(useNotificationStore)
