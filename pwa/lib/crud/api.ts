import fetch from "~/lib/fetch"

export declare interface IResource {
  "@id": string
  "id": string
}

export declare interface ApiService {
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
      return fetch(`${endpoint}/${id}`);
    },
    findAll(params?: object) {
      return fetch(endpoint, params);
    },
    create(payload: IResource) {
      return fetch(endpoint, {method: 'POST', body: JSON.stringify(payload)});
    },
    delete(item: any) {
      return fetch(item['@id'], {method: 'DELETE'});
    },
    update(payload: any) {
      return fetch(payload['@id'], {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    }
  };
}
