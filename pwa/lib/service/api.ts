import api from "../api"
import {IResource} from "~/lib"

export interface ApiService {
  endpoint: string

  find(id: string): Promise<Response>

  findAll(params?: object): Promise<Response>

  create(payload: object): Promise<Response>

  delete(item: any): Promise<Response>

  update(payload: any): Promise<Response>
}

export default function makeApiService(endpoint: string) {
  return <ApiService>{
    find(id: string) {
      return api.fetch(`${endpoint}/${id}`);
    },
    findAll(params?: object) {
      return api.fetch(endpoint, params);
    },
    create(payload: IResource) {
      return api.fetch(endpoint, {method: 'POST', body: JSON.stringify(payload)});
    },
    delete(item: any) {
      return api.fetch(item['@id'], {method: 'DELETE'});
    },
    update(payload: any) {
      return api.fetch(payload['@id'], {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    }
  };
}
