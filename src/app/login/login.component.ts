import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../core/service/authen.service';
import {UtilityService} from '../core/service/utility.service';
import{MessageConstant} from '../core/common/message.constant';
import {NotificationService} from '../core/service/notification.service'
import {SystemConstant} from '../core/common/system.constant'
import {UrlConstant} from '../core/common/url.constant'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loading= false
  private model:any={};
  private returnUrl:string;
  constructor(private _authentication:AuthenService,private _Utility:UtilityService,private _notification:NotificationService) { }

  ngOnInit() {
  }
  login(){
    this.loading=true;
    this._authentication.login(this.model.username,this.model.password).subscribe(data=>{
    this._Utility.navigate(UrlConstant.HOME)
    },error=>{
      this._notification.printErrorMessage(MessageConstant.SYSTEM_ERROR_MEG);
      this.loading=false;
    });
  }




}
