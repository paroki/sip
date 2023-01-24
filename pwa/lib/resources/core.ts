import {Nullable} from "~/lib/types"
import {IResource} from "~/lib"

export declare interface IUser extends IResource{
  nama: Nullable<string>
  email: string
  password: string
  plainPassword: string
  updatedAt: Date
}
