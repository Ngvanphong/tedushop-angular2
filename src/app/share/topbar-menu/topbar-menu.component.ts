import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../core/service/authen.service';
import {LoggedInUser} from '../../core/domain/loggedin.user';
import {SystemConstant} from '../../core/common/system.constant';
@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {

  constructor( private _authentication:AuthenService) {

   }
   public user: LoggedInUser;
   public BaseUri:string = SystemConstant.BASE_API;
  ngOnInit() {
    this.user=this._authentication.getUserLogin();
  }

}
