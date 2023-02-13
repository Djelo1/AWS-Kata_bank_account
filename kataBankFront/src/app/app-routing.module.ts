import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from "./Account/account/account.component";
import {UserComponent} from "./User/user/user.component";
import {OperationComponent} from "./Operation/operation/operation.component";

const routes: Routes = [
  {
    path: 'Account',
    component: AccountComponent
  },
  {
    path: 'User',
    component: UserComponent
  },
  {
    path: 'Operation',
    component: OperationComponent
  },

  {
    path: '**',
    redirectTo: 'ErrorPage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
