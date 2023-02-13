import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operation} from "../../Operation/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationServiceService {

  private url = environment.urlAddress+"/katabank/ops";

  constructor(private _httpClient: HttpClient) {
  }

  getAllOperation() : Observable<Operation[]>{
    return this._httpClient.get<Operation[]>(this.url + "/all");
  }

  getAllOperationByAccountId(accountId : number) : Observable<Operation[]>{
    return this._httpClient.get<Operation[]>(this.url + "/all/"+accountId);
  }

  savingOperation(accountId: number , amount : number) : Observable<Operation>{
    return this._httpClient.post<Operation>(this.url + "/addsaving/"+accountId+"/"+amount,null);
  }

  withdrawOperation(accountId: number , amount : number) : Observable<Operation>{
    return this._httpClient.post<Operation>(this.url + "/withdraw/"+accountId+"/"+amount,null);
  }



}
