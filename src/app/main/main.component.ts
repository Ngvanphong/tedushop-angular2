import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../core/service/authen.service';
import {LoggedInUser} from '../core/domain/loggedin.user'
import {UtilityService} from '../core/service/utility.service'
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
  logout(){
    this._authentication.logout();
    this._utility.navigateToLogin();
  }

}
