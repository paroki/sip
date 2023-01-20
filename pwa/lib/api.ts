import {useAuthStore} from "~/stores"

export const BASE_URL = 'https://localhost'

const MIME_TYPE = 'application/ld+json'

class API {
  baseUrl: string

  constructor() {
    this.baseUrl = BASE_URL
  }

  generate(url: string){
    return this.baseUrl + url
  }

  resource(name: string, options?:object){
    const auth = useAuthStore()
    const routes = auth.routes

    if(!routes.hasOwnProperty(name)){
      throw Error('Invalid resource name: ' + name)
    }

    // @ts-ignore
    const url = routes[name]
    return this.fetch(url, options)
  }

  fetch(url: string, options?: any){
    if(undefined === options){
      options = {}
    }

    if(!options.hasOwnProperty('headers')){
      options.headers = {}
    }

    if(!options.headers.hasOwnProperty('Accept')){
      options.headers['Accept'] = 'application/ld+json'
    }

    if(undefined !== typeof options.body){
      options.headers['Content-Type'] = 'application/json'
    }

    url = this.generate(url)
    return global.fetch(url,options)
      .then(response => {

        if(response.ok){
          return response
        }

        return response.json().then(
          json => {
            throw Error(json.message)
          },
          () => {
            throw new Error(response.statusText || 'An error occured.')
          }
        )
      })
  }
}

const api = new API()

export default api
