import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ModalModule,PaginationModule} from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {DataService} from '../../core/service/data.service';
import {UploadService} from '../../core/service/upload.service';
import {NotificationService} from '../../core/service/notification.service';
import {UtilityService} from '../../core/service/utility.service'
import {SimpleTinyComponent} from '../../share/simple-tiny/simple-tiny.component'
const productRouter:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:ProductComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRouter),
    FormsModule,
    PaginationModule,
    MultiselectDropdownModule,
    Daterangepicker,
    ModalModule.forRoot(),

  ],
  providers:[DataService, NotificationService,UploadService,UtilityService],

  declarations: [ProductComponent,SimpleTinyComponent]
})
export class ProductModule { }
