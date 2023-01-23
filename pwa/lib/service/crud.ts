import { StoreDefinition } from "pinia"
import { ApiService } from "~/lib/service/api"
import {IHydraListResponse, IResource} from "~/lib/service"
import {SubmissionError} from "~/lib/common"

const handleError = (storeDefinition: StoreDefinition, e: Error|SubmissionError) => {
  const store = storeDefinition()
  store.toggleLoading()
  store.setError(e)
  return Promise.reject(e);
}

// A bridge for Crud Store and Api Service
export default function makeCrudService(storeDefinition: StoreDefinition, api: ApiService){

  const store = storeDefinition()
  return {
    load: (id: string) => {
      store.toggleLoading()
      return api
        .find(id)
        .then(response => response.json())
        .then((item: IResource) => {
          store.toggleLoading()
          store.add(item)
        })
        .catch((e) => handleError(storeDefinition, e))
    },
    create: (item: IResource) => {
      store.error = ""
      store.toggleLoading()
      return api
        .create(item)
        .then(response => response.json())
        .then((resource: IResource) => {
          store.toggleLoading()
          store.create(resource)
        })
        .catch(e => handleError(storeDefinition, e))
    },
    update: (item: IResource) => {
      store.resetError()
      store.toggleLoading()
      return api
        .update(item)
        .then(response => response.json())
        .then((resource: IResource) => {
          store.toggleLoading()
          store.update(resource)
        })
        .catch((e: Error) => handleError(storeDefinition, e))
    },
    delete: (item: IResource) => {
      store.resetError()
      store.toggleLoading()
      return api.delete(item)
        .then(() => {
          store.toggleLoading()
          store.delete(item)
        })
        .catch((e) => handleError(storeDefinition, e))
    },
    fetchAll: (params?: object) =>  {
      store.toggleLoading()

      return api
        .findAll({params})
        .then(response => response.json())
        .then((retrieved: IHydraListResponse) => {
          store.toggleLoading()
          store.fetchAll(retrieved)
        })
        .catch((e) => handleError(storeDefinition, e))
    }
  }
}
