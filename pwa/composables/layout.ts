import { useLayoutStore } from '~~/stores/layout';

export const watchLoading = (loading: ComputedRef<boolean>) => {
  watch(loading, () => {
    const layout = useLayoutStore()
    layout.loading = loading.value
  })
}
