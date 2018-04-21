import { Component, OnInit, NgZone  } from '@angular/core';
import {AuthenService} from '../../core/service/authen.service';
import {LoggedInUser} from '../../core/domain/loggedin.user';
import {SystemConstant} from '../../core/common/system.constant';

import { UrlConstant } from '../../core/common/url.constant';

import { SignalrService } from '../../core/service/signalr.service';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';

import {Router} from '@angular/router'

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {

  public user: LoggedInUser;
  public baseFolder: string = SystemConstant.BASE_API;
  public canSendMessage: Boolean;
  public announcements: any[];
  constructor(private _authentication: AuthenService,
    private utilityService: UtilityService,
    private _signalRService: SignalrService,
    private _dataService: DataService,
    private _ngZone: NgZone, private _router:Router) {
    // this can subscribe for events  
    this.subscribeToEvents();
    // this can check for conenction exist or not.  
    this.canSendMessage = _signalRService.connectionExists;
  }

   public BaseUri:string = SystemConstant.BASE_API;
  ngOnInit() {
    this.user=this._authentication.getUserLogin();
    this.loadAnnouncements();
  }
  logout() {
    localStorage.removeItem(SystemConstant.CURRENT_USER);
    this.utilityService.navigate(UrlConstant.lOGIN);
  }

  private subscribeToEvents(): void {

    var self = this;
    self.announcements = [];

    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        announcement.CreateDate = moment(announcement.CreateDate).fromNow();
        self.announcements.push(announcement);
      });
    });
  }

  markAsRead(id: number) {
    var body = { orderId: id };
    this._dataService.get('/api/orderuser/markAsRead?orderId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
        this._router.navigate(['/main/order/detail/'+id]);
      }
    });
  }

  private loadAnnouncements() {
    this._dataService.get('/api/orderuser/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
      for (let item of response) {
        item.CreateDate = moment(item.CreateDate).fromNow();
        this.announcements.push(item);
      }

    });
  }



}
