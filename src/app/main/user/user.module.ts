import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes,RouterModule} from '@angular/router';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {UtilityService} from '../../core/service/utility.service';
import {FormsModule} from '@angular/forms' ;
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import {UploadService} from '../../core/service/upload.service'


const userRoutes:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:UserComponent}

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    MultiselectDropdownModule,
    Daterangepicker,

  ],
  providers:[DataService,
    NotificationService,
    UploadService,
    UtilityService
  ],
  declarations: [UserComponent]
})
export class UserModule { }
