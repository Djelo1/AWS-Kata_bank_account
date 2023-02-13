import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../User/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url = environment.urlAddress+"/katabank/user";

  constructor(private _httpClient: HttpClient) {
  }

  getAllUser() : Observable<User[]>{
    return this._httpClient.get<User[]>(this.url + "/all");
  }

  getUserbyid(UserId : string) : Observable<User>{
    return this._httpClient.get<User>(this.url +"/"+ UserId);
  }

  postUser(User : User) : Observable<User>{
    return this._httpClient.post<User>(this.url + "",User);
  }

  putUser(User : User) : Observable<User>{
    return this._httpClient.put<User>(this.url + "",User);
  }

  deleteUser(UserId : string) : Observable<User>{
    return this._httpClient.delete<User>(this.url + "/UserId");
  }
}
