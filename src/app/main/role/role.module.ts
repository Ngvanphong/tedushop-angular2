import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {Routes,RouterModule} from '@angular/router';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
const roleRoutes:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:RoleComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    RouterModule.forChild(roleRoutes),
    ModalModule.forRoot()
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
