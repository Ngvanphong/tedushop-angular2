import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SizeComponent} from './size.component'
import {RouterModule,Routes} from'@angular/router'
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import { ModalModule } from 'ngx-bootstrap/modal';
const SizeRoute:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:SizeComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SizeRoute),
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [SizeComponent]
})
export class SizeModule { }
