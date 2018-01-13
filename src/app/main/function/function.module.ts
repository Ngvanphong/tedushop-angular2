import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { TreeModule } from 'angular-tree-component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service';
import {NotificationService} from '../../core/service/notification.service';
import { ModalModule } from 'ngx-bootstrap/modal';
const routerFunction:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:FunctionComponent}
]

@NgModule({
  imports: [
    CommonModule,
    TreeModule ,
    FormsModule,
    ModalModule,
    RouterModule.forChild(routerFunction),
    ModalModule.forRoot(),
  ],
  providers: [
    DataService,
    UtilityService,
    NotificationService
  ],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
