import { Component, OnInit } from '@angular/core';
import {AccountServiceService} from "../../Services/account/account-service.service";
import {UserServiceService} from "../../Services/user/user-service.service";
import {User} from "../../User/user";
import {Account} from "../account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  _account : Account;
  _userList : User[]  ;
  _accountList : Account[];
  constructor(private accountService : AccountServiceService ,
              private  userService : UserServiceService ,
              public fb: FormBuilder) {
    this._userList = [];
    this._accountList = [];
    this._account = <Account>{}
    this.form = this.fb.group({
      id: [this._account.id],
      type: [this._account.type],
      surname: [this._account.surname],
      creationDate: [this._account.creationDate],
      userId: [this._account.userId],
    });


  }


  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this._userList = data;
    })
    this.accountService.getAllAccount().subscribe(data => {
      this._accountList = data;
    })
  }

  addAccount() {
    this.accountService.postAccount(this._account).subscribe(data =>{
        console.log(data);
        this._accountList.push(data)
      },
      error => console.log(error)
    )
  }
}
