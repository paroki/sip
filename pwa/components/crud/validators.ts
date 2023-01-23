import {helpers} from "@vuelidate/validators"
import {computed} from "vue"

export function useViolationsCheck() {
  const updateForm = ref(null)

  const initial = computed((item) => {
    console.log(item)
    return 'bar'
  })
  const checkViolations = (value: any): boolean => {
    return true
  }

  return {
    checkViolations,
  }
}
