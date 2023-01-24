import { useNotificationStore } from '~/stores/notifications'

export default function useNotification () {
  const store = useNotificationStore()

  const cleanState = () => {
    setTimeout(() => {
      store.show = false
    }, store.timeout)
  }
  const showError = (error: string) => {
    showMessage(error, 'danger')
  }

  const showMessage = (message: string, color = 'success') => {
    store.show = true
    store.color = color
    store.subText = message
    cleanState()

    /**
    if (typeof message === "string") {
      store.text = message;
      store.cleanState();

      return;
    }

    store.text = message.message;

    if (message.response) store.subText = message.response.data.message;

    store.cleanState();
     */
  }

  return {
    showError,
    showMessage
  }
}
