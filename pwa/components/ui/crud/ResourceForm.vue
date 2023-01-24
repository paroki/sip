<template>
  <CForm class="rs-form">
    <template v-for="(field, name) in schema" :key="`${name}-${field}`">
      <div class="rs-form-field">
        <CFormLabel :for="name">
          {{ field.label || name }}
        </CFormLabel>
        <CFormInput
          :id="name"
          v-model="v$.item[name].$model"
          :type="field.component"
          :invalid="!_.isEmpty(v$.item[name].errors)"
          :valid="_.isEmpty(v$.item[name].errors)"
          @input="v$.item[name].$touch()"
          @blur="v$.item[name].$touch()"
        />
        <CAlert
          v-if="!_.isEmpty(v$.item[name].$errors)"
          :key="name"
          class="invalid-feedback"
          color="danger"
        >
          <ul>
            <template
              v-for="(error, index) in v$.item[name].$errors"
              :key="`err-${name}-${index}`"
            >
              <li>
                {{ error.$message }}
              </li>
            </template>
          </ul>
        </CAlert>
      </div>
    </template>
    <FormToolbar
      class="rs-form-toolbar"
      :handle-submit="handleSubmit"
      :handle-delete="handleDelete"
      :handle-reset="handleReset"
      :list-ref="listRef"
      :validator="v$"
    />
  </CForm>
</template>
<script lang="ts" setup>
import {
  CForm,
  CFormInput
} from '@coreui/vue'
import { computed } from 'vue'
import FormToolbar from '~/components/ui/crud/FormToolbar.vue'
import _ from 'lodash'

const props = defineProps({
  schema: {
    type: Function,
    required: true
  },
  values: {
    type: Object,
    required: true
  },
  initialValues: {
    type: Object,
    default: () => {}
  },
  listRef: {
    type: String,
    required: false,
    default: () => ''
  },
  handleSubmit: {
    type: Function,
    required: false
  },
  handleDelete: {
    type: Function,
    required: false
  },
  handleReset: {
    type: Function,
    required: false
  },
  storeDefinition: {
    type: Function,
    required: true
  }
})

const item = computed(() => {
  return props.initialValues || props.values
})

const { v$, schema } = props.schema(props.storeDefinition, item)

</script>
