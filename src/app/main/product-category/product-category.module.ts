import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'angular-tree-component';
import { ModalModule } from 'ngx-bootstrap';
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service'
import {NotificationService} from '../../core/service/notification.service'
const productCategoryRoute:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:ProductCategoryComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productCategoryRoute),
    TreeModule,
    ModalModule,
    FormsModule,
    ModalModule.forRoot(),

  ],
  providers:[
    DataService,
    UtilityService,
    NotificationService
  ],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
