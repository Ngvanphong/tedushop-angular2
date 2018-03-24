import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import {OrderAddComponent} from '../../main/order-add/order-add.component';
import {OrderDetailComponent} from '../../main/order-detail/order-detail.component';
import {OrderRouter} from '../../main/order/order.routes'
import{RouterModule} from '@angular/router'
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { UploadService } from '../../core/service/upload.service';
import { NotificationService } from '../../core/service/notification.service';
import { Daterangepicker } from 'ng2-daterangepicker';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRouter),
    PaginationModule, 
    ModalModule.forRoot(),
    FormsModule,
    Daterangepicker,
    
  ],
  declarations: [OrderComponent,OrderAddComponent,OrderDetailComponent],
  providers:[DataService, UtilityService, NotificationService, UploadService]
  
})
export class OrderModule { }
