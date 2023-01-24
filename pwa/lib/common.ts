import moment from 'moment'
import { acceptHMRUpdate, StoreDefinition } from 'pinia'
// @ts-ignore
import { get, has, mapValues } from 'lodash'
import { SubmissionErrorsType } from './types'
import { SIP_STORAGE_ROUTES } from './config'
import { useAuthStore } from '~/stores'

// @ts-ignore

export function storeHMRUpdate (store: StoreDefinition) {
  if (import.meta.hot) {
    acceptHMRUpdate(store, import.meta.hot)
  }
}

export function formatDateTime (date: Date) {
  if (!date) { return null }

  return moment(date).format('DD/MM/YYYY')
}

export class SubmissionError extends Error {
  errors: SubmissionErrorsType

  constructor (errors: SubmissionErrorsType) {
    super('Submit Validation Failed')
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name

    return this
  }
}

export async function getRoutes () {
  let json = localStorage.getItem(SIP_STORAGE_ROUTES) || ''
  if (json === '') {
    const url = 'https://localhost/js/routing.json'
    const options = {
      method: 'GET',
      headers: { Accept: 'application/json' }
    }
    json = await fetch(url, options).then((response) => {
      return response.json()
    })
      .then((data) => {
        return JSON.stringify(data)
      })
    // @ts-ignore
    localStorage.setItem(SIP_STORAGE_ROUTES, json)
  }

  return JSON.parse(json)
}

export function isGranted (role: string) {
  const store = useAuthStore()
  return store.isGranted(role)
}

export function normalize (data: any) {
  if (has(data, 'hydra:member')) {
    // Normalize items in collections
    data['hydra:member'] = data['hydra:member'].map((item:any) => normalize(item))

    return data
  }

  // Flatten nested documents
  return mapValues(data, (value:any) =>
    Array.isArray(value)
      ? value.map(v => get(v, '@id', v))
      : get(value, '@id', value)
  )
}
