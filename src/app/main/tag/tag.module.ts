import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{TagComponent} from './tag.component'
import {RouterModule,Routes} from'@angular/router'
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import {ModalModule,PaginationModule} from 'ngx-bootstrap';
const TagRoute:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:TagComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TagRoute),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
  ],
  declarations: [TagComponent],
  providers:[
    DataService,
    NotificationService
  ],
})
export class TagModule { }
