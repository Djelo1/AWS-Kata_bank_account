import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Account} from "../../Account/account";

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {


  private url = environment.urlAddress+"/katabank/account";
  constructor(private _httpClient: HttpClient) {
  }

  getAllAccount() : Observable<Account[]>{
    return this._httpClient.get<Account[]>(this.url + "/all");
  }

  getAccountbyid(accountId : number) : Observable<Account>{
    return this._httpClient.get<Account>(this.url +"/"+ accountId);
  }

  postAccount(account : Account) : Observable<Account>{
    return this._httpClient.post<Account>(this.url + "",account);
  }

  putAccount(account : Account) : Observable<Account>{
    return this._httpClient.put<Account>(this.url + "",account);
  }

  deleteAccount(accountId : number) : Observable<Account>{
    return this._httpClient.delete<Account>(this.url + "/accountId");
  }

  findByUserId(userId : number) : Observable<Account[]>{
    return this._httpClient.get<Account[]>(this.url + "/findByUserId/"+userId);

  }
}
