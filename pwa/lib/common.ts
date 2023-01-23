import moment from 'moment'
import { acceptHMRUpdate, StoreDefinition} from "pinia"
import {SubmissionErrorsType} from "./types"
import {RoutingData} from "@/vendor/jsrouting-bundle/router"
import {SIP_STORAGE_ROUTES} from "./config"

export const storeHMRUpdate = (store: StoreDefinition) => {
  if(import.meta.hot){
    acceptHMRUpdate(store, import.meta.hot)
  }
}

export const formatDateTime = function(date: Date) {
  if (!date) return null;

  return moment(date).format('DD/MM/YYYY');
};

export class SubmissionError extends Error {
  errors: SubmissionErrorsType

  constructor (errors: SubmissionErrorsType) {
    super('Submit Validation Failed');
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    return this;
  }
}

export const getRoutes = async(): RoutingData => {
  let json = localStorage.getItem(SIP_STORAGE_ROUTES)
  if(null === json){
    const url = 'https://localhost/js/routing.json'
    const options = {
      method: 'GET',
      headers: {'Accept': 'application/json'}
    }
    json = await fetch(url, options).then((response) => {
      return response.json()
    })
      .then(data => {
        return JSON.stringify(data)
      })
    localStorage.setItem(SIP_STORAGE_ROUTES, json)
  }

  return JSON.parse(json)
}
