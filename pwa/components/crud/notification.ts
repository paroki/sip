import {useNotificationStore} from "~/stores/notifications";
import {ComponentOptionsMixin} from "vue"

interface MessageResponse {
  message: string
  response?: {data: { message: string }}
}
export default function useNotification(){
  const store = useNotificationStore()
  const cleanState = () => {
    setTimeout(() => {
      store.show = false;
    }, store.timeout);
  }

  const showError = (error: string) => {
    showMessage(error, "danger");
  }
  const showMessage = (message: string|MessageResponse, color = "success") => {
    store.show = true;
    store.color = color;

    if (typeof message === "string") {
      store.text = color === 'success' ? 'Berhasil!':'Terjadi kesalahan!'
      store.subText = message;
      cleanState();
      return;
    }

    store.text = message.message;

    if (message.response) store.subText = message.response.data.message;

    cleanState();
  }

  return {
    cleanState,
    showError,
    showMessage,
  }
}
