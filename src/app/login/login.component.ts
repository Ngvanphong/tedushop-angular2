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
  public loading= false
  public model:any={};
  private returnUrl:string;
  private body:any;
  constructor(private _authentication:AuthenService,private _Utility:UtilityService,private _notification:NotificationService) { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("nav-md"); //remove the class
    body.classList.add("login"); 
  }
  login(){
    this.loading=true;
    this._authentication.login(this.model.username,this.model.password).subscribe(data=>{  
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("login"); //remove the class
    body.classList.add("nav-md"); 
    this._Utility.navigate(UrlConstant.PRODUCT);   
    },error=>{
      this._notification.printErrorMessage(MessageConstant.SYSTEM_ERROR_MEG);
      this.loading=false;
    });
  }




}
