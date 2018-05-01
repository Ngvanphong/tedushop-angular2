import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';

import { NotificationService } from '../../core/service/notification.service';
import { UtilityService } from '../../core/service/utility.service';
import { MessageConstant } from '../../core/common/message.constant';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SystemConstant} from '../../core/common/system.constant';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public totalAmount: number;
  public orderId:any;
  public BaseUri:string=SystemConstant.BASE_API;
  constructor(private utilityService: UtilityService,
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService){ }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderId=params['id'];
      this.loadOrder(params['id']);
      this.loadOrderDetail(params['id']);
    });

  }
  public loadOrder(id: number) {
    this._dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.entity = response;
    }, error => this._dataService.handleError(error));
  }



  public loadOrderDetail(id: number) {
    this._dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;
      this.totalAmount = 0;
      for(var item of this.orderDetails){
        this.totalAmount = this.totalAmount + (item.Quantity * item.Price);
      }
    }, error => this._dataService.handleError(error));
  }

  public goBack() {
    this.utilityService.navigate('/main/order/index');
  }
  // public exportToExcel(){
  //   this._dataService.get('/api/Order/exportExcel/'+this.orderId.toString()).subscribe((res:any)=>{
  //     console.log(res);
  //     window.open(SystemConstant.BASE_API+res.Message);
  //   },error=>this._dataService.handleError(error));
  // }
 

}