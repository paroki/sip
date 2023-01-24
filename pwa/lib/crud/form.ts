// eslint-disable-next-line import/named
import useVuelidate, { ValidationRuleWithoutParams, ValidationRuleWithParams } from '@vuelidate/core'
import _ from 'lodash'
import { StoreDefinition } from 'pinia'

export declare interface IFormRules {
  [key:string]: ValidationRuleWithParams|ValidationRuleWithoutParams
}

export declare interface IFormField {
  label: string,
  component: string
  rules: IFormRules | {}
}
export declare interface IFormSchema {
  [key: string]: IFormField
}

export function buildForm (
  storeDefinition: StoreDefinition,
  schema: IFormSchema,
  item: any
) {
  const store = storeDefinition()
  const rules: any = {}
  const $externalResults = ref({})

  _.forEach(schema, (value: IFormField, key: string) => {
    rules[key] = value.rules
  })

  const violations = computed(() => {
    return store.violations
  })
  watch(violations, () => {
    if (_.isEmpty(violations.value)) { return }

    const errors:any = { item: {} }
    _.forEach(violations.value, (value: string, key: string) => {
      if (key === '_error') { return }
      // errors[`item.${key}`] = [value]
      errors.item[key] = [value]
    })
    // Object.assign($externalResults, errors)
    // console.log(errors)
    $externalResults.value = errors
  })

  const v$ = useVuelidate(
    { item: rules },
    { item },
    { $externalResults }
  )

  return {
    v$,
    schema
  }
}
