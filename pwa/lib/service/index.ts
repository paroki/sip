import {Nullable} from "~/lib/types"

export declare interface IResource {
  "@id": string
  id: string
}

export declare interface IHydraListResponse {
  "hydra:totalItems": number | 0
  "hydra:view": Nullable<string>
  "hydra:member": IResource[]
}

export declare interface ICrudService {
  load(id: string): void
  create(item: IResource|{}): void
  update(item: IResource|{}): void
  fetchAll(params?:object): void
}

export * from './api'
export * from './store'
export * from './crud'
