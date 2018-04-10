import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../core/service/authen.service';
import {LoggedInUser} from '../core/domain/loggedin.user'
import {UtilityService} from '../core/service/utility.service';
import {SystemConstant} from '../core/common/system.constant';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user:LoggedInUser;
  constructor(private _authentication:AuthenService, private _utility:UtilityService) {

   }

  ngOnInit() {
    this.user=this._authentication.getUserLogin(); 
  }
  public BaseUri:string = SystemConstant.BASE_API;
  logout(){
    this._authentication.logout();
    this._utility.navigateToLogin();
  }

}
