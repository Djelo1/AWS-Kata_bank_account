import { Component, OnInit } from '@angular/core';
import {OperationServiceService} from "../../Services/operation/operation-service.service";
import {AccountServiceService} from "../../Services/account/account-service.service";
import {UserServiceService} from "../../Services/user/user-service.service";
import {Operation} from "../operation";
import {Account} from "../../Account/account";
import {User} from "../../User/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  _operationList : Operation[]  ;
  _accountList : Account[];
  _userList : User[];
  accountSelected = true;
  selectedDevice: any;
  form: FormGroup;
  operation : Operation   ;
  amountOps: number;
  currentAccount : Account;
  languageObjects : string[] = ["SAVING","WITHDRAW"];
  selectedObject : string;


  constructor(private operationService:OperationServiceService,
              private  accountService : AccountServiceService,
              private  userService : UserServiceService,
              public fb: FormBuilder) {
    this.amountOps = 0
    this._operationList = [];
    this._accountList = [];
    this._userList = [];
    this.operation = <Operation>{}
    this.selectedObject = "";
    this.currentAccount  = <Account>{}
    this.form = this.fb.group({
      amount: [this.operation.amount],
      type: [this.operation.type],
      userFrom: [this.operation.userFrom],
      accountFrom: [this.operation.accountFrom],
      amountOps: [this.amountOps],

    });
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this._userList = data;
    })
  }


  onSelectedUser(){
    const userId = this.operation.userFrom.cin;
    this.accountService.findByUserId(Number(userId)).subscribe(data => {
      this._accountList = data;
      this.accountSelected = false;
    },
      error => console.log(error)
    )
  }

  onSelectedAccount(){
    const accountid = this.operation.accountFrom.id;
    this.operationService.getAllOperationByAccountId(Number(accountid)).subscribe(data => {
      this._operationList = data;
    })
    this.getcurrentAccount(accountid);
  }

  getcurrentAccount(accountid:Number){
    this.accountService.getAccountbyid(Number(accountid)).subscribe(data => {
      this.currentAccount = data;
      this.operation.amount = this.currentAccount.amount;
    })
  }

  execOps() {
    const accountRrom = this.operation.accountFrom.id;
    var amount:number = Number(this.amountOps)
    if (this.operation.type ==="WITHDRAW" ){
      this.operationService.withdrawOperation(accountRrom,amount).subscribe(data => {
        this._operationList.push(data)
        this.getcurrentAccount(accountRrom)

      })
    }else if(this.operation.type ==="SAVING"){
      this.operationService.savingOperation(accountRrom,amount).subscribe(data => {
        this._operationList.push(data)
        this.getcurrentAccount(accountRrom)
      })
    }else{
      console.log("unsupported type")
    }
  }
}
