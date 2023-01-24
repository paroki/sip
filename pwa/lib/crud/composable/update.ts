import { StoreDefinition } from 'pinia'
import { useRoute } from '#app'
import { computed } from 'vue'
import { IResource } from '~/lib'

export default function useUpdate (
  servicePrefix: string,
  storeDefinition: StoreDefinition
) {
  const store = storeDefinition()
  const router = useRoute()
  const id: string|string[] = router.params.id
  const item = reactive({})

  onMounted(() => {
    store.load(`${router.params.id}`)
  })

  const retrieved = computed(() => {
    return store.find(`/${servicePrefix}/${id}`)
  })
  watch(retrieved, () => {
    Object.assign(item, retrieved.value)
  })

  const updated = computed(() => {
    return store.updated
  })

  const created = computed(() => {
    return store.created
  })

  const deleted = computed(() => {
    return store.deleted
  })

  const reset = () => {
    store.resetUpdate()
    store.resetDelete()
    store.resetCreate()
  }
  const onReset = () => {
    Object.assign(item, retrieved.value)
  }
  const onSave = (item: IResource) => {
    store.update(item)
  }

  const onDelete = async () => {
    await store.delete(retrieved.value)
  }

  return {
    item,
    store,
    retrieved,
    created,
    updated,
    deleted,
    reset,
    onSave,
    onReset,
    onDelete
  }
}
