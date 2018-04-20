import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlideComponent} from './slide.component';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service'
import {NotificationService} from '../../core/service/notification.service'
import {UploadService} from '../../core/service/upload.service';
const SlideRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index',component:SlideComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SlideRouter),
    ModalModule,
    FormsModule,
    ModalModule.forRoot(),

  ],
  providers:[
    DataService,
    UtilityService,
    NotificationService,
    UploadService
  ],
  declarations: [SlideComponent]
})
export class SlideModule { }
