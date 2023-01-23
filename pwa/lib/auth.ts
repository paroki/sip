import {useAuthStore} from "~/stores"

export function isGranted(role: string) {
  const store = useAuthStore()
  return store.isGranted(role)
}
