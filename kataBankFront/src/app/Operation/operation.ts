import {User} from "../User/user";
import {Account} from "../Account/account";

export interface Operation {
    id : number
    type : string
    amount :number
    executionDate : Date;
    realDate  : Date;
    userFrom : User
    accountFrom : Account;

}
