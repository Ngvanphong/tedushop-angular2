import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import{Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms'
import {AuthenService} from '../core/service/authen.service';
import {UtilityService} from '../core/service/utility.service';
import {NotificationService} from '../core/service/notification.service';
import {HttpModule} from '@angular/http'
const loginRouter:Routes=[
  {path:'', component:LoginComponent},
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(loginRouter)
  ],
  providers:[AuthenService,UtilityService,NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
