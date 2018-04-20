import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service';
import {NotificationService} from '../../core/service/notification.service';
const ContactRouter:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:ContactComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContactRouter),
    FormsModule,


  ],
  providers: [
    DataService,
    UtilityService,
    NotificationService
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
