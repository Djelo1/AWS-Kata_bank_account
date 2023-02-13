import {User} from "../User/user";

export interface Account {
  id: number
  type: string
  surname: number
  creationDate :Date
  modificationDate : Date
  userId : User
  amount : number
}
