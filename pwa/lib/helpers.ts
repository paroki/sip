import {acceptHMRUpdate, StoreDefinition} from "pinia"
import {BASE_URL} from "~/lib/api"
import {SIP_STORAGE_ROUTES} from "~/lib/config"
import {RoutingData} from "~/vendor/jsrouting-bundle/router"


export const storeHMRUpdate = (store: StoreDefinition) => {
  if(import.meta.hot){
    acceptHMRUpdate(store, import.meta.hot)
  }
}

export const getRoutes = async():RoutingData => {
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
