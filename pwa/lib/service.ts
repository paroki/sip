import api from "~/lib/api"

export interface ApiService {
  find(id: string): Promise<Response>

  findAll(params?: object): Promise<Response>

  create(payload: object): Promise<Response>

  del(item: any): Promise<Response>

  update(payload: any): Promise<Response>
}

export default function makeService(endpoint: string) {
  return <ApiService>{
    find(id: string) {
      return api.fetch(`${id}`);
    },
    findAll(params?: object) {
      return api.fetch(endpoint, params);
    },
    create(payload: object) {
      return api.fetch(endpoint, {method: 'POST', body: JSON.stringify(payload)});
    },
    del(item: any) {
      return api.fetch(item['@id'], {method: 'DELETE'});
    },
    async update(payload: any) {
      return await api.fetch(payload['@id'], {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    }
  };
}
