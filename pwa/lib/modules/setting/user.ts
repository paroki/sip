import { email, helpers, required, sameAs } from '@vuelidate/validators'
import { StoreDefinition } from 'pinia'
import useVuelidate from '@vuelidate/core'
import { buildForm, IFormSchema } from '~/lib/crud/form'
import Routing from "~/vendor/jsrouting-bundle/router"
import fetch from "~/lib/fetch"

export function useUserChangePasswordForm (
  useOldPassword = false,
  userId: string|string[]
) {
  const oldPassword = ref(null)
  const password = ref(null)
  const passwordConfirm = ref(null)
  let oldPasswordRule = {}

  if (useOldPassword) {
    oldPasswordRule = {
      required: helpers.withMessage('Password lama harus diisi', required)
    }
  }

  const rules = computed(() => ({
    ...oldPasswordRule,
    password: {
      required: helpers.withMessage('Password harus diisi', required)
    },
    passwordConfirm: {
      required: helpers.withMessage('Konfirmasi password harus diisi', required),
      confirm: helpers.withMessage('Nilai konfirmasi password tidak sama dengan password', sameAs(password))
    }
  }))
  const v$ = useVuelidate(rules, { password, passwordConfirm })

  const onChangePassword = async() => {
    if (!await v$.value.$validate()) { return }

    let payload = {
      id: userId,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    }

    console.log(payload)

    if (useOldPassword) {
      payload = Object.assign(payload, {
        ...payload,
        oldPassword: oldPassword.value
      })
    }

    const url = Routing.generate('auth_change_password')
    const options = {
      method: "POST",
      body: JSON.stringify(payload)
    }

    await fetch(url,options)
      .then((response) => {
        console.log(response.status)
      })
  }

  return {
    v$,
    passwordConfirm,
    password,
    oldPassword,
    onChangePassword
  }
}

export function useUserForm (
  storeDefinition: StoreDefinition,
  state: any
) {
  const schema: IFormSchema = {
    nama: {
      label: 'Nama Lengkap',
      component: 'text',
      rules: {
        required: helpers.withMessage('Nama harus diisi', required)
      }
    },
    email: {
      label: 'Alamat Email',
      component: 'text',
      rules: {
        required: helpers.withMessage('Email harus diisi', required),
        email: helpers.withMessage('Alamat email salah', email)
      }
    }
  }

  return buildForm(storeDefinition, schema, state)
}
