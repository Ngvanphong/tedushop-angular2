import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemconfigComponent } from '../systemconfig/systemconfig.component';
import {Routes, RouterModule} from '@angular/router';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import {ModalModule} from 'ngx-bootstrap';

const SystemconfigRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index', component:SystemconfigComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SystemconfigRouter),
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [SystemconfigComponent]
})
export class SystemconfigModule { }
